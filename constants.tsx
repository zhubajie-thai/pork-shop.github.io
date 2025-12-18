
import { Product, PorkCategory } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Premium Triple-Layer Belly',
    category: PorkCategory.CHOPS,
    price: 140,
    unit: 'kg',
    description: 'The ultimate standard for pork belly. Perfect fat-to-meat ratio for braising or crispy roasting.',
    imageUrl: 'https://images.unsplash.com/photo-1602491950780-1c5014a09805?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p2',
    name: 'Heritage Pork Neck (Jowl Cut)',
    category: PorkCategory.CHOPS,
    price: 138,
    unit: 'kg',
    description: 'Intensely marbled and tender. The preferred choice for "Kor Moo Yang" or premium grilling.',
    imageUrl: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p3',
    name: 'Tender Soft Bone Ribs',
    category: PorkCategory.RIBS,
    price: 132,
    unit: 'kg',
    description: 'Choice ribs with soft, edible cartilage. Ideal for slow-cooked soups and stews.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p4',
    name: 'Prime Center-Cut Long Loin',
    category: PorkCategory.ROASTS,
    price: 114,
    unit: 'kg',
    description: 'Lean and versatile. Perfect for roasting whole or cutting into uniform steaks.',
    imageUrl: 'https://images.unsplash.com/photo-1593344484962-796055d4a3a4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p5',
    name: 'Crispy Front Rib Cartilage',
    category: PorkCategory.RIBS,
    price: 116,
    unit: 'kg',
    description: 'Rich in collagen. Excellent for deep frying or high-flavor broths.',
    imageUrl: 'https://images.unsplash.com/photo-1582401656496-9d75f95f9018?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p6',
    name: 'Rear Leg Lean Roast',
    category: PorkCategory.ROASTS,
    price: 112,
    unit: 'kg',
    description: 'Large, lean muscle cut from the rear leg. Great for cured meats or lean roasting.',
    imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p7',
    name: 'Butcher\'s Select Spare Ribs',
    category: PorkCategory.RIBS,
    price: 90,
    unit: 'kg',
    description: 'Meaty middle ribs. A versatile cut for BBQ or traditional Cantonese-style steaming.',
    imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p8',
    name: 'Skin-on Shoulder Neck',
    category: PorkCategory.CHOPS,
    price: 82,
    unit: 'kg',
    description: 'Flavorful cut with skin attached, providing excellent texture for braised dishes.',
    imageUrl: 'https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p9',
    name: 'Fresh Heritage Pork Liver',
    category: PorkCategory.SPECIALTY,
    price: 75,
    unit: 'kg',
    description: 'Hand-selected fresh liver. Iron-rich and creamy when cooked with precision.',
    imageUrl: 'https://images.unsplash.com/photo-1598511726623-d30636f6004b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p10',
    name: 'Artisan Pork Rind Cubes',
    category: PorkCategory.SAUSAGES,
    price: 44,
    unit: 'kg',
    description: 'Perfectly cubed for rendering into lard and making the ultimate crispy pork rinds.',
    imageUrl: 'https://images.unsplash.com/photo-1606851091851-e8c8c0fca5ba?auto=format&fit=crop&q=80&w=800'
  }
];
