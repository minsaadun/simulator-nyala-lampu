import React, { useState } from 'react';
import { motion } from 'motion/react';
import { materialsData } from '../data/materialsData';
import { MaterialItem } from '../types';
import { InteractiveCircuitCanvas } from './InteractiveCircuitCanvas';
import { sound } from '../utils/audio';
import { ShieldCheck, ShieldAlert, Sparkles, CheckCircle2, XCircle, Info } from 'lucide-react';

export const ConductorTester: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialItem | null>(materialsData[0]);

  const handleSelectMaterial = (item: MaterialItem) => {
    setSelectedMaterial(item);
    if (item.type === 'conductor') {
      sound.playBulbOn();
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-center space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Sains Tahun 5: Penyiasatan Bahan Konduktor & Penebat
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
          Penguji Bahan Konduktor & Penebat Elektrik
        </h2>
        
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Pilih mana-mana bahan di bawah untuk diuji pada jurang litar penguji. Perhatikan sama ada arus dapat mengalir menyalakan mentol!
        </p>
      </div>

      {/* Interactive Circuit Canvas with Material Slot */}
      <InteractiveCircuitCanvas
        hasBattery={true}
        hasWire={true}
        hasBulb={true}
        isSwitchClosed={true}
        canToggleSwitch={false}
        testedMaterialName={selectedMaterial?.name}
        testedMaterialIcon={selectedMaterial?.icon}
        isConductor={selectedMaterial?.type === 'conductor'}
        statusText={
          selectedMaterial
            ? selectedMaterial.type === 'conductor'
              ? `✅ ${selectedMaterial.name} ialah KONDUKTOR elektrik! Arus mengalir dan mentol menyala terang.`
              : `❌ ${selectedMaterial.name} ialah PENEBAT elektrik! Arus terhalang dan mentol padam.`
            : 'Pilih bahan di bawah untuk diuji.'
        }
      />

      {/* Material Selection Grid */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-7 space-y-4 backdrop-blur-md shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-400" /> Pilih Bahan Ujian Pengaliran Arus:
          </h3>
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">8 Bahan Eksperimen</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {materialsData.map((mat) => {
            const isSelected = selectedMaterial?.id === mat.id;
            const isConductor = mat.type === 'conductor';

            return (
              <button
                key={mat.id}
                onClick={() => handleSelectMaterial(mat)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between backdrop-blur-sm ${
                  isSelected
                    ? isConductor
                      ? 'bg-emerald-500/15 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400/40 text-white'
                      : 'bg-rose-500/15 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.25)] ring-1 ring-rose-400/40 text-white'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl mb-1">{mat.icon}</span>
                  {isSelected && (
                    isConductor ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold leading-snug">{mat.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{mat.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Diagnostic Explanation Card */}
      {selectedMaterial && (
        <motion.div
          key={selectedMaterial.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-3xl border backdrop-blur-md shadow-xl ${
            selectedMaterial.type === 'conductor'
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shrink-0 text-2xl shadow-inner">
              {selectedMaterial.icon}
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-bold text-white text-base">
                  Keputusan Diagnostik: {selectedMaterial.name}
                </h4>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                    selectedMaterial.type === 'conductor'
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40'
                      : 'bg-rose-500/10 text-rose-300 border-rose-500/40'
                  }`}
                >
                  {selectedMaterial.type === 'conductor' ? 'KONDUKTOR ELEKTRIK' : 'PENEBAT ELEKTRIK'}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                <strong>Penerangan Sains:</strong> {selectedMaterial.why}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

