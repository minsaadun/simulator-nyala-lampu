import React from 'react';
import { ScreenType } from '../types';
import { sound } from '../utils/audio';
import { Zap, Volume2, VolumeX, Beaker, BookOpen, HelpCircle, Split, Sparkles, Home, Activity } from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  score?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  isMuted,
  onToggleMute,
  score = 0,
}) => {
  const navItems: { id: ScreenType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'welcome', label: 'Utama', icon: Home },
    { id: 'mission', label: 'Makmal Litar', icon: Beaker },
    { id: 'energy', label: 'Perubahan Tenaga', icon: Zap },
    { id: 'series-parallel', label: 'Bersiri vs Selari', icon: Split },
    { id: 'conductor-tester', label: 'Penguji Bahan', icon: Sparkles },
    { id: 'notes', label: 'Nota Poket', icon: BookOpen },
    { id: 'quiz', label: 'Kuiz Uji Minda', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#020617]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('welcome');
          }}
          className="flex items-center gap-3.5 cursor-pointer text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/80 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_22px_rgba(59,130,246,0.7)] group-hover:scale-105 transition-all">
            <span className="text-blue-400 text-xl font-bold">⚡</span>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors uppercase">
              Simulator Litar Elektrik
            </h1>
            <p className="text-[10px] sm:text-xs text-blue-400 font-medium tracking-[0.18em] uppercase">
              Sains Tahun 5 • Modul Makmal Maya
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id || (item.id === 'quiz' && currentScreen === 'result');
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  onNavigate(item.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-500/20 border border-blue-400/80 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Telemetry HUD & Audio Toggle */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex items-center gap-6 border-r border-slate-800/80 pr-6">
            <div className="text-right">
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Skor Uji Minda</p>
              <p className="text-sm sm:text-base font-mono font-bold text-yellow-400 leading-none mt-0.5">
                {String(score * 120).padStart(4, '0')} <span className="text-[9px] text-slate-500">PTS</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Status Sistem</p>
              <div className="flex items-center gap-1.5 mt-0.5 justify-end">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                <p className="text-sm sm:text-base font-mono font-bold text-emerald-400 leading-none">
                  AKTIF
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onToggleMute}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 text-xs font-semibold ${
              isMuted
                ? 'bg-rose-950/40 border-rose-500/40 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.2)]'
                : 'bg-slate-900/80 border-slate-800 text-blue-400 hover:border-blue-500/50 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]'
            }`}
            title={isMuted ? 'Buka Bunyi' : 'Senyapkan Bunyi'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline font-mono uppercase tracking-wider text-[10px]">
              {isMuted ? 'MUTE' : 'AUDIO ON'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Scrollable Navigation Bar */}
      <div className="xl:hidden px-4 pb-2.5 overflow-x-auto flex items-center gap-1.5 no-scrollbar border-t border-slate-800/40 pt-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id || (item.id === 'quiz' && currentScreen === 'result');
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playClick();
                onNavigate(item.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-500/20 border border-blue-400 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

