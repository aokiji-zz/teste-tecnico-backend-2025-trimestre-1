import React, { useEffect, useState } from 'react';
import { urlBaseApiDev } from '../common/base-url';

interface VideoPlayerProps {
  buffer: string; // Alterado para ArrayBuffer para compatibilidade
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ buffer: filename }) => {
  console.log('VideoPlayer buffer:', filename);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (filename) {
      // Cria um Blob a partir do buffer e gera um URL utilizável
      const blob = new Blob([filename], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);

      // Limpa o URL quando o componente é desmontado
      return () => URL.revokeObjectURL(url);
    }
  }, [filename]);

  if (!videoUrl) {
    return <p>Loading video...</p>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <video controls>
        <source src={`${urlBaseApiDev}/videos/${filename}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;