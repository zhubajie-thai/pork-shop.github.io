
import React, { useState } from 'react';
import { ShoppingCart, Menu, PiggyBank, User as UserIcon, Globe, ChevronDown } from 'lucide-react';
import { User } from '../types';
import { translations, LanguageCode } from '../translations';

interface HeaderProps {
  cartCount: number;
  user: User | null;
  lang: LanguageCode;
  onCartClick: () => void;
  onNavClick: (section: string) => void;
  onAuthClick: () => void;
  onLogout: () => void;
  onLangChange: (lang: LanguageCode) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  user, 
  lang, 
  onCartClick, 
  onNavClick, 
  onAuthClick, 
  onLogout,
  onLangChange
}) => {
  const t = translations[lang];
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'th', label: 'ไทย' },
    { code: 'my', label: 'မြန်မာ' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-stone-900 text-white shadow-xl">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavClick('hero')}>
          <div className="p-2 bg-red-800 rounded-full">
            <PiggyBank className="w-6 h-6" />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tighter uppercase font-serif">{t.shopName}</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          <button onClick={() => onNavClick('shop')} className="hover:text-red-400 transition-colors">{t.navShop}</button>
          <button onClick={() => onNavClick('butcher')} className="hover:text-red-400 transition-colors">{t.navButcher}</button>
          <button onClick={() => onNavClick('about')} className="hover:text-red-400 transition-colors">{t.navStory}</button>
        </nav>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors text-xs font-bold uppercase"
            >
              <Globe className="w-4 h-4 text-stone-400" />
              <span className="hidden sm:inline">{lang}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-[-1]" onClick={() => setIsLangOpen(false)}></div>
                <div className="absolute top-full mt-2 right-0 bg-stone-800 border border-stone-700 rounded-xl shadow-2xl overflow-hidden min-w-[120px]">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        onLangChange(l.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-xs font-bold hover:bg-red-800 transition-colors border-b border-stone-700 last:border-0 ${lang === l.code ? 'text-red-400 bg-stone-900' : 'text-stone-300'}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="h-6 w-[1px] bg-stone-700 mx-1"></div>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex flex-col items-end mr-2">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">{t.welcomeBack}</span>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-xs font-bold uppercase tracking-tighter text-red-400"
              >
                {t.logout}
              </button>
            </div>
          ) : (
            <button 
              onClick={onAuthClick}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-bold transition-colors"
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{t.signIn}</span>
            </button>
          )}
          
          <button 
            onClick={onCartClick}
            className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-stone-900">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
