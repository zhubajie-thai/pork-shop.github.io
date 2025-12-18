
import React from 'react';
import { Plus, Info } from 'lucide-react';
import { Product } from '../types';
import { translations, LanguageCode } from '../translations';

interface ProductCardProps {
  product: Product;
  lang: LanguageCode;
  onAddToCart: (p: Product) => void;
  onShowDetails: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, lang, onAddToCart, onShowDetails }) => {
  const t = translations[lang];

  return (
    <div className="group bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        <button 
          onClick={() => onShowDetails(product)}
          className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-red-800 transition-colors">
          {product.name}
        </h3>
        <p className="text-stone-500 text-sm mb-6 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-bold">{t.currency}{product.price.toFixed(2)}</span>
            <span className="text-stone-400 text-sm font-medium"> / {t.unit}</span>
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 bg-stone-900 hover:bg-red-800 text-white p-3 rounded-xl transition-all shadow-lg active:scale-95"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
