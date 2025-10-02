import React, { useState } from 'react';
import { Play, CheckCircle, Lock, Video } from 'lucide-react';

export function VideoPanel({
  videoChallenges,
  selectedPlayers,
  onCompleteChallenge,
  isUnlocked
}) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showingVideo, setShowingVideo] = useState(false);

  // Filter challenges to only show those for characters in the game
  const availableChallenges = videoChallenges.filter(vc => {
    if (Array.isArray(vc.characterId)) {
      return vc.characterId.some(id => selectedPlayers.some(p => p.id === id));
    }
    return selectedPlayers.some(p => p.id === vc.characterId);
  });

  const handleChallengeComplete = (challengeId) => {
    onCompleteChallenge(challengeId);
  };

  const handlePlayVideo = (challenge) => {
    if (!challenge.completed) return;
    setSelectedVideo(challenge);
    setShowingVideo(true);
  };

  const closeVideo = () => {
    setShowingVideo(false);
    setSelectedVideo(null);
  };

  if (!isUnlocked) {
    return (
      <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Lock className="w-16 h-16 text-white/30" />
          <h3 className="text-2xl font-bold text-white">Videomaterial Låst</h3>
          <p className="text-slate-300 max-w-md">
            Lås upp minst <strong>2 ledtrådar</strong> för att få tillgång till videomaterialet från mordkvällen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <Video className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Videomaterial</h2>
      </div>

      <p className="text-slate-300 mb-6 text-sm">
        Utför utmaningar för att låsa upp videomaterial som kan avslöja viktiga ledtrådar.
      </p>

      <div className="space-y-4">
        {availableChallenges.map(challenge => (
          <VideoChallengeCard
            key={challenge.id}
            challenge={challenge}
            onComplete={handleChallengeComplete}
            onPlay={handlePlayVideo}
          />
        ))}
      </div>

      {showingVideo && selectedVideo && (
        <VideoModal
          challenge={selectedVideo}
          onClose={closeVideo}
        />
      )}
    </div>
  );
}

function VideoChallengeCard({ challenge, onComplete, onPlay }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white/10 rounded-xl p-4 border border-white/20 hover:border-purple-400/50 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-white">{challenge.title}</h3>
            {challenge.completed && (
              <CheckCircle className="w-5 h-5 text-green-400" />
            )}
          </div>
          <p className="text-sm text-slate-400 mb-2">{challenge.characterName}</p>
          <p className="text-sm text-slate-300 italic">{challenge.description}</p>
        </div>
      </div>

      {!challenge.completed ? (
        <div className="space-y-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-purple-400 hover:text-purple-300 underline"
          >
            {showDetails ? 'Dölj utmaning' : 'Visa utmaning'}
          </button>

          {showDetails && (
            <div className="bg-black/30 rounded-lg p-4 space-y-3">
              <div>
                <h4 className="text-white font-bold mb-2">🎭 {challenge.challenge.title}</h4>
                <p className="text-sm text-slate-200 mb-2">{challenge.challenge.instructions}</p>
                <p className="text-xs text-slate-400">{challenge.challenge.alternativeInstructions}</p>
              </div>

              <button
                onClick={() => onComplete(challenge.id)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                ✓ Spelledare: Godkänn utmaning
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => onPlay(challenge)}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" />
          Spela upp video
        </button>
      )}
    </div>
  );
}

function VideoModal({ challenge, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 rounded-2xl max-w-4xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{challenge.title}</h2>
              <p className="text-slate-400 text-sm">{challenge.characterName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        <div className="relative bg-black">
          <video
            src={challenge.videoPath}
            controls
            autoPlay
            className="w-full"
            style={{ maxHeight: '70vh' }}
          >
            Din webbläsare stödjer inte video.
          </video>
        </div>

        <div className="p-6 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
            <p className="text-sm text-purple-200">
              <strong>Misstanke:</strong> {challenge.suspicionImpact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
