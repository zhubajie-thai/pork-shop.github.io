
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { translations, LanguageCode } from '../translations';

export const Hero: React.FC<{ onExplore: () => void, lang: LanguageCode }> = ({ onExplore, lang }) => {
  const t = translations[lang];
  return (
    <section className="relative h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=2000" 
          alt="Grilled Pork" 
          className="w-full h-full object-cover brightness-[0.4]"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-2xl">
          <h2 className="text-red-500 font-bold uppercase tracking-[0.2em] mb-4">{t.established}</h2>
          <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-tight">
            {t.heroTitle} <br />
            <span className="italic">{t.heroTitleItalic}</span>.
          </h1>
          <p className="text-lg md:text-xl text-stone-300 mb-8 leading-relaxed max-w-lg">
            {t.heroSub}
          </p>
          <button 
            onClick={onExplore}
            className="group flex items-center gap-3 bg-red-800 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-2xl hover:scale-105"
          >
            {t.exploreCuts}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
