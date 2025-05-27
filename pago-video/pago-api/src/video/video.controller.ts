import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) { }

  @Get(':filename')
  async streamVideo(@Param('filename') filename: string, @Res() res: any) {
    const range = res.req.headers.range;
    return this.videoService.streamVideo(filename, range, res);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    return this.videoService.uploadVideo(file);
  }
}