import React from 'react';
import { motion } from 'motion/react';

interface InteractiveCircuitCanvasProps {
  hasBattery: boolean;
  hasWire: boolean;
  hasBulb: boolean;
  isSwitchClosed: boolean;
  onToggleSwitch?: () => void;
  brightness?: number; // 0 to 1
  canToggleSwitch?: boolean;
  statusText?: string;
  circuitType?: 'series' | 'parallel' | 'simple';
  customBulbCount?: number;
  brokenBulbIndex?: number | null;
  onToggleBulbBreak?: (index: number) => void;
  testedMaterialName?: string | null;
  testedMaterialIcon?: string | null;
  isConductor?: boolean | null;
}

export const InteractiveCircuitCanvas: React.FC<InteractiveCircuitCanvasProps> = ({
  hasBattery,
  hasWire,
  hasBulb,
  isSwitchClosed,
  onToggleSwitch,
  brightness = 1,
  canToggleSwitch = true,
  statusText,
  circuitType = 'simple',
  customBulbCount = 1,
  brokenBulbIndex = null,
  onToggleBulbBreak,
  testedMaterialName = null,
  testedMaterialIcon = null,
  isConductor = null,
}) => {
  const isCompleteCircuit =
    hasBattery &&
    hasWire &&
    hasBulb &&
    isSwitchClosed &&
    (testedMaterialName ? isConductor === true : true);

  const effectiveBrightness = isCompleteCircuit ? Math.max(0.3, Math.min(1.2, brightness)) : 0;

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-slate-900/40 rounded-3xl p-5 sm:p-7 border border-slate-800/80 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden select-none backdrop-blur-md">
      {/* High-Tech Grid Pattern Accent */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#334155 1.2px, transparent 1.2px)',
          backgroundSize: '30px 30px'
        }}
      />

      {/* Top Telemetry Status Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          {isCompleteCircuit ? (
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                Litar Lengkap Terhasil (Tertutup)
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/30 rounded-full">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-[10px] sm:text-xs font-bold text-rose-400 uppercase tracking-wider font-mono">
                Litar Terbuka (Tidak Lengkap)
              </span>
            </div>
          )}
        </div>
        <div className="font-mono text-xs">
          {isCompleteCircuit ? (
            <span className="text-amber-400 font-semibold flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
              ⚡ ARUS ELEKTRIK: {Math.round(effectiveBrightness * 100)}%
            </span>
          ) : (
            <span className="text-slate-500 font-medium px-2.5 py-1 bg-slate-900/80 rounded-lg border border-slate-800">
              TIADA ARUS ELEKTRIK
            </span>
          )}
        </div>
      </div>

      {/* Circuit SVG Diagram */}
      <div className="relative w-full h-[280px] sm:h-[320px] flex items-center justify-center">
        <svg
          viewBox="0 0 600 320"
          className="w-full h-full drop-shadow-2xl"
        >
          <defs>
            {/* Glow Filter for Circuit & Lamp */}
            <filter id="bulb-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="wire-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="lamp-aura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#facc15" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#eab308" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Circuit Wire Outline (Gray base or Active Glowing Yellow) */}
          {hasWire && (
            <g id="circuit-wires">
              {/* Wire Base Glow Aura */}
              {isCompleteCircuit && (
                <rect
                  x="80"
                  y="50"
                  width="440"
                  height="220"
                  rx="24"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="10"
                  strokeOpacity="0.25"
                  filter="url(#wire-glow)"
                />
              )}

              {/* Main Solid Wire Path */}
              <rect
                x="80"
                y="50"
                width="440"
                height="220"
                rx="24"
                fill="none"
                stroke={isCompleteCircuit ? '#fbbf24' : '#334155'}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Animated Electron Particles */}
              {isCompleteCircuit && (
                <rect
                  x="80"
                  y="50"
                  width="440"
                  height="220"
                  rx="24"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="5"
                  strokeDasharray="10 20"
                  className="animate-[dash_1.2s_linear_infinite]"
                  strokeLinecap="round"
                />
              )}
            </g>
          )}

          {/* Wire placeholder guide when wire not installed yet */}
          {!hasWire && (
            <rect
              x="80"
              y="50"
              width="440"
              height="220"
              rx="24"
              fill="none"
              stroke="#1e293b"
              strokeWidth="2.5"
              strokeDasharray="6 8"
            />
          )}

          {/* 1. BATTERY SECTION (Bottom Wire) */}
          <g id="battery-component" transform="translate(230, 246)">
            {/* Background mask to break the wire cleanly */}
            <rect x="-15" y="-14" width="170" height="52" fill="#030712" rx="8" />

            {hasBattery ? (
              <g className="cursor-pointer group">
                {/* Battery Chassis */}
                <rect x="15" y="-6" width="110" height="38" rx="8" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
                {/* Positive Cap Terminal */}
                <rect x="125" y="2" width="10" height="22" rx="3" fill="#cbd5e1" stroke="#e2e8f0" strokeWidth="1" />
                {/* Negative Terminal Base */}
                <rect x="7" y="0" width="8" height="26" rx="2" fill="#475569" />
                
                {/* Chemical Energy Decal */}
                <rect x="25" y="-2" width="50" height="30" rx="6" fill="#1d4ed8" />
                <text x="50" y="17" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">1.5V DC</text>
                
                {/* Polarity markers */}
                <text x="114" y="19" fill="#60a5fa" fontSize="16" fontWeight="bold" textAnchor="middle">+</text>
                <text x="18" y="18" fill="#94a3b8" fontSize="18" fontWeight="bold" textAnchor="middle">-</text>

                <text x="70" y="47" fill="#93c5fd" fontSize="10" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em">
                  SEL KERING (TENAGA KIMIA)
                </text>
              </g>
            ) : (
              <g>
                <rect x="10" y="-8" width="120" height="42" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="70" y="18" fill="#64748b" fontSize="11" textAnchor="middle" fontWeight="500">
                  + Ruang Sel Kering -
                </text>
              </g>
            )}
          </g>

          {/* 2. BULB COMPONENT (Top Wire) */}
          <g id="bulb-component" transform="translate(300, 50)">
            {/* Background mask to break top wire */}
            <rect x="-60" y="-65" width="120" height="130" fill="#030712" rx="10" />

            {hasBulb ? (
              <g 
                className="cursor-pointer"
                onClick={() => onToggleBulbBreak && onToggleBulbBreak(0)}
              >
                {/* Radiating Light Aura when bulb is on */}
                {isCompleteCircuit && brokenBulbIndex !== 0 && (
                  <circle
                    cx="0"
                    cy="-25"
                    r={65 * effectiveBrightness}
                    fill="url(#lamp-aura)"
                    className="transition-all duration-300 animate-pulse"
                  />
                )}

                {/* Bulb Socket Base */}
                <rect x="-18" y="2" width="36" height="18" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
                <line x1="-15" y1="8" x2="15" y2="8" stroke="#475569" strokeWidth="1.5" />
                <line x1="-15" y1="14" x2="15" y2="14" stroke="#475569" strokeWidth="1.5" />

                {/* Glass Dome */}
                <circle
                  cx="0"
                  cy="-25"
                  r="30"
                  fill={isCompleteCircuit && brokenBulbIndex !== 0 ? '#fef08a' : '#0f172a'}
                  stroke={isCompleteCircuit && brokenBulbIndex !== 0 ? '#facc15' : '#334155'}
                  strokeWidth="3"
                  filter={isCompleteCircuit && brokenBulbIndex !== 0 ? 'url(#bulb-glow)' : 'none'}
                  className="transition-colors duration-300"
                />

                {/* Filament inside bulb */}
                <path
                  d="M -12 -14 L -7 -34 L 0 -40 L 7 -34 L 12 -14"
                  fill="none"
                  stroke={isCompleteCircuit && brokenBulbIndex !== 0 ? '#ea580c' : '#475569'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Filament Glow Core */}
                {isCompleteCircuit && brokenBulbIndex !== 0 && (
                  <circle cx="0" cy="-37" r="5" fill="#ffffff" filter="drop-shadow(0 0 6px #ffffff)" />
                )}

                <text x="0" y="36" fill={isCompleteCircuit && brokenBulbIndex !== 0 ? '#fde047' : '#94a3b8'} fontSize="10" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em">
                  {brokenBulbIndex === 0 ? '⚠️ MENTOL ROSAK' : 'MENTOL (CAHAYA + HABA)'}
                </text>
              </g>
            ) : (
              <g>
                <circle cx="0" cy="-25" r="28" fill="#0f172a" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="0" y="-21" fill="#64748b" fontSize="11" textAnchor="middle">
                  Ruang Mentol
                </text>
              </g>
            )}
          </g>

          {/* 3. SWITCH COMPONENT / MATERIAL GAP (Left Wire) */}
          {testedMaterialName ? (
            /* Conductor Tester Material Slot on Left Wire */
            <g id="tested-material-slot" transform="translate(80, 160)">
              <rect x="-42" y="-38" width="84" height="76" fill="#030712" rx="10" />
              <rect
                x="-34"
                y="-28"
                width="68"
                height="56"
                rx="8"
                fill={isConductor ? '#064e3b' : '#4c0519'}
                stroke={isConductor ? '#10b981' : '#f43f5e'}
                strokeWidth="2"
              />
              <text x="0" y="-3" fontSize="22" textAnchor="middle">
                {testedMaterialIcon || '❓'}
              </text>
              <text x="0" y="16" fill="#f8fafc" fontSize="9" textAnchor="middle" fontWeight="bold">
                {testedMaterialName}
              </text>
              <text x="0" y="42" fill={isConductor ? '#34d399' : '#fb7185'} fontSize="9" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em">
                {isConductor ? '✅ KONDUKTOR' : '❌ PENEBAT'}
              </text>
            </g>
          ) : (
            /* Interactive Knife / Blade Switch on Left Wire */
            <g
              id="switch-component"
              transform="translate(80, 160)"
              className={canToggleSwitch ? 'cursor-pointer group' : ''}
              onClick={() => canToggleSwitch && onToggleSwitch && onToggleSwitch()}
            >
              {/* Background mask to break left wire */}
              <rect x="-38" y="-48" width="76" height="96" fill="#030712" rx="10" />

              {/* Terminal Contact Points */}
              <circle cx="0" cy="-28" r="6.5" fill="#64748b" stroke="#cbd5e1" strokeWidth="2" />
              <circle cx="0" cy="28" r="6.5" fill="#64748b" stroke="#cbd5e1" strokeWidth="2" />

              {/* Switch Lever Blade */}
              {isSwitchClosed ? (
                // Closed Switch Blade
                <line
                  x1="0"
                  y1="-28"
                  x2="0"
                  y2="28"
                  stroke="#38bdf8"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="transition-all duration-200"
                />
              ) : (
                // Open Switch Blade (angled)
                <line
                  x1="0"
                  y1="28"
                  x2="-28"
                  y2="-22"
                  stroke="#f43f5e"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="transition-all duration-200"
                />
              )}

              {/* Switch Lever Handle Knob */}
              <circle
                cx={isSwitchClosed ? 0 : -28}
                cy={isSwitchClosed ? 0 : -22}
                r="7"
                fill={isSwitchClosed ? '#38bdf8' : '#f43f5e'}
                className="transition-all duration-200"
              />

              <text x="0" y="52" fill={isSwitchClosed ? '#38bdf8' : '#f43f5e'} fontSize="10" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em">
                {isSwitchClosed ? 'SUIS DITUTUP' : 'SUIS DIBUKA'}
              </text>
              {canToggleSwitch && (
                <text x="0" y="64" fill="#64748b" fontSize="8" textAnchor="middle">
                  (Klik suis)
                </text>
              )}
            </g>
          )}

          {/* Right Wire Diagnostic Tag */}
          <g transform="translate(520, 160)">
            <rect x="-38" y="-22" width="76" height="44" fill="#030712" rx="8" />
            <text x="0" y="-1" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontWeight="bold">
              Wayar Kuprum
            </text>
            <text x="0" y="14" fill="#60a5fa" fontSize="8" textAnchor="middle" fontWeight="semibold">
              (Laluan Arus)
            </text>
          </g>
        </svg>
      </div>

      {/* Footer Info Box inside Canvas */}
      {statusText && (
        <div className="mt-3 text-center bg-slate-900/80 border border-slate-800/90 rounded-2xl py-2.5 px-4 backdrop-blur-md">
          <p className="text-xs sm:text-sm text-slate-200 font-medium">
            {statusText}
          </p>
        </div>
      )}
    </div>
  );
};

