import React from 'react';
import { VIDEO_MANOR } from '../constants';

export const BackgroundVideo = ({ className = '', overlay = true }) => (
  <div className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
    <video
      className="w-full h-full object-cover object-center brightness-[0.55] contrast-125 saturate-120"
      src={VIDEO_MANOR}
      autoPlay
      muted={true}
      loop
      playsInline
      preload="auto"
    />
    {overlay && (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(32,10,40,0.25),rgba(10,5,25,0.9))] mix-blend-overlay" />
    )}
  </div>
);
