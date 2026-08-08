import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Sparkles, X, CheckCircle2, Bot } from 'lucide-react';

interface VoiceAssistantCompanionProps {
  onClose: () => void;
  onSendMessage: (text: string) => Promise<void>;
  lastResponseText?: string;
}

export const VoiceAssistantCompanion: React.FC<VoiceAssistantCompanionProps> = ({
  onClose,
  onSendMessage,
  lastResponseText
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (lastResponseText) {
      speakText(lastResponseText);
    }
  }, [lastResponseText]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition API is not supported in this browser.');
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = async (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setIsListening(false);
      await onSendMessage(text);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Voice Companion Assistant"
    >
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl w-full max-w-lg p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
        {/* Glowing Orb Backdrops */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          aria-label="Close voice assistant"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-500 to-emerald-400 text-slate-950 flex items-center justify-center mx-auto shadow-2xl shadow-cyan-500/30">
          <Bot className="w-8 h-8 animate-bounce" />
        </div>

        <div>
          <h2 className="text-xl font-black text-white flex items-center justify-center gap-2">
            CampusOS <span className="text-cyan-400 font-mono text-sm">Hi-Fi Voice Assistant</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Hands-free natural speech, automated navigation & query execution
          </p>
        </div>

        {/* Dynamic Equalizer Visualizer Ring */}
        <div className="py-4 relative flex items-center justify-center">
          {/* Waveform Equalizer Rings */}
          <div className="flex items-center justify-center gap-1.5 absolute">
            {[30, 60, 90, 45, 75, 100, 50, 80, 40].map((val, idx) => (
              <div
                key={idx}
                style={{ height: isListening || isSpeaking ? `${val}%` : '20%' }}
                className="w-1.5 bg-gradient-to-t from-cyan-500 to-emerald-400 rounded-full transition-all duration-200"
              />
            ))}
          </div>

          <button
            onClick={startListening}
            className={`w-28 h-28 rounded-full flex items-center justify-center relative z-10 transition-all transform active:scale-95 shadow-2xl ${
              isListening
                ? 'bg-rose-500 text-white shadow-rose-500/50 animate-pulse border-4 border-rose-300'
                : 'bg-gradient-to-tr from-cyan-500 via-emerald-400 to-teal-500 text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-105 border-2 border-white/40'
            }`}
            aria-label="Tap to speak to CampusOS"
          >
            {isListening ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
          </button>
        </div>

        <p className="text-xs font-bold text-slate-300 mt-2 font-mono">
          {isListening ? '⚡ Listening to your voice input...' : 'Tap Glowing Mic to Speak'}
        </p>

        {/* Live Transcript Display */}
        {transcript && (
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-emerald-300">
            "{transcript}"
          </div>
        )}

        {/* Speech Output Status */}
        {isSpeaking && (
          <div className="flex items-center justify-center gap-2 text-xs text-teal-400 font-bold animate-pulse">
            <Volume2 className="w-4 h-4" /> Reading response aloud...
          </div>
        )}
      </div>
    </div>
  );
};
