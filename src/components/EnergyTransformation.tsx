import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Battery, Zap, Sun, Flame, ArrowRight, HelpCircle, Lightbulb, Play, BookOpen, Sparkles, Activity } from 'lucide-react';
import { sound } from '../utils/audio';

interface EnergyTransformationProps {
  onGoToQuiz: () => void;
  onGoToSeriesParallel: () => void;
}

export const EnergyTransformation: React.FC<EnergyTransformationProps> = ({
  onGoToQuiz,
  onGoToSeriesParallel,
}) => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isPlayingFlow, setIsPlayingFlow] = useState<boolean>(false);

  const energyStages = [
    {
      id: 'chemical',
      title: '1. Tenaga Kimia',
      source: 'Sel Kering (1.5V DC)',
      icon: Battery,
      color: 'from-blue-500 to-indigo-600',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      desc: 'Bahan kimia aktif di dalam sel kering menyimpan potensi tenaga kimia yang bertindak balas melepaskan elektron bebas.',
      fact: 'Bateri mengandungi elektrolit kimia zink-karbon menghasilkan beza keupayaan voltan (1.5V).'
    },
    {
      id: 'electrical',
      title: '2. Tenaga Elektrik',
      source: 'Pengaliran Elektron Kuprum',
      icon: Zap,
      color: 'from-amber-500 to-yellow-600',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      desc: 'Tindak balas kimia menolak elektron bergerak serentak menerusi wayar kuprum membentuk arus elektrik berterusan.',
      fact: 'Kuprum ialah konduktor piawai kerana mempunyai rintangan rendah dan laju pengaliran elektron optimum.'
    },
    {
      id: 'light-heat',
      title: '3. Tenaga Cahaya + Haba',
      source: 'Filamen Tungsten Membara',
      icon: Sun,
      secondaryIcon: Flame,
      color: 'from-yellow-400 to-orange-500',
      badgeColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      desc: 'Arus elektrik yang merentasi filamen tungsten halus menghadapi rintangan tinggi, menjadikannya membara putih menghasilkan foton cahaya dan haba.',
      fact: 'Mentol filamen tradisional menukarkan ~10% tenaga kepada cahaya dan ~90% kepada haba terma.'
    }
  ];

  const examples = [
    {
      name: 'Lampu Suluh',
      flow: 'Tenaga Kimia ➔ Tenaga Elektrik ➔ Tenaga Cahaya + Haba',
      icon: '🔦'
    },
    {
      name: 'Kipas Elektrik Mini',
      flow: 'Tenaga Kimia ➔ Tenaga Elektrik ➔ Tenaga Kinetik + Bunyi',
      icon: '🌀'
    },
    {
      name: 'Loceng Elektrik',
      flow: 'Tenaga Elektrik ➔ Tenaga Bunyi',
      icon: '🔔'
    }
  ];

  const handleSimulateFlow = () => {
    sound.playClick();
    setIsPlayingFlow(true);
    setActiveStage(0);

    setTimeout(() => {
      sound.playConnect();
      setActiveStage(1);
    }, 1000);

    setTimeout(() => {
      sound.playBulbOn();
      setActiveStage(2);
      setIsPlayingFlow(false);
    }, 2200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-center space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Sains Tahun 5: Prinsip Transformasi Tenaga
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
          Perubahan Bentuk Tenaga dalam Litar
        </h2>
        
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          <strong>Hukum Keabadian Tenaga:</strong> Tenaga tidak boleh dicipta atau dimusnahkan, tetapi boleh bertukar bentuk dari satu fasa ke fasa yang lain.
        </p>

        <div className="pt-2">
          <button
            onClick={handleSimulateFlow}
            disabled={isPlayingFlow}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(250,204,21,0.3)] active:scale-95 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            {isPlayingFlow ? 'SEDANG MENGALIRKAN ARUS...' : 'SIMULASIKAN TRANSFORMASI TENAGA'}
          </button>
        </div>
      </div>

      {/* Interactive Step Sequence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {energyStages.map((stage, idx) => {
          const isSelected = activeStage === idx;
          const StageIcon = stage.icon;
          return (
            <motion.div
              key={stage.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                sound.playClick();
                setActiveStage(idx);
              }}
              className={`p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between backdrop-blur-md ${
                isSelected
                  ? 'bg-slate-900/90 border-amber-400 shadow-[0_0_25px_rgba(250,204,21,0.2)] ring-1 ring-amber-400/40'
                  : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 text-slate-400'
              }`}
            >
              {/* Active glow accent */}
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500" />
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${stage.color} text-slate-950 shadow-md`}>
                    <StageIcon className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border ${stage.badgeColor}`}>
                    FASA {idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{stage.title}</h3>
                  <p className="text-xs text-blue-400 font-mono font-semibold mt-0.5">{stage.source}</p>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-800/80 text-xs text-slate-400 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{stage.fact}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Visual Energy Flow Summary Banner */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-7 text-center space-y-4 backdrop-blur-md shadow-xl">
        <h4 className="text-xs uppercase tracking-widest font-mono font-bold text-slate-400">
          Ringkasan Aliran Kitaran Tenaga
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold">
          <div className="px-5 py-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-300 flex items-center gap-2.5 shadow-sm">
            <Battery className="w-4 h-4 text-blue-400" />
            <span>🔋 Tenaga Kimia</span>
          </div>

          <span className="text-amber-400 text-lg font-extrabold animate-pulse">➔</span>

          <div className="px-5 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-2.5 shadow-sm">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>⚡ Tenaga Elektrik</span>
          </div>

          <span className="text-yellow-400 text-lg font-extrabold animate-pulse">➔</span>

          <div className="px-5 py-3 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 flex items-center gap-2.5 shadow-sm">
            <Sun className="w-4 h-4 text-yellow-400" />
            <span>💡 Tenaga Cahaya + Haba</span>
          </div>
        </div>
      </div>

      {/* Real-World Context Cards for Year 5 */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-7 space-y-4 backdrop-blur-md shadow-xl">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          Aplikasi Perubahan Bentuk Tenaga Alatan Harian
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {examples.map((item, i) => (
            <div key={i} className="p-5 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-2">
              <div className="text-2xl">{item.icon}</div>
              <h4 className="font-bold text-white text-sm">{item.name}</h4>
              <p className="text-xs text-amber-300/90 font-mono font-medium leading-relaxed">{item.flow}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={onGoToSeriesParallel}
          className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
        >
          Eksperimen Bersiri & Selari ➔
        </button>

        <button
          onClick={onGoToQuiz}
          className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95 transition-all cursor-pointer"
        >
          Mula Kuiz Uji Minda <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

