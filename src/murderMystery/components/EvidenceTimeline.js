import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VideocamIcon from '@mui/icons-material/Videocam';
import ViewListIcon from '@mui/icons-material/ViewList';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

/**
 * EvidenceTimeline - Tab-based filtering of evidence, observations, and videos
 * Design 2: Her Story-inspired with "ALL", "BEVIS", "VIDEOR", "HÄNDELSER" tabs
 */
export function EvidenceTimeline({
  clues = [],
  unlockedClues = [],
  selectedPlayers = [],
  observations = [],
  videoChallenges = [],
  onCompleteVideoChallenge,
  isVideoUnlocked = false,
  onVideoStateChange
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'evidence', 'videos', 'observations'

  // Build categorized items
  const evidenceItems = [];
  const observationItems = [];
  const videoItems = [];

  // Collect evidence
  unlockedClues.forEach(clueId => {
    const clue = clues.find(c => c.id === clueId);
    if (clue) {
      evidenceItems.push({
        type: 'clue',
        id: `clue-${clue.id}`,
        data: clue,
        timestamp: clueId
      });
    }
  });

  // Collect observations
  observations.forEach((obs, idx) => {
    observationItems.push({
      type: 'observation',
      id: `obs-${obs.id || idx}`,
      data: obs,
      timestamp: obs.timestamp || Date.now() + idx
    });
  });

  // Collect videos if unlocked
  if (isVideoUnlocked) {
    videoChallenges.forEach(video => {
      videoItems.push({
        type: 'video',
        id: `video-${video.id}`,
        data: video,
        timestamp: video.id * 1000
      });
    });
  }

  // Build all items timeline
  const allItems = [...evidenceItems, ...observationItems, ...videoItems];
  allItems.sort((a, b) => b.timestamp - a.timestamp);

  // Filter items based on active tab
  const getFilteredItems = () => {
    switch (activeTab) {
      case 'evidence':
        return evidenceItems;
      case 'videos':
        return videoItems;
      case 'observations':
        return observationItems;
      default:
        return allItems;
    }
  };

  const filteredItems = getFilteredItems();

  // Empty state
  if (allItems.length === 0) {
    return (
      <div className="text-center py-16">
        <Lock className="w-20 h-20 mx-auto text-slate-400 mb-4" />
        <p className="text-slate-400 text-lg font-semibold">Ingen information insamlad än</p>
        <p className="text-slate-300 text-sm mt-2">
          Utför din första utredningsaktion för att samla bevis
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 bg-slate-900/50 p-2 rounded-xl border-2 border-slate-700/30">
        <TabButton
          active={activeTab === 'all'}
          onClick={() => setActiveTab('all')}
          icon={<ViewListIcon />}
          label="ALLT"
          count={allItems.length}
        />
        <TabButton
          active={activeTab === 'evidence'}
          onClick={() => setActiveTab('evidence')}
          icon={<LockOpenIcon />}
          label="BEVIS"
          count={evidenceItems.length}
        />
        <TabButton
          active={activeTab === 'videos'}
          onClick={() => setActiveTab('videos')}
          icon={<VideocamIcon />}
          label="VIDEOR"
          count={videoItems.length}
          disabled={!isVideoUnlocked}
        />
        <TabButton
          active={activeTab === 'observations'}
          onClick={() => setActiveTab('observations')}
          icon={<VisibilityIcon />}
          label="HÄNDELSER"
          count={observationItems.length}
        />
      </div>

      {/* Tab Description */}
      <div className="text-sm text-slate-400 italic">
        {activeTab === 'all' && '📅 Kronologisk vy av allt material'}
        {activeTab === 'evidence' && '🔍 Endast bevis – sorterat efter ordning'}
        {activeTab === 'videos' && '🎥 Videomaterial från säkerhetssystem'}
        {activeTab === 'observations' && '👁️ Lösa observationer och händelser'}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-slate-300">
            <p>Inga {activeTab === 'evidence' ? 'bevis' : activeTab === 'videos' ? 'videor' : 'händelser'} tillgängliga än</p>
          </div>
        ) : (
          filteredItems.map(item => {
            if (item.type === 'clue') {
              return <ClueCard
                key={item.id}
                clue={item.data}
              />;
            } else if (item.type === 'observation') {
              return <ObservationCard key={item.id} observation={item.data} />;
            } else if (item.type === 'video') {
              return <VideoCard
                key={item.id}
                video={item.data}
                selectedPlayers={selectedPlayers}
                onComplete={onCompleteVideoChallenge}
                onVideoStateChange={onVideoStateChange}
              />;
            }
            return null;
          })
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label, count, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
        active
          ? 'bg-purple-600 text-white shadow-lg scale-105'
          : disabled
          ? 'bg-slate-800/50 text-slate-400 cursor-not-allowed'
          : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm">{label}</span>
      <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${
        active
          ? 'bg-purple-800'
          : disabled
          ? 'bg-slate-700'
          : 'bg-slate-700'
      }`}>
        {count}
      </span>
    </button>
  );
}

function ClueCard({ clue }) {
  return (
    <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-2 border-green-500/30 rounded-xl p-5 shadow-lg hover:shadow-green-500/20 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="bg-green-600/30 p-2 rounded-lg">
            <LockOpenIcon className="text-green-400" sx={{ fontSize: 24 }} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono bg-green-600/40 text-green-200 px-2 py-0.5 rounded">
                BEVIS #{clue.id}
              </span>
              {clue.phase && (
                <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                  {clue.phase.toUpperCase()}
                </span>
              )}
            </div>
            <h3 className="font-bold text-xl text-white">{clue.title}</h3>
          </div>
        </div>
        {clue.tags && (
          <div className="flex flex-wrap gap-1 justify-end">
            {clue.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="bg-slate-900/50 border-l-4 border-slate-600 p-3 mb-3 rounded">
        <p className="text-slate-300 text-sm leading-relaxed">{clue.description}</p>
      </div>

      {/* Initial Analysis */}
      <div className="bg-green-950/40 border-l-4 border-green-500 p-3 mb-3 rounded">
        <p className="text-green-200 text-sm leading-relaxed">
          <strong className="text-green-400 flex items-center gap-1">
            <LockOpenIcon sx={{ fontSize: 16 }} /> Analys:
          </strong> {clue.unlock}
        </p>
      </div>
    </div>
  );
}

function ObservationCard({ observation }) {
  return (
    <div className="bg-gradient-to-br from-orange-900/20 to-amber-900/20 border-2 border-orange-500/30 rounded-xl p-4 shadow-lg">
      <div className="flex items-start gap-3">
        <div className="bg-orange-600/30 p-2 rounded-lg flex-shrink-0">
          <VisibilityIcon className="text-orange-400" sx={{ fontSize: 24 }} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono bg-orange-600/40 text-orange-200 px-2 py-0.5 rounded">
              OBSERVATION
            </span>
            {observation.timestamp && (
              <span className="text-xs text-slate-300">
                {new Date(observation.timestamp).toLocaleTimeString('sv-SE')}
              </span>
            )}
          </div>
          <p className="text-slate-300 text-sm italic leading-relaxed">{observation.text}</p>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ video, selectedPlayers, onComplete, onVideoStateChange }) {
  const [showVideo, setShowVideo] = React.useState(false);
  const [showChallenge, setShowChallenge] = React.useState(false);
  const videoModalRef = React.useRef(null);

  const handleComplete = () => {
    if (!video.completed) {
      onComplete(video.id);
    }
  };

  const handleWatchVideo = () => {
    setShowVideo(true);
  };

  // Scroll modal into view when video opens
  React.useEffect(() => {
    if (showVideo && videoModalRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        videoModalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Also lock body scroll
        document.body.style.overflow = 'hidden';
      }, 100);
    } else {
      // Restore body scroll when modal closes
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showVideo]);

  return (
    <>
      <div className={`border-2 rounded-xl p-5 shadow-lg transition-all ${
        video.completed
          ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30'
          : 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-500/30 hover:border-blue-400/50'
      }`}>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg flex-shrink-0 ${
              video.completed ? 'bg-green-600/30' : 'bg-blue-600/30'
            }`}>
              {video.completed ? (
                <CheckCircleIcon className="text-green-400" sx={{ fontSize: 24 }} />
              ) : (
                <VideocamIcon className="text-blue-400" sx={{ fontSize: 24 }} />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                  video.completed
                    ? 'bg-green-600/40 text-green-200'
                    : 'bg-blue-600/40 text-blue-200'
                }`}>
                  VIDEOMATERIAL
                </span>
                {video.challenge && !video.completed && (
                  <span className="text-xs bg-yellow-600/40 text-yellow-200 px-2 py-0.5 rounded border border-yellow-500/30 flex items-center gap-1">
                    <StarIcon sx={{ fontSize: 14 }} />
                    VALFRI UTMANING
                  </span>
                )}
                {video.completed && (
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded border border-green-500/30 flex items-center gap-1">
                    <CheckCircleIcon sx={{ fontSize: 14 }} /> GRANSKAD
                  </span>
                )}
              </div>
              <h4 className="font-bold text-white mb-2">{video.title}</h4>
              <p className="text-slate-400 text-sm mb-2">{video.description}</p>
              <p className="text-slate-300 text-xs italic">
                Karaktär: {video.characterName}
              </p>
            </div>
          </div>

          {/* Optional Challenge section - Collapsible */}
          {video.challenge && !video.completed && (
            <div className="border-t border-white/10 pt-3">
              <button
                onClick={() => setShowChallenge(!showChallenge)}
                className="w-full text-left text-sm text-yellow-300 hover:text-yellow-200 font-semibold flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <AssignmentIcon sx={{ fontSize: 16 }} />
                  {showChallenge ? 'Dölj' : 'Visa'} valfri utmaning
                </span>
                {showChallenge ? <ExpandLessIcon sx={{ fontSize: 20 }} /> : <ExpandMoreIcon sx={{ fontSize: 20 }} />}
              </button>

              {showChallenge && (
                <div className="mt-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 space-y-2">
                  <h5 className="text-yellow-300 font-bold text-sm flex items-center gap-2">
                    <AssignmentIcon sx={{ fontSize: 18 }} />
                    {video.challenge.title}
                  </h5>
                  <p className="text-slate-300 text-sm">
                    {video.challenge.instructions}
                  </p>
                  {video.challenge.alternativeInstructions && (
                    <p className="text-slate-400 text-xs italic flex items-start gap-1">
                      <EmojiObjectsIcon sx={{ fontSize: 14 }} className="mt-0.5" />
                      <span>{video.challenge.alternativeInstructions}</span>
                    </p>
                  )}
                  <div className="flex items-start gap-2 bg-yellow-800/30 rounded p-2 mt-2">
                    <InfoIcon sx={{ fontSize: 16 }} className="text-yellow-200 mt-0.5 flex-shrink-0" />
                    <p className="text-yellow-200 text-xs font-semibold">
                      Denna utmaning är valfri - du kan markera videon som klar utan att genomföra den.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleWatchVideo}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <PlayCircleOutlineIcon sx={{ fontSize: 18 }} />
              Se video
            </button>
            {!video.completed && (
              <button
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
              >
                <CheckCircleIcon sx={{ fontSize: 18 }} />
                Markera klar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div
          ref={videoModalRef}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowVideo(false)}
        >
          <div className="max-w-4xl w-full my-8" onClick={e => e.stopPropagation()}>
            <div className="bg-slate-900 rounded-xl overflow-hidden">
              <div className="p-4 bg-slate-800 flex items-center justify-between">
                <h3 className="text-white font-bold">{video.title}</h3>
                <button
                  onClick={() => setShowVideo(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <CheckCircleIcon sx={{ fontSize: 24 }} />
                </button>
              </div>
              <video
                src={video.videoPath}
                controls
                autoPlay
                className="w-full"
                onPlay={() => onVideoStateChange?.(true)}
                onPause={() => onVideoStateChange?.(false)}
                onEnded={() => {
                  onVideoStateChange?.(false);
                  if (!video.completed) {
                    handleComplete();
                  }
                }}
              />
              <div className="p-4 bg-slate-800">
                <p className="text-slate-300 text-sm">{video.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
