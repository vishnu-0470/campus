import React, { useState } from 'react';
import {
  HelpCircle,
  Send,
  Sparkles,
  BookOpen,
  Code2,
  Cpu,
  BrainCircuit,
  MessageSquare,
  Bot,
  User,
  X,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { AcademicDoubt } from '../types';

interface AIDoubtChatboxProps {
  accessibilityTransparency?: boolean;
}

export const AIDoubtChatbox: React.FC<AIDoubtChatboxProps> = ({
  accessibilityTransparency
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [questionInput, setQuestionInput] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Data Structures & Algorithms');
  const [isLoading, setIsLoading] = useState(false);

  const [doubtsHistory, setDoubtsHistory] = useState<AcademicDoubt[]>([
    {
      id: 'dbt_1',
      subject: 'Data Structures & Algorithms',
      question: 'What is the difference between BFS and DFS traversal on a graph?',
      answer: 'BFS (Breadth-First Search) uses a Queue data structure and visits graph vertices level by level (ideal for shortest path in unweighted graphs). DFS (Depth-First Search) uses a Stack or Recursion and explores as deep as possible along each branch before backtracking.',
      codeSnippet: `// BFS Example (Queue)
queue<int> q;
q.push(startNode);
visited[startNode] = true;`,
      timestamp: 'Today 10:15 AM'
    }
  ]);

  const panelClass = accessibilityTransparency ? 'solid-panel' : 'glass-panel';

  const quickSubjects = [
    'Data Structures & Algorithms',
    'Deep Learning & Neural Nets',
    'Database Management Systems',
    'Operating Systems Kernel',
    'Discrete Mathematics'
  ];

  const handleAskDoubt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim() || isLoading) return;

    const qText = questionInput;
    setQuestionInput('');
    setIsLoading(true);

    const tempDoubt: AcademicDoubt = {
      id: `dbt_${Date.now()}`,
      subject: selectedSubject,
      question: qText,
      timestamp: new Date().toLocaleTimeString()
    };

    setDoubtsHistory((prev) => [tempDoubt, ...prev]);

    try {
      const res = await fetch('/api/doubts/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: selectedSubject,
          question: qText
        })
      });

      const data = await res.json();

      setDoubtsHistory((prev) =>
        prev.map((d) => {
          if (d.id === tempDoubt.id) {
            return {
              ...d,
              answer: data.answer || 'Here is the step-by-step breakdown based on Vasavi CSE syllabus.',
              codeSnippet: data.codeSnippet
            };
          }
          return d;
        })
      );
    } catch (err) {
      setDoubtsHistory((prev) =>
        prev.map((d) => {
          if (d.id === tempDoubt.id) {
            return {
              ...d,
              answer: 'I have analyzed your doubt. In ' + selectedSubject + ', key fundamentals revolve around time complexity and state transitions.'
            };
          }
          return d;
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-2xl flex items-center gap-2 transition-all transform hover:scale-105"
          aria-label="Open AI Academic Doubts Chatbox"
        >
          <BrainCircuit className="w-5 h-5 text-emerald-200 animate-pulse" />
          <span>Ask AI Academic Doubt</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
        </button>
      )}

      {/* Expanded Floating Chat Panel */}
      {isOpen && (
        <div className={`w-[90vw] sm:w-[440px] max-h-[600px] ${panelClass} rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-200`}>
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold flex items-center gap-1.5">
                  Academic Doubts Solver AI
                  <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-emerald-500/30 text-emerald-300">
                    Gemini 3.6
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400">Vasavi CSE/IT Syllabus Tutor</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              aria-label="Close Chatbox"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Subject Tags */}
          <div className="p-3 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[10px]">
            {quickSubjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-2.5 py-1 rounded-xl whitespace-nowrap font-bold transition-all ${
                  selectedSubject === sub
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {sub.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Messages & Answers Area */}
          <div className="p-4 overflow-y-auto flex-1 space-y-4 max-h-[380px]">
            {doubtsHistory.map((item) => (
              <div key={item.id} className="space-y-2">
                {/* User Question Bubble */}
                <div className="flex items-start justify-end gap-2">
                  <div className="p-3 rounded-2xl bg-indigo-600 text-white text-xs max-w-[85%] shadow-sm">
                    <span className="text-[9px] font-mono opacity-80 block mb-0.5">
                      Subject: {item.subject}
                    </span>
                    <p className="font-semibold">{item.question}</p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-indigo-700 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                </div>

                {/* AI Assistant Answer Bubble */}
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs max-w-[88%] border border-slate-200 dark:border-slate-800 space-y-2">
                    {item.answer ? (
                      <p className="leading-relaxed">{item.answer}</p>
                    ) : (
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold animate-pulse">
                        <Sparkles className="w-4 h-4" /> Solving doubt with Gemini AI...
                      </div>
                    )}

                    {item.codeSnippet && (
                      <pre className="p-2.5 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[10px] overflow-x-auto border border-slate-800">
                        <code>{item.codeSnippet}</code>
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Question Form */}
          <form onSubmit={handleAskDoubt} className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              placeholder={`Ask doubt in ${selectedSubject}...`}
              className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={isLoading || !questionInput.trim()}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
