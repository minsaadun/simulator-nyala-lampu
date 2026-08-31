import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InteractiveCircuitCanvas } from './InteractiveCircuitCanvas';
import { sound } from '../utils/audio';
import { Battery, Zap, Lightbulb, ToggleRight, Sparkles, CheckCircle2, HelpCircle, ArrowRight, RotateCcw, ShieldCheck, Sun } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MissionLabProps {
  onGoToEnergy: () => void;
  onGoToQuiz: () => void;
}

export const MissionLab: React.FC<MissionLabProps> = ({ onGoToEnergy, onGoToQuiz }) => {
  const [step, setStep] = useState<number>(1);
  const [hasBattery, setHasBattery] = useState<boolean>(false);
  const [hasWire, setHasWire] = useState<boolean>(false);
  const [hasBulb, setHasBulb] = useState<boolean>(false);
  const [isSwitchClosed, setIsSwitchClosed] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const isCompleteCircuit = hasBattery && hasWire && hasBulb && isSwitchClosed;

  const stepsInfo = [
    {
      num: 1,
      name: "1. Pasang Sel Kering",
      desc: "Sel Kering ialah punca tenaga elektrik (menyimpan tenaga kimia).",
      actionDesc: "Pasangkan punca tenaga elektrik (Sel Kering 1.5V) pada pemegang bateri.",
      icon: Battery
    },
    {
      num: 2,
      name: "2. Sambung Wayar",
      desc: "Wayar kuprum bertindak sebagai laluan pengalir arus elektrik.",
      actionDesc: "Sambungkan wayar penyambung kuprum untuk membina laluan pengaliran arus.",
      icon: Zap
    },
    {
      num: 3,
      name: "3. Pasang Mentol",
      desc: "Mentol menukarkan tenaga elektrik kepada tenaga cahaya dan haba.",
      actionDesc: "Pasangkan mentol berfilamen tungsten untuk mengesan aliran arus elektrik.",
      icon: Lightbulb
    },
    {
      num: 4,
      name: "4. Tutup Suis",
      desc: "Suis menutup litar untuk membolehkan arus mengalir melengkapkan kitaran.",
      actionDesc: "Tutup suis mekanikal untuk melengkapkan litar elektrik tertutup sepenuhnya.",
      icon: ToggleRight
    }
  ];

  const handleDoStep = (targetStep: number) => {
    if (targetStep === 1) {
      setHasBattery(true);
      setStep(2);
      sound.playConnect();
    } else if (targetStep === 2) {
      setHasWire(true);
      setStep(3);
      sound.playConnect();
    } else if (targetStep === 3) {
      setHasBulb(true);
      setStep(4);
      sound.playConnect();
    } else if (targetStep === 4) {
      setIsSwitchClosed(true);
      setIsCompleted(true);
      sound.playBulbOn();
      try {
        confetti({
          particleCount: 60,
          spread: 65,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
    }
  };

  const handleToggleSwitch = () => {
    if (hasBattery && hasWire && hasBulb) {
      const nextState = !isSwitchClosed;
      setIsSwitchClosed(nextState);
      sound.playSwitch(nextState);
      if (nextState) {
        sound.playBulbOn();
      }
    }
  };

  const handleReset = () => {
    sound.playClick();
    setStep(1);
    setHasBattery(false);
    setHasWire(false);
    setHasBulb(false);
    setIsSwitchClosed(false);
    setIsCompleted(false);
  };

  const getCurrentStatusMessage = () => {
    if (!hasBattery) return "Langkah 1: Sila pasang punca tenaga elektrik (Sel Kering 1.5V).";
    if (!hasWire) return "Langkah 2: Sel kering dipasang! Sambungkan wayar kuprum.";
    if (!hasBulb) return "Langkah 3: Wayar sedia. Pasang mentol pada pemegang mentol.";
    if (!isSwitchClosed) return "Langkah 4: Tutup suis mekanikal untuk melengkapkan litar!";
    return "⚡ Tahniah! Litar lengkap tertutup terhasil. Arus mengalir dari terminal (+) ke (-)!";
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Banner Header */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-center space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Misi Makmal Maya: Pasang Litar Lengkap
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
          Langkah <span className="text-blue-400 font-mono">{step}</span> daripada 4
        </h2>
        
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {stepsInfo[step - 1]?.actionDesc || "Eksperimen pemasangan litar lengkap selesai!"}
        </p>

        {/* Progress Tracker Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
          {stepsInfo.map((s) => {
            const isDone = (s.num === 1 && hasBattery) || (s.num === 2 && hasWire) || (s.num === 3 && hasBulb) || (s.num === 4 && isSwitchClosed);
            const isCurrent = step === s.num && !isDone;
            return (
              <div
                key={s.num}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 backdrop-blur-sm ${
                  isDone
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                    : isCurrent
                    ? 'bg-blue-500/15 border-blue-400 text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.25)] ring-1 ring-blue-400/40'
                    : 'bg-slate-950/50 border-slate-800/80 text-slate-500'
                }`}
              >
                <div className={`p-2 rounded-xl ${isDone ? 'bg-emerald-500/20 text-emerald-400' : isCurrent ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800/80 text-slate-500'}`}>
                  <s.icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate">{s.name}</p>
                  <p className="text-[10px] uppercase font-mono tracking-wider opacity-80 mt-0.5">
                    {isDone ? 'SIAP ✓' : isCurrent ? 'TINDAKAN' : 'MENUNGGU'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left is Circuit & Telemetry Cards, Right is Control Panel & Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Circuit Canvas + 3 Telemetry Output Cards */}
        <div className="lg:col-span-8 space-y-4">
          <InteractiveCircuitCanvas
            hasBattery={hasBattery}
            hasWire={hasWire}
            hasBulb={hasBulb}
            isSwitchClosed={isSwitchClosed}
            onToggleSwitch={handleToggleSwitch}
            canToggleSwitch={hasBulb}
            statusText={getCurrentStatusMessage()}
          />

          {/* 3 Telemetry Metrics (Sumber, Medium, Hasil) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3.5 backdrop-blur-md">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-full border border-yellow-500/30 flex items-center justify-center text-xl shrink-0 shadow-[0_0_10px_rgba(234,179,8,0.15)]">
                🔋
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Sumber Tenaga</p>
                <p className="text-sm font-bold text-white truncate">Tenaga Kimia</p>
                <span className="text-[10px] font-mono text-yellow-400">
                  {hasBattery ? '1.5V AKTIF' : 'TERPUTUS'}
                </span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3.5 backdrop-blur-md">
              <div className="w-10 h-10 bg-blue-500/10 rounded-full border border-blue-500/30 flex items-center justify-center text-xl shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.15)]">
                ⚡
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Medium Aliran</p>
                <p className="text-sm font-bold text-white truncate">Tenaga Elektrik</p>
                <span className="text-[10px] font-mono text-blue-400">
                  {hasWire ? (isSwitchClosed ? 'ARUS MENGALIR' : 'LITAR TERBUKA') : 'TIADA WAYAR'}
                </span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3.5 backdrop-blur-md">
              <div className="w-10 h-10 bg-orange-500/10 rounded-full border border-orange-500/30 flex items-center justify-center text-xl shrink-0 shadow-[0_0_10px_rgba(249,115,22,0.15)]">
                ☀️
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Hasil Output</p>
                <p className="text-sm font-bold text-white truncate">Cahaya + Haba</p>
                <span className="text-[10px] font-mono text-orange-400">
                  {isSwitchClosed && hasBulb ? 'MENTOL MENYALA' : 'MENTOL PADAM'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Component Assembly Controls + Engineer Note */}
        <aside className="lg:col-span-4 space-y-4">
          {/* Component Controls */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Kawalan Komponen
              </h3>
              <button
                onClick={handleReset}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg transition-colors border border-slate-700/60"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            <div className="space-y-2.5">
              <button
                id="btn-step1"
                disabled={hasBattery}
                onClick={() => handleDoStep(1)}
                className={`w-full py-3.5 px-4 rounded-xl text-left flex justify-between items-center transition-all cursor-pointer ${
                  hasBattery
                    ? 'bg-slate-800/40 text-slate-500 border border-slate-800/50'
                    : 'bg-slate-800/90 border border-slate-700 text-white hover:border-blue-400 hover:bg-slate-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🔋</span>
                  <span className="text-xs font-bold uppercase tracking-wider">1. Sel Kering (1.5V)</span>
                </div>
                {hasBattery ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <span className="text-blue-400 font-bold">+</span>}
              </button>

              <button
                id="btn-step2"
                disabled={!hasBattery || hasWire}
                onClick={() => handleDoStep(2)}
                className={`w-full py-3.5 px-4 rounded-xl text-left flex justify-between items-center transition-all cursor-pointer ${
                  !hasBattery || hasWire
                    ? 'bg-slate-800/40 text-slate-500 border border-slate-800/50'
                    : 'bg-slate-800/90 border border-slate-700 text-white hover:border-blue-400 hover:bg-slate-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🔌</span>
                  <span className="text-xs font-bold uppercase tracking-wider">2. Wayar Kuprum</span>
                </div>
                {hasWire ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <span className="text-blue-400 font-bold">+</span>}
              </button>

              <button
                id="btn-step3"
                disabled={!hasWire || hasBulb}
                onClick={() => handleDoStep(3)}
                className={`w-full py-3.5 px-4 rounded-xl text-left flex justify-between items-center transition-all cursor-pointer ${
                  !hasWire || hasBulb
                    ? 'bg-slate-800/40 text-slate-500 border border-slate-800/50'
                    : 'bg-slate-800/90 border border-slate-700 text-white hover:border-blue-400 hover:bg-slate-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">💡</span>
                  <span className="text-xs font-bold uppercase tracking-wider">3. Pasang Mentol</span>
                </div>
                {hasBulb ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <span className="text-blue-400 font-bold">+</span>}
              </button>

              <button
                id="btn-step4"
                disabled={!hasBulb || isSwitchClosed}
                onClick={() => handleDoStep(4)}
                className={`w-full py-3.5 px-4 rounded-xl text-left flex justify-between items-center transition-all cursor-pointer ${
                  !hasBulb || isSwitchClosed
                    ? 'bg-slate-800/40 text-slate-500 border border-slate-800/50'
                    : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(250,204,21,0.3)] active:scale-95'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">⚡</span>
                  <span className="text-xs font-bold uppercase tracking-wider">4. Tutup Suis</span>
                </div>
                {isSwitchClosed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <span className="text-slate-950 font-bold">➔</span>}
              </button>

              {/* Interactive toggle switch for testing opened/closed state */}
              {hasBulb && (
                <button
                  onClick={handleToggleSwitch}
                  className={`w-full py-3.5 px-4 rounded-xl text-center font-bold text-xs uppercase tracking-wider transition-all cursor-pointer mt-2 border ${
                    isSwitchClosed
                      ? 'bg-rose-500/10 border-rose-500/40 text-rose-300 hover:bg-rose-500/20'
                      : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20'
                  }`}
                >
                  {isSwitchClosed ? '🔓 Buka Suis (Putuskan Litar)' : '🔒 Tutup Suis (Sambungkan Litar)'}
                </button>
              )}

              {/* Primary CTA button to test understanding */}
              <button
                onClick={onGoToQuiz}
                className="w-full py-4 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-center font-black uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(16,185,129,0.35)] mt-3 hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Uji Kefahaman Sekarang ➔
              </button>
            </div>
          </div>

          {/* Engineer HUD Note */}
          <div className="bg-blue-600/5 border border-blue-500/20 rounded-3xl p-5 sm:p-6 relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-blue-500/10 rounded-full blur-3xl" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" /> Nota Jurutera Cilik
            </h3>
            <p className="text-xs leading-relaxed text-slate-300 italic">
              "Ingat, litar lengkap mestilah tidak mempunyai sebarang ruang terputus. Apabila suis ditutup, arus elektrik mengalir dari terminal positif ke terminal negatif sel kering."
            </p>
            <div className="mt-5 pt-4 border-t border-slate-800/80">
              <div className="flex justify-between items-center mb-1.5 font-mono">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Keberkesanan Litar</span>
                <span className="text-[10px] font-bold text-emerald-400">
                  {isCompleteCircuit ? '100% EFISYEN' : '0% (TERPUTUS)'}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500" 
                  style={{ width: isCompleteCircuit ? '100%' : '15%' }}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Completion Modal / Banner */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-950/60 border-2 border-emerald-500/40 rounded-3xl p-6 text-center space-y-4 shadow-[0_0_30px_rgba(16,185,129,0.2)] backdrop-blur-md"
          >
            <div className="inline-flex p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl shadow-inner">
              <Sparkles className="w-7 h-7 animate-pulse" />
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-emerald-300">
              Tahniah! Misi Pemasangan Litar Berjaya Dilaksanakan!
            </h4>
            <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
              Litar elektrik telah lengkap dan tertutup sepenuhnya. Tenaga kimia daripada sel kering kini bertukar kepada tenaga elektrik, lalu menghasilkan tenaga cahaya dan haba pada filamen mentol.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                id="btn-next-energy"
                onClick={onGoToEnergy}
                className="px-5 py-3 bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] cursor-pointer transition-all hover:scale-105"
              >
                Lihat Perubahan Bentuk Tenaga <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-next-quiz"
                onClick={onGoToQuiz}
                className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer transition-all hover:scale-105"
              >
                Teruskan ke Kuiz Uji Minda <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

