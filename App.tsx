
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ButcherChat } from './components/ButcherChat';
import { AuthModal } from './components/AuthModal';
import { PRODUCTS } from './constants';
import { Product, CartItem, Recipe, User } from './types';
import { X, ChefHat, Clock, Sparkles } from 'lucide-react';
import { generateRecipeForProduct } from './services/geminiService';
import { translations, LanguageCode, getBrowserLang } from './translations';

const App: React.FC = () => {
  const [lang, setLang] = useState<LanguageCode>('en');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [aiRecipe, setAiRecipe] = useState<Recipe | null>(null);
  const [loadingRecipe, setLoadingRecipe] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('pork_barrel_lang') as LanguageCode;
    if (savedLang) {
      setLang(savedLang);
    } else {
      setLang(getBrowserLang());
    }
    
    const savedUser = localStorage.getItem('pork_barrel_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const t = translations[lang];

  const handleLangChange = (newLang: LanguageCode) => {
    setLang(newLang);
    localStorage.setItem('pork_barrel_lang', newLang);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleShowDetails = async (product: Product) => {
    setSelectedProduct(product);
    setAiRecipe(null);
    setLoadingRecipe(true);
    const recipe = await generateRecipeForProduct(product.name, lang);
    setAiRecipe(recipe);
    setLoadingRecipe(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('pork_barrel_user');
    setUser(null);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    // Simple client-side "customer" based on logged-in user or anonymous.
    const customerPayload = user
      ? {
          name: user.name,
          email: user.email,
        }
      : {
          name: 'Guest',
          email: 'guest@example.com',
        };

    const itemsPayload = cart.map((item) => ({
      productId: item.id,
      name: item.name,
      unitPrice: item.price,
      quantity: item.quantity,
    }));

    try {
      const res = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: customerPayload,
          items: itemsPayload,
        }),
      });

      if (!res.ok) {
        console.error('Failed to place order', await res.text());
        return;
      }

      const order = await res.json();
      console.log('Order placed:', order);
      setCart([]);
      setIsCartOpen(false);
      alert('Order placed successfully!');
    } catch (err) {
      console.error('Error placing order', err);
    }
  };

  return (
    <div className="min-h-screen">
      <Header 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)} 
        user={user}
        lang={lang}
        onCartClick={() => setIsCartOpen(true)}
        onNavClick={scrollToSection}
        onAuthClick={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onLangChange={handleLangChange}
      />

      <main>
        <div id="hero">
          <Hero onExplore={() => scrollToSection('shop')} lang={lang} />
        </div>

        {/* Shop Section */}
        <section id="shop" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">{t.inventoryTitle}</h2>
              <p className="text-stone-500 uppercase tracking-widest text-xs font-bold">{t.updated}: {new Date().toLocaleDateString(lang)}</p>
              <div className="w-24 h-1 bg-red-800 mx-auto rounded-full mt-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {PRODUCTS.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  lang={lang}
                  onAddToCart={addToCart} 
                  onShowDetails={handleShowDetails}
                />
              ))}
            </div>
          </div>
        </section>

        {/* AI Butcher & Recipes Section */}
        <section id="butcher" className="py-24 bg-stone-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-serif font-bold mb-6">{t.expertAdvice}</h2>
                <p className="text-stone-600 mb-8 leading-relaxed">
                  {t.peteSub}
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-stone-200">
                    <div className="p-3 bg-red-50 rounded-lg"><Sparkles className="text-red-800" /></div>
                    <div>
                      <h4 className="font-bold">{t.breedGuidance}</h4>
                      <p className="text-sm text-stone-500">{t.breedSub}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-stone-200">
                    <div className="p-3 bg-red-50 rounded-lg"><ChefHat className="text-red-800" /></div>
                    <div>
                      <h4 className="font-bold">{t.cookingPrecision}</h4>
                      <p className="text-sm text-stone-500">{t.cookingSub}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <ButcherChat lang={lang} />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="about" className="bg-stone-900 text-stone-400 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-white text-2xl font-serif font-bold mb-6">{t.shopName}</h3>
                <p className="mb-6 max-w-md">Dedicated to the craft of butchery and the preservation of heritage livestock. We believe in high-welfare farming and transparency from farm to table.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">{t.navShop}</h4>
                <ul className="space-y-4">
                  <li><button onClick={() => scrollToSection('shop')} className="hover:text-white">All Cuts</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Visit Us</h4>
                <p className="text-sm leading-relaxed">
                  123 Market Street<br />
                  Chicago, IL 60601<br />
                  (555) 123-4567<br />
                  hello@porkbarrel.com
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <h3 className="text-xl font-serif font-bold">{t.basket}</h3>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-stone-400">{t.basketEmpty}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <img src={item.imageUrl} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-grow">
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <p className="text-xs text-stone-500 mb-2">{item.quantity} x {t.currency}{item.price.toFixed(2)}</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-800 font-bold hover:underline">{t.remove}</button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{t.currency}{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-stone-100 bg-stone-50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-stone-500">{t.total}</span>
                <span className="text-2xl font-bold">{t.currency}{cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-stone-900 hover:bg-red-800 text-white py-4 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cart.length === 0}
              >
                {t.checkout}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        lang={lang}
        onClose={() => setIsAuthOpen(false)} 
        onAuthSuccess={(u) => setUser(u)} 
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-md" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 left-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white md:hidden">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <button onClick={() => setSelectedProduct(null)} className="hidden md:block absolute top-6 right-6 p-2 hover:bg-stone-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
              
              <div className="mb-8">
                <span className="text-red-800 text-xs font-bold uppercase tracking-widest mb-2 block">{selectedProduct.category}</span>
                <h3 className="text-4xl font-serif font-bold mb-4">{selectedProduct.name}</h3>
                <h4 className="text-stone-400 font-serif italic mb-4">{t.currency}{selectedProduct.price.toFixed(2)} / {t.unit}</h4>
                <p className="text-stone-500 leading-relaxed mb-6">{selectedProduct.description}</p>
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                    className="bg-stone-900 text-white px-8 py-3 rounded-full font-bold hover:bg-red-800 transition-colors shadow-lg"
                  >
                    {t.addBasket}
                  </button>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-8">
                <div className="flex items-center gap-2 mb-6">
                  <ChefHat className="text-red-800 w-5 h-5" />
                  <h4 className="font-bold uppercase tracking-widest text-sm">{t.aiSuggestion}</h4>
                </div>

                {loadingRecipe ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-stone-100 rounded w-3/4"></div>
                    <div className="h-4 bg-stone-100 rounded w-1/2"></div>
                    <div className="h-32 bg-stone-50 rounded"></div>
                  </div>
                ) : aiRecipe ? (
                  <div className="bg-red-50/50 rounded-2xl p-6 border border-red-100">
                    <h5 className="font-serif text-xl font-bold mb-4">{aiRecipe.title}</h5>
                    <div className="flex gap-6 mb-6 text-xs font-bold text-red-800 uppercase tracking-tighter">
                      <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {aiRecipe.cookingTime}</div>
                      <div>Difficulty: {aiRecipe.difficulty}</div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-xs font-bold uppercase mb-2">Ingredients</p>
                      <ul className="text-sm text-stone-600 space-y-1">
                        {aiRecipe.ingredients.slice(0, 4).map((ing, i) => (
                          <li key={i}>• {ing}</li>
                        ))}
                        {aiRecipe.ingredients.length > 4 && <li>+ {aiRecipe.ingredients.length - 4} more</li>}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-xs font-bold uppercase mb-2">Primary Step</p>
                      <p className="text-sm text-stone-600 line-clamp-3 italic">"{aiRecipe.instructions[0]}"</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-stone-400">{t.peteRecipeFail}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
