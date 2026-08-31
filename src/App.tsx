import React, { useState, useEffect } from 'react';
import { ScreenType } from './types';
import { Navbar } from './components/Navbar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { MissionLab } from './components/MissionLab';
import { EnergyTransformation } from './components/EnergyTransformation';
import { SeriesParallelLab } from './components/SeriesParallelLab';
import { ConductorTester } from './components/ConductorTester';
import { PocketNotes } from './components/PocketNotes';
import { QuizSection } from './components/QuizSection';
import { sound } from './utils/audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  useEffect(() => {
    sound.enabled = !isMuted;
  }, [isMuted]);

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.enabled = !next;
    if (!next) {
      sound.playClick();
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col selection:bg-blue-500 selection:text-slate-950 font-sans relative overflow-x-hidden">
      {/* Immersive Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Navigation with HUD */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(s) => setCurrentScreen(s)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        score={quizScore}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col items-center justify-center relative z-10">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onStartMission={() => setCurrentScreen('mission')}
            onNavigate={(s) => setCurrentScreen(s)}
          />
        )}

        {currentScreen === 'mission' && (
          <MissionLab
            onGoToEnergy={() => setCurrentScreen('energy')}
            onGoToQuiz={() => setCurrentScreen('quiz')}
          />
        )}

        {currentScreen === 'energy' && (
          <EnergyTransformation
            onGoToQuiz={() => setCurrentScreen('quiz')}
            onGoToSeriesParallel={() => setCurrentScreen('series-parallel')}
          />
        )}

        {currentScreen === 'series-parallel' && (
          <SeriesParallelLab />
        )}

        {currentScreen === 'conductor-tester' && (
          <ConductorTester />
        )}

        {currentScreen === 'notes' && (
          <PocketNotes />
        )}

        {currentScreen === 'quiz' && (
          <QuizSection
            onRestartLab={() => setCurrentScreen('mission')}
            onScoreUpdate={(s) => setQuizScore(s)}
          />
        )}
      </main>

      {/* Immersive HUD Footer */}
      <footer className="w-full px-6 sm:px-10 py-4 bg-slate-900/30 border-t border-slate-800/60 backdrop-blur-md flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-slate-500">
        <div className="flex items-center gap-4 font-mono">
          <span className="text-slate-400">v2.0.4-LITE</span>
          <span className="text-slate-600">•</span>
          <span className="text-blue-400/80">LAB_ID: JURUTERA_CILIK_MY</span>
        </div>
        <div className="text-slate-400 flex items-center gap-2 font-medium tracking-wide">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <span>KEMENTERIAN PENDIDIKAN MALAYSIA • SAINS TAHUN 5 (KSSR SEMAKAN)</span>
        </div>
      </footer>
    </div>
  );
}

