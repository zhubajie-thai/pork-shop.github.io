
import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { User } from '../types';
import { translations, LanguageCode } from '../translations';

interface AuthModalProps {
  isOpen: boolean;
  lang: LanguageCode;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, lang, onClose, onAuthSuccess }) => {
  const t = translations[lang];
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: isLogin ? (lang === 'th' ? 'ลูกค้าผู้มีอุปการคุณ' : lang === 'my' ? 'ချစ်ခင်ရပါသော ဖောက်သည်' : 'Valued Customer') : name,
        email: email
      };
      
      localStorage.setItem('pork_barrel_user', JSON.stringify(mockUser));
      onAuthSuccess(mockUser);
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl p-8 md:p-10">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-stone-100 rounded-full transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-10">
          <h3 className="text-3xl font-serif font-bold mb-2">
            {isLogin ? t.authLogin : t.authRegister}
          </h3>
          <p className="text-stone-500 text-sm">
            {isLogin ? t.authLoginSub : t.authRegisterSub}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                required
                placeholder={t.fullName}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-800 transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="email"
              required
              placeholder={t.email}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-800 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="password"
              required
              placeholder={t.password}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-800 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 hover:bg-red-800 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                {isLogin ? t.signIn : t.createAccount}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-stone-100 text-center">
          <p className="text-stone-500 text-sm">
            {isLogin ? t.noAccount : t.hasAccount}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-red-800 font-bold hover:underline"
            >
              {isLogin ? t.registerNow : t.signIn}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
