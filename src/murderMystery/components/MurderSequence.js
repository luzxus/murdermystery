import React, { useState, useRef, useEffect } from 'react';
import { Play, SkipForward } from 'lucide-react';

const VIDEO_SCENES = [
  {
    id: 1,
    src: '/media/videos/harrington_scenes.mp4',
    title: 'Sebastians sista timmar'
  }
];

export function MurderSequence({ onComplete, onVideoStateChange }) {
  const [currentScene, setCurrentScene] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef(null);

  const currentVideo = VIDEO_SCENES[currentScene];
  const isLastScene = currentScene === VIDEO_SCENES.length - 1;

  // auto-play when scene changes
  useEffect(() => {
    if (hasStarted && videoRef.current) {
      videoRef.current.play();
    }
  }, [currentScene, hasStarted]);

  // Notify parent when video plays/pauses
  const handlePlay = () => {
    if (onVideoStateChange) onVideoStateChange(true);
  };

  const handlePause = () => {
    if (onVideoStateChange) onVideoStateChange(false);
  };

  const handleStart = () => {
    setHasStarted(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleVideoEnd = () => {
    if (isLastScene) {
      // all scenes complete
      onComplete();
    } else {
      // move to next scene
      setCurrentScene(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    if (isLastScene) {
      onComplete();
    } else {
      setCurrentScene(prev => prev + 1);
    }
  };

  const handleSkipAll = () => {
    onComplete();
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-5xl font-bold text-red-500 mb-6 animate-pulse">
            ⚠️ VARNING ⚠️
          </h1>
          <div className="bg-red-900/30 border-2 border-red-500 rounded-xl p-8 mb-8">
            <p className="text-white text-2xl mb-4">
              Lord Sebastian Hartwell har hittats död.
            </p>
            <p className="text-gray-300 text-lg">
              Ni är på väg att bevittna de sista ögonblicken innan mordet.
            </p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 mb-8">
            <p className="text-gray-300 mb-2">
              Ni kommer att se Sebastians förlopp innan hans död.
            </p>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Var uppmärksam på detaljer - de kan innehålla ledtrådar till mordet.
            </p>
          </div>

          <button
            onClick={handleStart}
            className="bg-gradient-to-r from-red-600 to-red-800 text-white px-12 py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform flex items-center gap-3 mx-auto"
          >
            <Play className="w-6 h-6" />
            Visa videosekvensen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* progress indicator */}
      <div className="w-full max-w-4xl mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white font-bold text-lg">{currentVideo.title}</h2>
          <span className="text-gray-400 text-sm">
            Scen {currentScene + 1} av {VIDEO_SCENES.length}
          </span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className="bg-red-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentScene + 1) / VIDEO_SCENES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* video player */}
      <div className="w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl mb-6">
        <video
          ref={videoRef}
          key={currentVideo.id}
          className="w-full"
          onEnded={handleVideoEnd}
          onPlay={handlePlay}
          onPause={handlePause}
          controls
        >
          <source src={currentVideo.src} type="video/mp4" />
          Din webbläsare stödjer inte video.
        </video>
      </div>

      {/* controls */}
      <div className="flex gap-4">
        <button
          onClick={handleSkip}
          className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
        >
          <SkipForward className="w-5 h-5" />
          {isLastScene ? 'Börja utredningen' : 'Hoppa till nästa scen'}
        </button>
        
        <button
          onClick={handleSkipAll}
          className="bg-red-600/20 hover:bg-red-600/30 text-red-300 px-6 py-3 rounded-lg font-semibold transition-all border border-red-500/50"
        >
          Hoppa över alla scener
        </button>
      </div>

      {/* ambient instructions */}
      <p className="text-gray-500 text-sm mt-8 text-center max-w-md">
        Tips: Var uppmärksam på detaljer i videorna - de kan innehålla ledtrådar till mordet.
      </p>
    </div>
  );
}
