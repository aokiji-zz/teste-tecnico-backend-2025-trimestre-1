import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class VideoService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
  ) { }

  async streamVideo(filename: string, range: string, res: any) {
    const filePath = `/videos/${filename}`;
    const fileExists = await fs.promises.stat(filePath).catch(() => null);

    if (!fileExists) {
      return {
        status: 404,
        message: 'File not found',
      };
    }

    const fileSize = fileExists.size;

    if (range) {
      const [start, end] = range
        .replace(/bytes=/, '')
        .split('-')
        .map(Number);
      const chunkStart = start || 0;
      const chunkEnd = end || fileSize - 1;

      res.status(206).set({
        'Content-Range': `bytes ${chunkStart}-${chunkEnd}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkEnd - chunkStart + 1,
      });

      const fileStream = fs.createReadStream(filePath, { start: chunkStart, end: chunkEnd });
      fileStream.pipe(res);
    } else {
      res.status(200).set({ 'Content-Length': fileSize });
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    }
  }

  async uploadVideo(file: Express.Multer.File) {
    if (!file.mimetype.startsWith('video/')) {
      return { message: 'Invalid file type', status: 400 };
    }
    if (file.size > 10 * 1024 * 1024) {
      return { message: 'File is too large', status: 400 };
    }
    const filename = file.originalname
    const directoryPath = '/videos';
    const filePath = `${directoryPath}/${filename}`;

    await fs.promises.mkdir(directoryPath, { recursive: true });

    await fs.promises.writeFile(filePath, file.buffer);

    await this.cacheManager.set(file.originalname, file.buffer, 60);

    const videoStorage = await this.prisma.video.create({
      data: { filename: filename, path: filePath },
    });
    if (!videoStorage) {
      return { status: 500, message: 'Failed to save video metadata' };
    }
    return { status: 204, message: 'File uploaded successfully', filename: filename };
  }
}
