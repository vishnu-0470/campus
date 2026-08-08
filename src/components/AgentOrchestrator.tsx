import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  Cpu,
  FileText,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Mic,
  MicOff,
  Volume2,
  Maximize2
} from 'lucide-react';
import { Message, ExecutionPlan, PendingApproval, UserProfile } from '../types';

interface AgentOrchestratorProps {
  messages: Message[];
  onSendMessage: (text: string) => Promise<void>;
  onApproveAction: (approvalId: string) => void;
  onRejectAction: (approvalId: string) => void;
  currentUser: UserProfile;
  accessibilityTransparency: boolean;
}

export const AgentOrchestrator: React.FC<AgentOrchestratorProps> = ({
  messages,
  onSendMessage,
  onApproveAction,
  onRejectAction,
  currentUser,
  accessibilityTransparency
}) => {
  const [inputText, setInputText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedTraceId, setExpandedTraceId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const panelClass = accessibilityTransparency ? 'solid-panel' : 'glass-panel';

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSubmitting) return;
    const text = inputText;
    setInputText('');
    setIsSubmitting(true);
    await onSendMessage(text);
    setIsSubmitting(false);
  };

  const startSpeechInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. You can type your request.');
      return;
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleSpeakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`w-full ${panelClass} rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col h-[650px] overflow-hidden`}>
      {/* Header Bar */}
      <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              Multi-Agent Orchestrator
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Vasavi College • 9 Specialized Agents Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Human-In-Loop Safe
          </span>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 border-b border-slate-200/60 dark:border-slate-800/60 bg-slate-100/40 dark:bg-slate-900/40 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
          Try:
        </span>
        {[
          'Am I eligible for Google internship?',
          'Book Badminton Court 1 at 4 PM',
          'Who do I contact for attendance condonation?',
          'Which lab has 3D printing equipment?'
        ].map((promptText, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInputText(promptText);
            }}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors shrink-0 text-left truncate max-w-[240px]"
          >
            {promptText}
          </button>
        ))}
      </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                isUser ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                    : 'bg-emerald-500 text-white'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] space-y-2`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {!isUser && (
                    <button
                      onClick={() => handleSpeakMessage(msg.text)}
                      className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 hover:underline"
                      title="Read aloud response"
                    >
                      <Volume2 className="w-3 h-3" /> Read Aloud
                    </button>
                  )}
                </div>

                {/* Explainable AI Execution Tree & Plan Details */}
                {msg.plan && (
                  <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs">
                    <button
                      onClick={() =>
                        setExpandedTraceId(
                          expandedTraceId === msg.plan?.id ? null : (msg.plan?.id || null)
                        )
                      }
                      className="w-full flex items-center justify-between font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-500"
                    >
                      <span className="flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-emerald-500" />
                        Explainable AI Trace ({msg.plan.steps.length} Agent Steps)
                      </span>
                      {expandedTraceId === msg.plan.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {/* Reasoning Details */}
                    {expandedTraceId === msg.plan.id && (
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                        <div className="p-2 rounded bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 font-medium">
                          <strong>Orchestrator Decision:</strong> {msg.plan.orchestratorReasoning}
                        </div>

                        <div className="space-y-1.5 mt-2">
                          {msg.plan.steps.map((step, idx) => (
                            <div
                              key={idx}
                              className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80"
                            >
                              <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                                <span className="text-emerald-600 dark:text-emerald-400">
                                  {step.agentName}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800">
                                  Tool: {step.toolUsed}
                                </span>
                              </div>
                              <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                                {step.action}
                              </p>
                              <p className="text-[11px] text-slate-500 italic mt-0.5">
                                Thought: "{step.thought}"
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* RAG Citations */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.citations.map((cite, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-[11px] text-teal-800 dark:text-teal-300 max-w-full"
                      >
                        <div className="flex items-center gap-1 font-bold">
                          <FileText className="w-3.5 h-3.5 shrink-0" />
                          <span>{cite.documentTitle}</span>
                        </div>
                        <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                          "{cite.snippet}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Embedded Human-In-The-Loop Approval Card */}
                {msg.approval && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30 text-xs shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" /> Human Approval Required
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 font-bold text-[10px]">
                        Risk: {msg.approval.riskLevel.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {msg.approval.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                      {msg.approval.description}
                    </p>

                    {/* Action Details Table */}
                    <div className="my-3 p-2.5 rounded bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-1">
                      {Object.entries(msg.approval.details).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-[11px]">
                          <span className="text-slate-500 font-medium">{k}:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {String(v)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {msg.approval.approved ? (
                      <div className="p-2 rounded bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Action Approved & Executed!
                      </div>
                    ) : msg.approval.rejected ? (
                      <div className="p-2 rounded bg-red-500/20 text-red-800 dark:text-red-300 font-bold flex items-center gap-1">
                        <XCircle className="w-4 h-4 text-red-500" /> Action Cancelled.
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onApproveAction(msg.approval!.id)}
                          className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Approve Action
                        </button>
                        <button
                          onClick={() => onRejectAction(msg.approval!.id)}
                          className="flex-1 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                        >
                          <XCircle className="w-4 h-4" /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isSubmitting && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 p-2 italic">
            <Sparkles className="w-4 h-4 text-emerald-500 animate-spin" />
            Orchestrator reasoning over multi-agent graph & Vasavi institutional database...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 flex items-center gap-2">
        <button
          type="button"
          onClick={startSpeechInput}
          className={`p-2.5 rounded-xl transition-colors ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
          title="Speech-to-Text Input"
          aria-label="Toggle Speech Input"
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask CampusOS (e.g. 'Book badminton court', 'Am I eligible for Google drive?')..."
          className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Type message to CampusOS AI"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isSubmitting}
          className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold transition-opacity flex items-center justify-center"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
