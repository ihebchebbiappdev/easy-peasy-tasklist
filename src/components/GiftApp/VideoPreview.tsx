import React, { useRef, useEffect, useState } from 'react';

interface VideoPreviewProps {
  videoUrl: string;
  onClick: () => void;
}

export function VideoPreview({ videoUrl, onClick }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [thumbnail, setThumbnail] = useState<string>("");

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 2; // Skip to 2 seconds for thumbnail
      video.addEventListener('loadeddata', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d')?.drawImage(video, 0, 0);
        setThumbnail(canvas.toDataURL());
      });
    }
  }, [videoUrl]);

  return (
    <div 
      className="h-full relative cursor-pointer group"
      onClick={onClick}
    >
      {thumbnail ? (
        <img 
          src={thumbnail}
          alt="Video preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      )}
      <video ref={videoRef} className="hidden" preload="metadata">
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
          <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-[#67000D] border-b-[15px] border-b-transparent ml-2" />
        </div>
      </div>
    </div>
  );
}