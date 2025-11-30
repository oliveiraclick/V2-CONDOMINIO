
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, MessageCircle, Edit2, Trash2, MapPin, Search } from 'lucide-react';
import { MOCK_DESAPEGO_ITEMS } from '../types';
import { Button } from '../components/Button';

export const DesapegoFeed: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(MOCK_DESAPEGO_ITEMS);

  const handleBack = () => {
    navigate('/dashboard', { state: { role: 'resident' } });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBack} 
            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Desapego</h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100">
          <Search size={20} />
        </button>
      </div>

      {/* Floating Action Button for New Post */}
      <div className="fixed bottom-32 right-6 z-40">
        <button 
          onClick={() => navigate('/desapego/new')}
          className="w-16 h-16 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-full shadow-glow text-white flex items-center justify-center active:scale-90 transition-transform hover:-translate-y-1"
        >
          <Plus size={32} />
        </button>
      </div>

      {/* Feed */}
      <div className="p-6 space-y-8 animate-slide-up">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-[32px] overflow-hidden shadow-soft border border-slate-50 group">
            
            {/* Header: Seller Info */}
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={item.sellerAvatar} alt={item.sellerName} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{item.sellerName}</h3>
                  <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                    <MapPin size={10} /> {item.sellerAddress} • {item.date}
                  </div>
                </div>
              </div>
              
              {item.isOwner && (
                <div className="flex gap-2">
                   <button onClick={() => navigate(`/desapego/edit/${item.id}`)} className="p-2 text-slate-400 hover:text-violet-600 bg-slate-50 rounded-full">
                      <Edit2 size={16} />
                   </button>
                   <button className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 rounded-full">
                      <Trash2 size={16} />
                   </button>
                </div>
              )}
            </div>

            {/* Image Carousel (Simplified) */}
            <div className="relative aspect-square w-full bg-slate-100">
               <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
               {item.images.length > 1 && (
                 <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-white text-xs font-bold">
                   + {item.images.length - 1} fotos
                 </div>
               )}
               
               {/* Price Tag Overlay */}
               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-lg px-4 py-2 rounded-2xl">
                 <span className="text-xs font-bold text-slate-400 uppercase mr-1">R$</span>
                 <span className="text-xl font-black text-slate-900">{item.price.toFixed(2)}</span>
               </div>
            </div>

            {/* Content */}
            <div className="p-6">
               <h2 className="text-xl font-black text-slate-800 mb-2 leading-tight">{item.title}</h2>
               <p className="text-slate-500 text-sm leading-relaxed mb-6">{item.description}</p>
               
               {/* Action */}
               {!item.isOwner ? (
                 <Button 
                   fullWidth 
                   className="!bg-green-500 hover:!bg-green-600 !shadow-none"
                   icon={<MessageCircle size={20} />}
                 >
                   Chamar no WhatsApp
                 </Button>
               ) : (
                 <div className="w-full py-3 bg-slate-50 rounded-2xl text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                   Seu anúncio
                 </div>
               )}
            </div>
          </div>
        ))}

        {/* Load More Mock */}
        <div className="pt-4 text-center">
           <button className="text-sm font-bold text-violet-600 hover:text-violet-700 uppercase tracking-widest border-b-2 border-violet-100 pb-1">
             Ver tudo
           </button>
        </div>
      </div>
    </div>
  );
};
