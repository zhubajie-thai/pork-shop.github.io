
import React, { useState, useRef, useEffect } from 'react';
import { Send, Scissors } from 'lucide-react';
import { askTheButcher } from '../services/geminiService';
import { translations, LanguageCode } from '../translations';

export const ButcherChat: React.FC<{ lang: LanguageCode }> = ({ lang }) => {
  const t = translations[lang];
  const [messages, setMessages] = useState<{ role: 'user' | 'butcher', text: string }[]>([
    { role: 'butcher', text: t.peteInitial }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const response = await askTheButcher(userMsg, messages, lang);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'butcher', text: response }]);
  };

  return (
    <div className="bg-stone-100 rounded-3xl p-1 shadow-inner border border-stone-200">
      <div className="bg-white rounded-[22px] overflow-hidden flex flex-col h-[600px]">
        {/* Header */}
        <div className="bg-stone-900 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-800 flex items-center justify-center text-white">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold">{t.peteTitle}</h3>
            <p className="text-stone-400 text-xs">{t.peteAssistant}</p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                m.role === 'user' 
                ? 'bg-red-800 text-white rounded-tr-none' 
                : 'bg-stone-100 text-stone-800 rounded-tl-none'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-stone-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-stone-100 bg-stone-50">
          <div className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.petePlaceholder}
              className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-red-800 transition-all"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-2 p-1.5 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
