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
        {/* Glowing Orb Backdrop */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
          aria-label="Close voice assistant"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <Bot className="w-8 h-8 animate-bounce" />
        </div>

        <div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
            CampusOS Voice Companion
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Hands-Free Accessibility & Voice Navigation Engine
          </p>
        </div>

        {/* Big Mic Control Button */}
        <div className="py-4">
          <button
            onClick={startListening}
            className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto transition-all transform active:scale-95 shadow-xl ${
              isListening
                ? 'bg-red-500 text-white shadow-red-500/50 animate-ping'
                : 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-emerald-500/30 hover:scale-105'
            }`}
            aria-label="Tap to speak to CampusOS"
          >
            {isListening ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
          </button>
          <p className="text-xs font-semibold text-slate-300 mt-4">
            {isListening ? 'Listening to your request...' : 'Tap Mic to Speak'}
          </p>
        </div>

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
