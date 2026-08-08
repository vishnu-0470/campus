import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sliders,
  Radio,
  Headphones,
  Activity,
  Mic,
  MicOff,
  Sparkles,
  Zap,
  Disc,
  Music,
  Maximize2
} from 'lucide-react';

interface PremiumAudioHeaderProps {
  activeVoiceMode: boolean;
  onToggleVoiceMode: () => void;
  accessibilityTransparency?: boolean;
}

export const PremiumAudioHeader: React.FC<PremiumAudioHeaderProps> = ({
  activeVoiceMode,
  onToggleVoiceMode,
  accessibilityTransparency
}) => {
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<'focus' | 'ambient' | 'binaural'>('focus');
  const [eqFreqs, setEqFreqs] = useState<number[]>([40, 65, 85, 50, 70, 90, 45, 80, 60, 75, 55, 95]);

  // Audio Context synthesizer for relaxing focus soundscape
  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let osc: OscillatorNode | null = null;
    let gain: GainNode | null = null;

    if (isPlayingAmbient) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtx = new AudioContextClass();
        osc = audioCtx.createOscillator();
        gain = audioCtx.createGain();

        const baseFreq = selectedPreset === 'focus' ? 174 : selectedPreset === 'ambient' ? 285 : 432;
        osc.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);
        osc.type = 'sine';

        // Low ambient volume
        gain.gain.setValueAtTime((volume / 100) * 0.03, audioCtx.currentTime);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
      } catch (err) {
        console.error('Web Audio API initialized:', err);
      }
    }

    // Dynamic EQ frequency bars animation loop
    const interval = setInterval(() => {
      setEqFreqs((prev) =>
        prev.map(() => Math.floor(Math.random() * 70) + 25)
      );
    }, 200);

    return () => {
      clearInterval(interval);
      if (osc) osc.stop();
      if (audioCtx) audioCtx.close();
    };
  }, [isPlayingAmbient, selectedPreset, volume]);

  const panelClass = accessibilityTransparency ? 'solid-panel' : 'glass-panel';

  return (
    <div className={`${panelClass} rounded-3xl p-4 md:p-5 border border-cyan-500/20 dark:border-cyan-500/30 shadow-2xl transition-all relative overflow-hidden bg-slate-900/90 text-white`}>
      {/* Background Subtle Waveform Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-indigo-500/10 pointer-events-none blur-3xl opacity-60" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Left: Branding & Studio Mode Badge */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 via-emerald-500 to-indigo-600 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              <Disc className="w-6 h-6 animate-spin-slow" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                  CampusOS <span className="text-cyan-400 font-mono text-xs">AUDIO STUDIO v3.6</span>
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono font-bold flex items-center gap-1">
                  <Activity className="w-3 h-3 text-cyan-400" /> 48kHz Hi-Fi
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time Gemini voice engine, spatial study soundscapes & audio circular reader
              </p>
            </div>
          </div>

          <button
            onClick={onToggleVoiceMode}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all lg:hidden ${
              activeVoiceMode
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_#10b981]'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            {activeVoiceMode ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
            {activeVoiceMode ? 'Voice ON' : 'Voice Off'}
          </button>
        </div>

        {/* Center: Live Interactive Audio Waveform Spectrum */}
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner w-full lg:w-auto justify-center">
          <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase mr-2 flex items-center gap-1">
            <Radio className="w-3 h-3 animate-pulse text-emerald-400" /> Equalizer
          </span>

          <div className="flex items-end gap-1 h-7">
            {eqFreqs.map((heightVal, idx) => (
              <div
                key={idx}
                style={{ height: `${isPlayingAmbient || activeVoiceMode ? heightVal : 15}%` }}
                className={`w-1 rounded-full transition-all duration-150 ${
                  idx % 3 === 0
                    ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]'
                    : idx % 3 === 1
                    ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                    : 'bg-indigo-400 shadow-[0_0_8px_#818cf8]'
                }`}
              />
            ))}
          </div>

          <span className="text-[10px] font-mono text-slate-400 ml-2">
            {isPlayingAmbient ? '432 Hz Solfeggio' : activeVoiceMode ? 'Voice Active' : 'Standby'}
          </span>
        </div>

        {/* Right Controls: Ambient Focus Soundscape & Volume Dial */}
        <div className="flex items-center gap-3 flex-wrap w-full lg:w-auto justify-end">
          {/* Ambient Soundscape Player */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/90 border border-slate-800">
            <button
              onClick={() => setIsPlayingAmbient(!isPlayingAmbient)}
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isPlayingAmbient
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_#22d3ee]'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              {isPlayingAmbient ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPlayingAmbient ? 'Pause Focus Ambient' : 'Play Focus Ambient'}</span>
            </button>

            <select
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(e.target.value as 'focus' | 'ambient' | 'binaural')}
              className="bg-transparent text-xs font-bold text-slate-300 px-2 py-1 focus:outline-none cursor-pointer"
            >
              <option value="focus" className="bg-slate-900 text-slate-100">🧠 174Hz Focus Wave</option>
              <option value="ambient" className="bg-slate-900 text-slate-100">🌿 285Hz Ambient Campus</option>
              <option value="binaural" className="bg-slate-900 text-slate-100">🎧 432Hz Binaural Zen</option>
            </select>
          </div>

          {/* Master Volume Dial */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-950/90 border border-slate-800">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>

            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-[10px] font-mono font-bold text-slate-400 w-6">
              {isMuted ? '0%' : `${volume}%`}
            </span>
          </div>

          {/* Voice AI Engine Toggle Button */}
          <button
            onClick={onToggleVoiceMode}
            className={`hidden lg:flex px-4 py-2 rounded-2xl text-xs font-black items-center gap-2 transition-all border ${
              activeVoiceMode
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 border-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.6)]'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            {activeVoiceMode ? (
              <>
                <Mic className="w-4 h-4 text-slate-950 animate-pulse" />
                <span>Voice Agent Live</span>
              </>
            ) : (
              <>
                <MicOff className="w-4 h-4 text-slate-400" />
                <span>Enable Voice Assistant</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
