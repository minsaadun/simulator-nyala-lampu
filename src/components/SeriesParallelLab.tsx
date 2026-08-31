import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Battery, Lightbulb, Zap, HelpCircle, AlertTriangle, CheckCircle, Split, GitCommit, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const SeriesParallelLab: React.FC = () => {
  const [circuitType, setCircuitType] = useState<'series' | 'parallel'>('series');
  const [batteryCount, setBatteryCount] = useState<number>(2);
  const [bulbCount, setBulbCount] = useState<number>(2);
  const [brokenBulbIdx, setBrokenBulbIdx] = useState<number | null>(null);

  // Brightness calculation:
  // In Series: Total voltage / bulbCount.
  // In Parallel: Voltage across each branch = total battery voltage.
  const calculateBrightness = (bulbIndex: number) => {
    if (brokenBulbIdx === bulbIndex) return 0; // Broken bulb doesn't light up

    if (circuitType === 'series') {
      // In series, if ANY bulb is broken, current is 0 for ALL bulbs
      if (brokenBulbIdx !== null) return 0;
      return (batteryCount / bulbCount) * 0.7;
    } else {
      // In parallel, each intact branch bulb receives full voltage of battery bank
      return batteryCount * 0.45;
    }
  };

  const getBrightnessLabel = (val: number) => {
    if (val <= 0) return { text: 'PADAM (0%)', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' };
    if (val < 0.5) return { text: 'MALAP', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    if (val < 0.9) return { text: 'SEDERHANA TERANG', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' };
    return { text: 'SANGAT TERANG ⚡', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
  };

  const toggleBulbBroken = (index: number) => {
    sound.playClick();
    if (brokenBulbIdx === index) {
      setBrokenBulbIdx(null);
    } else {
      setBrokenBulbIdx(index);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-center space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Sains Tahun 5: Modul Perbandingan Litar
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
          Eksperimen Litar Bersiri vs Litar Selari
        </h2>
        
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Bandingkan corak nyalaan mentol, laluan arus elektrik, dan kesan jika salah satu mentol rosak atau terputus!
        </p>

        {/* Mode Selector Tabs */}
        <div className="inline-flex p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800/80 gap-2 mt-2">
          <button
            onClick={() => {
              sound.playClick();
              setCircuitType('series');
              setBrokenBulbIdx(null);
            }}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              circuitType === 'series'
                ? 'bg-blue-500 text-slate-950 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitCommit className="w-4 h-4" /> Litar Bersiri (1 Laluan)
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setCircuitType('parallel');
              setBrokenBulbIdx(null);
            }}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              circuitType === 'parallel'
                ? 'bg-blue-500 text-slate-950 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Split className="w-4 h-4" /> Litar Selari (Bercabang)
          </button>
        </div>
      </div>

      {/* Interactive Controls (Battery & Bulb counts) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Battery Selector */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 sm:p-6 space-y-3 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Battery className="w-4 h-4 text-blue-400" /> Bilangan Sel Kering
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono font-bold">
              {batteryCount} Sel ({batteryCount * 1.5}V)
            </span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => {
                  sound.playClick();
                  setBatteryCount(num);
                }}
                className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  batteryCount === num
                    ? 'bg-blue-500/15 border-blue-400 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.2)]'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {num} Sel Kering
              </button>
            ))}
          </div>
        </div>

        {/* Bulb Selector */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 sm:p-6 space-y-3 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" /> Bilangan Mentol
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold">
              {bulbCount} Mentol
            </span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => {
                  sound.playClick();
                  setBulbCount(num);
                  if (brokenBulbIdx !== null && brokenBulbIdx >= num) {
                    setBrokenBulbIdx(null);
                  }
                }}
                className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  bulbCount === num
                    ? 'bg-amber-500/15 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(250,204,21,0.2)]'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {num} Mentol
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Circuit Visual Stage */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-2xl relative space-y-6 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pb-3 border-b border-slate-800/80">
          <span className="font-mono font-bold text-slate-200 uppercase tracking-wider">
            {circuitType === 'series' ? '⚡ Susunan Bersiri (1 Gelung Sebaris)' : '⚡ Susunan Selari (Gelung Bercabang)'}
          </span>
          <span className="text-blue-400 font-mono text-[11px]">
            [Klik mana-mana mentol untuk rosakkan/pasang semula]
          </span>
        </div>

        {/* Bulbs Grid Display with Glow & Intensity */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.from({ length: bulbCount }).map((_, idx) => {
            const bVal = calculateBrightness(idx);
            const bStatus = getBrightnessLabel(bVal);
            const isBroken = brokenBulbIdx === idx;

            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                onClick={() => toggleBulbBroken(idx)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer relative text-center space-y-3 backdrop-blur-md ${
                  isBroken
                    ? 'bg-rose-950/20 border-rose-500/40'
                    : bVal > 0
                    ? 'bg-slate-900/80 border-slate-700 shadow-xl'
                    : 'bg-slate-900/30 border-slate-800 opacity-60'
                }`}
              >
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                  {/* Glow Backdrop */}
                  {bVal > 0 && (
                    <div
                      className="absolute inset-0 rounded-full blur-xl transition-all duration-300"
                      style={{
                        backgroundColor: '#facc15',
                        opacity: Math.min(0.9, bVal * 0.8),
                        transform: `scale(${1 + bVal * 0.4})`
                      }}
                    />
                  )}

                  {/* Bulb Icon Graphic */}
                  <div
                    className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border transition-all shadow-inner ${
                      isBroken
                        ? 'bg-rose-950/80 border-rose-500 text-rose-400'
                        : bVal > 0
                        ? 'bg-amber-300 border-amber-200 text-slate-950 shadow-[0_0_15px_#facc15]'
                        : 'bg-slate-800/80 border-slate-700 text-slate-500'
                    }`}
                  >
                    {isBroken ? '💥' : bVal > 0 ? '💡' : '🌑'}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm">Mentol #{idx + 1}</h4>
                  <div className={`mt-1.5 inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${bStatus.bg} ${bStatus.color}`}>
                    {isBroken ? 'TERBAKAR / ROSAK' : bStatus.text}
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 font-medium">
                  {isBroken ? 'Klik untuk pasang semula mentol' : 'Klik untuk uji jika mentol rosak'}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Diagnostic Comparison Explanation */}
        <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 text-xs sm:text-sm space-y-2.5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-wider text-xs">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <span>Pemerhatian Sains Tahun 5 ({circuitType === 'series' ? 'Litar Bersiri' : 'Litar Selari'}):</span>
          </div>
          {circuitType === 'series' ? (
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              • <strong>Kecerahan:</strong> Menambah bilangan mentol menyebabkan semua mentol menjadi semakin <strong>malap</strong> kerana voltan dibahagi sama rata.<br />
              • <strong>Jika 1 mentol rosak:</strong> Semua mentol lain turut <strong>terpadam</strong> kerana litar hanya mempunyai <strong>satu laluan arus</strong> sahaja!
            </p>
          ) : (
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              • <strong>Kecerahan:</strong> Setiap mentol dalam cabang masing-masing menyala dengan <strong>kecerahan sama terang</strong> kerana mendapat voltan penuh.<br />
              • <strong>Jika 1 mentol rosak:</strong> Mentol pada cabang lain <strong>terus menyala</strong> tanpa terjejas kerana mempunyai laluannya tersendiri!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

