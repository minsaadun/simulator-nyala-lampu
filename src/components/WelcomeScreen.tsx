import React from 'react';
import { motion } from 'motion/react';
import { ScreenType } from '../types';
import { sound } from '../utils/audio';
import { Zap, Beaker, Sun, Split, Sparkles, BookOpen, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface WelcomeScreenProps {
  onStartMission: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartMission, onNavigate }) => {
  const features = [
    {
      screen: 'mission' as ScreenType,
      title: 'Misi Makmal Litar',
      desc: 'Pasang 4 komponen litar langkah demi langkah untuk menyalakan mentol.',
      icon: Beaker,
      tag: 'Aktiviti Utama',
      accent: 'border-blue-500/30 text-blue-400 bg-blue-500/10'
    },
    {
      screen: 'energy' as ScreenType,
      title: 'Perubahan Tenaga',
      desc: 'Ketahui bagaimana Tenaga Kimia ➔ Tenaga Elektrik ➔ Tenaga Cahaya + Haba.',
      icon: Sun,
      tag: 'Konsep Tenaga',
      accent: 'border-amber-500/30 text-amber-400 bg-amber-500/10'
    },
    {
      screen: 'series-parallel' as ScreenType,
      title: 'Litar Bersiri vs Selari',
      desc: 'Uji kecerahan mentol & kesan jika salah satu mentol rosak/terputus.',
      icon: Split,
      tag: 'Eksperimen KSSR',
      accent: 'border-blue-500/30 text-blue-400 bg-blue-500/10'
    },
    {
      screen: 'conductor-tester' as ScreenType,
      title: 'Penguji Konduktor & Penebat',
      desc: 'Uji 8 jenis bahan untuk mengenal pasti pengalir dan penebat arus elektrik.',
      icon: Sparkles,
      tag: 'Penyiasatan',
      accent: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
    },
    {
      screen: 'notes' as ScreenType,
      title: 'Nota Poket & Simbol',
      desc: 'Ulang kaji simbol skematik standard dan peraturan keselamatan elektrik.',
      icon: BookOpen,
      tag: 'Rujukan Cepat',
      accent: 'border-purple-500/30 text-purple-400 bg-purple-500/10'
    },
    {
      screen: 'quiz' as ScreenType,
      title: 'Kuiz Uji Minda',
      desc: '7 soalan cabaran Sains Tahun 5 untuk menguji tahap pemahaman anda.',
      icon: HelpCircle,
      tag: 'Ujian Skor',
      accent: 'border-rose-500/30 text-rose-400 bg-rose-500/10'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 py-2">
      {/* Hero Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-slate-900/60 border border-slate-800/80 rounded-3xl p-7 sm:p-12 text-center shadow-2xl overflow-hidden space-y-6 backdrop-blur-md"
      >
        {/* Glow backdrop decorative */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Zap className="w-4 h-4 fill-current text-blue-400" />
          Sains Tahun 5: Elektrik & Perubahan Bentuk Tenaga
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight uppercase">
          Simulator Litar Elektrik
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Sertai makmal maya interaktif Sains Tahun 5! Bina litar lengkap langkah demi langkah, perhatikan perubahan tenaga elektrik, uji sifat bahan, dan selesaikan cabaran kuiz minda.
        </p>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            id="btn-start-mission"
            onClick={() => {
              sound.playClick();
              onStartMission();
            }}
            className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-widest rounded-2xl shadow-[0_0_25px_rgba(59,130,246,0.35)] active:scale-95 transition-all cursor-pointer inline-flex items-center gap-3 hover:scale-105"
          >
            Mula Misi Nyala, Lampu Nyala! <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Explore Modules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" /> Mod Pembelajaran & Makmal Eksperimen
          </h2>
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Pilih modul interaktif</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((item) => {
            const ItemIcon = item.icon;
            return (
              <motion.div
                key={item.screen}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  sound.playClick();
                  onNavigate(item.screen);
                }}
                className="bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 rounded-3xl p-6 transition-all cursor-pointer flex flex-col justify-between group shadow-xl backdrop-blur-md"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl border ${item.accent} shadow-inner group-hover:scale-110 transition-transform`}>
                      <ItemIcon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950/80 border border-slate-800 text-slate-400">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-blue-400 group-hover:text-blue-300">
                  <span>Teroka Mod</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

