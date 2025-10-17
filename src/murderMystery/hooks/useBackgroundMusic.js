import { useEffect, useRef } from 'react';

export function useBackgroundMusic(isPlaying = true) {
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio('/media/music/Fog Over Gaslight Alley.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3; // Set to 30% volume
    }

    const audio = audioRef.current;

    // Play or pause based on isPlaying prop
    if (isPlaying) {
      audio.play().catch(err => {
        console.log('Audio play prevented:', err);
        // Browser may prevent autoplay - user interaction needed
      });
    } else {
      audio.pause();
    }

    // Cleanup on unmount
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [isPlaying]);

  // Return functions to control music
  return {
    pause: () => audioRef.current?.pause(),
    play: () => audioRef.current?.play().catch(err => console.log('Audio play error:', err)),
    setVolume: (volume) => {
      if (audioRef.current) {
        audioRef.current.volume = Math.max(0, Math.min(1, volume));
      }
    }
  };
}
