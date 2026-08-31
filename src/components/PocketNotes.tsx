import React from 'react';
import { componentsData } from '../data/componentsData';
import { BookOpen, Sparkles, AlertCircle, Zap, Shield, CheckCircle } from 'lucide-react';

export const PocketNotes: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-center space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" /> Nota Poket & Simbol Skematik Standard
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
          Panduan Komponen & Simbol Sains Tahun 5
        </h2>
        
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Fahami fungsi setiap komponen litar elektrik, simbol skematik standard untuk melukis rajah litar, dan langkah keselamatan pengendalian perkakas elektrik.
        </p>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {componentsData.map((comp) => (
          <div
            key={comp.id}
            className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 space-y-3.5 hover:border-slate-700 transition-all flex flex-col justify-between backdrop-blur-md shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base tracking-tight">{comp.nameMalay}</h3>
                  <span className="text-xs text-blue-400 font-mono font-medium">({comp.name})</span>
                </div>
                {/* SVG Schematic Symbol Badge */}
                <div className="px-3 py-1.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-amber-300 font-mono text-xs font-bold tracking-wider shadow-inner">
                  Simbol: {comp.symbolSvg}
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
                <p>
                  <strong className="text-slate-200">Fungsi:</strong> {comp.functionMalay}
                </p>
                <p className="text-slate-400">
                  <strong className="text-slate-300">Ciri Simbol:</strong> {comp.symbolDescription}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-xs text-amber-300/90 flex items-start gap-2">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <span>{comp.realWorldNote}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Key Factors for Bulb Brightness */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-7 space-y-4 backdrop-blur-md shadow-xl">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Faktor yang Mempengaruhi Kecerahan Mentol
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-2">
            <h4 className="font-bold text-blue-300 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Bilangan Sel Kering
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Semakin <strong>bertambah</strong> bilangan sel kering yang disusun secara bersiri, semakin <strong>terang</strong> nyalaan mentol (kerana bekalan voltan tenaga elektrik meningkat).
            </p>
          </div>

          <div className="p-5 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-2">
            <h4 className="font-bold text-yellow-300 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Bilangan Mentol (Litar Bersiri)
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Semakin <strong>bertambah</strong> bilangan mentol dalam litar bersiri, semakin <strong>malap</strong> nyalaan mentol (kerana tenaga elektrik perlu dikongsi bersama semua mentol).
            </p>
          </div>
        </div>
      </div>

      {/* Safety Precautions Box */}
      <div className="bg-rose-950/20 border border-rose-500/30 rounded-3xl p-6 space-y-3 text-rose-200 backdrop-blur-md">
        <h4 className="font-bold text-white flex items-center gap-2 text-sm sm:text-base">
          <Shield className="w-4 h-4 text-rose-400" /> Langkah Keselamatan Elektrik
        </h4>
        <ul className="text-xs sm:text-sm text-slate-300 list-disc list-inside space-y-1.5 leading-relaxed">
          <li>Jangan sentuh suis atau plag perkakas elektrik dengan tangan yang basah.</li>
          <li>Jangan memasang terlalu banyak plag pada satu soket (beban lebihan arus).</li>
          <li>Gunakan penebat seperti sarung getah semasa mengendalikan pendawaian elektrik.</li>
          <li>Matikan suis sebelum mencabut plag perkakas elektrik dari punca bekalan.</li>
        </ul>
      </div>
    </div>
  );
};

