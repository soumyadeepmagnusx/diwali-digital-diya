import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DiyaAltar from './components/DiyaAltar';
import FireworksSimulator from './components/FireworksSimulator';
import RangoliStudio from './components/RangoliStudio';
import AiWishCrafter from './components/AiWishCrafter';
import GreetingCardModal from './components/GreetingCardModal';
import ReceiverGreetingView from './components/ReceiverGreetingView';
import SubmissionInfoModal from './components/SubmissionInfoModal';
import CloudArchitectureModal from './components/CloudArchitectureModal';
import Footer from './components/Footer';
import { 
  initAudio, 
  toggleMute, 
  getMuteState, 
  startAmbientMusic, 
  stopAmbientMusic, 
  playDiyaLightSound, 
  playExplosionSound 
} from './utils/audio';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState('altar');
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showCloudModal, setShowCloudModal] = useState(false);
  const [greetingParams, setGreetingParams] = useState(null);
  const [prefilledCardData, setPrefilledCardData] = useState(null);

  // Check URL query parameters on load for personalized greetings
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const to = urlParams.get('to');
      const from = urlParams.get('from');
      const headline = urlParams.get('h');
      const message = urlParams.get('m');

      if (to) {
        setGreetingParams({
          to: decodeURIComponent(to),
          from: from ? decodeURIComponent(from) : 'A Well-Wisher',
          headline: headline ? decodeURIComponent(headline) : 'Shubh Deepavali!',
          message: message ? decodeURIComponent(message) : 'May the sacred light bring infinite peace, joy, and prosperity to your life.'
        });
      }
    } catch (e) {
      console.warn("Could not parse query parameters:", e);
    }
  }, []);

  // Audio Handlers
  const handleToggleMute = () => {
    initAudio();
    const muted = toggleMute();
    setIsMuted(muted);
  };

  const handleToggleAmbient = () => {
    initAudio();
    if (isPlayingAmbient) {
      stopAmbientMusic();
      setIsPlayingAmbient(false);
    } else {
      startAmbientMusic();
      setIsPlayingAmbient(true);
    }
  };

  // Grand Finale Spectacle Show
  const handleTriggerGrandFinale = () => {
    initAudio();
    playDiyaLightSound();
    playExplosionSound('large');

    // Multi-burst festive confetti cascades
    const end = Date.now() + 3000;
    const colors = ['#f59e0b', '#ef4444', '#10b981', '#38bdf8', '#fbbf24', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // When user crafts an AI wish and wants to use it in the Greeting Card
  const handleSelectAiWishForCard = (wishData) => {
    setPrefilledCardData(wishData);
    setActiveTab('greeting');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070614] text-white flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setGreetingParams(null); // allow navigation back to full site if in receiver view
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isPlayingAmbient={isPlayingAmbient}
        onToggleAmbient={handleToggleAmbient}
        onTriggerGrandFinale={handleTriggerGrandFinale}
        onOpenInfoModal={() => setShowInfoModal(true)}
        onOpenCloudModal={() => setShowCloudModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto">
        {/* If user arrived with a personalized link, show dedicated receiver view */}
        {greetingParams ? (
          <ReceiverGreetingView
            greetingData={greetingParams}
            onExploreWebsite={() => {
              setGreetingParams(null);
              setActiveTab('altar');
            }}
          />
        ) : (
          <>
            {activeTab === 'altar' && (
              <DiyaAltar
                onGoToGreeting={() => setActiveTab('greeting')}
                onGoToFireworks={() => setActiveTab('fireworks')}
              />
            )}

            {activeTab === 'fireworks' && (
              <FireworksSimulator />
            )}

            {activeTab === 'rangoli' && (
              <RangoliStudio />
            )}

            {activeTab === 'ai-crafter' && (
              <AiWishCrafter
                onSelectForGreetingCard={handleSelectAiWishForCard}
              />
            )}

            {activeTab === 'greeting' && (
              <GreetingCardModal
                initialData={prefilledCardData}
              />
            )}
          </>
        )}
      </main>

      {/* Submission & Architecture Modal */}
      <SubmissionInfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />

      {/* Cloud & AI Architecture Modal */}
      <CloudArchitectureModal
        isOpen={showCloudModal}
        onClose={() => setShowCloudModal(false)}
      />

      {/* Footer */}
      <Footer onOpenInfoModal={() => setShowInfoModal(true)} />

    </div>
  );
}
