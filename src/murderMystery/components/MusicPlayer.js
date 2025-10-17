import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function MusicPlayer({ isVideoPlaying }) {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      audioRef.current = new Audio('/media/music/Fog Over Gaslight Alley.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    const audio = audioRef.current;

    // Auto-play on mount (will require user interaction)
    const startAudio = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Audio autoplay prevented - waiting for user interaction');
      });
    };

    // Try to start immediately
    startAudio();

    // Also try on first click anywhere
    const handleFirstClick = () => {
      if (!isPlaying) {
        startAudio();
      }
      document.removeEventListener('click', handleFirstClick);
    };
    document.addEventListener('click', handleFirstClick);

    return () => {
      document.removeEventListener('click', handleFirstClick);
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  // Pause/resume based on video playing
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isVideoPlaying) {
      audio.pause();
    } else if (isPlaying && !isMuted) {
      audio.play().catch(err => console.log('Resume failed:', err));
    }
  }, [isVideoPlaying, isPlaying, isMuted]);

  // Handle mute toggle
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.pause();
    } else if (isPlaying && !isVideoPlaying) {
      audio.play().catch(err => console.log('Play failed:', err));
    }
  }, [isMuted, isPlaying, isVideoPlaying]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 bg-purple-900/80 hover:bg-purple-800/90 backdrop-blur-sm text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 border-2 border-purple-500/30"
      title={isMuted ? 'Slå på musik' : 'Stäng av musik'}
    >
      {isMuted ? (
        <VolumeX className="w-6 h-6" />
      ) : (
        <Volume2 className="w-6 h-6" />
      )}
    </button>
  );
}
