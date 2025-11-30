
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Package, Wrench, MoreVertical, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { MOCK_PROVIDERS, Offer } from '../types';

export const ProviderStore: React.FC = () => {
  const navigate = useNavigate();
  // Mocking data from the first provider
  const [offers, setOffers] = useState<Offer[]>(MOCK_PROVIDERS[0].offers || []);
  const [activeTab, setActiveTab] = useState<'product' | 'service'>('service'); // Default changed to service

  const handleBack = () => {
    navigate('/dashboard', { state: { role: 'provider' } });
  };

  const filteredOffers = offers.filter(o => o.type === activeTab);

  const toggleAvailability = (id: string) => {
    // In a real app, this would update the backend
    alert(`Status do item ${id} alterado!`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32">
      {/* Header */}
      <div className="bg-slate-900 pt-6 pb-8 px-6 rounded-b-[40px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 rounded-full blur-[80px]"></div>
        
        <div className="relative z-10 flex items-center justify-between mb-8">
           <div className="flex items-center gap-4">
              <button onClick={handleBack} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold text-white">Minha Loja</h1>
           </div>
           <button 
             onClick={() => navigate('/provider/offer/new')}
             className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
           >
             <Plus size={20} />
           </button>
        </div>

        {/* Tabs - Swapped Order: Service First */}
        <div className="relative z-10 flex bg-white/10 p-1 rounded-2xl backdrop-blur-sm">
           <button
             onClick={() => setActiveTab('service')}
             className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
               activeTab === 'service' 
                 ? 'bg-white text-slate-900 shadow-lg' 
                 : 'text-slate-400 hover:bg-white/5'
             }`}
           >
             <Wrench size={16} /> Serviços
           </button>
           <button
             onClick={() => setActiveTab('product')}
             className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
               activeTab === 'product' 
                 ? 'bg-white text-slate-900 shadow-lg' 
                 : 'text-slate-400 hover:bg-white/5'
             }`}
           >
             <Package size={16} /> Produtos
           </button>
        </div>
      </div>

      {/* Helper Text */}
      <div className="px-6 mt-6">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">
          Gerenciando {activeTab === 'product' ? 'Estoque' : 'Serviços'}
        </p>
      </div>

      {/* List */}
      <div className="px-6 space-y-4 animate-slide-up">
         {filteredOffers.length === 0 ? (
           <div className="text-center py-12 bg-white rounded-[32px] border border-slate-50 border-dashed">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mx-auto mb-4">
                 {activeTab === 'product' ? <Package size={32} /> : <Wrench size={32} />}
              </div>
              <p className="font-bold text-slate-400 mb-4">Você ainda não tem {activeTab === 'product' ? 'produtos' : 'serviços'}.</p>
              <button 
                onClick={() => navigate('/provider/offer/new')}
                className="text-violet-600 font-bold text-sm hover:underline"
              >
                Cadastrar agora
              </button>
           </div>
         ) : (
           filteredOffers.map(offer => (
             <div key={offer.id} className="bg-white rounded-[24px] p-4 shadow-soft border border-slate-50 flex gap-4 group">
                <div className="w-20 h-20 rounded-2xl bg-slate-100 relative overflow-hidden shrink-0">
                   {offer.imageUrl ? (
                     <img src={offer.imageUrl} className="w-full h-full object-cover" alt="" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-slate-300">
                        {offer.type === 'product' ? <Package /> : <Wrench />}
                     </div>
                   )}
                </div>

                <div className="flex-1 py-1">
                   <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-slate-800 leading-tight">{offer.title}</h3>
                      <button className="text-slate-300 hover:text-slate-600">
                        <MoreVertical size={16} />
                      </button>
                   </div>
                   <p className="text-xs text-slate-400 mb-2 line-clamp-1">{offer.description}</p>
                   <span className="font-black text-violet-600">R$ {offer.price.toFixed(2)}</span>
                </div>

                <div className="flex flex-col justify-between items-end border-l border-slate-50 pl-4">
                   <button 
                     onClick={() => toggleAvailability(offer.id)}
                     className={`p-2 rounded-xl transition-colors ${offer.isAvailableForOrder !== false ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}
                     title="Disponibilidade"
                   >
                     {offer.isAvailableForOrder !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                   </button>
                   <button 
                     onClick={() => navigate(`/provider/offer/edit/${offer.id}`)}
                     className="p-2 rounded-xl bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors"
                   >
                     <Edit2 size={16} />
                   </button>
                </div>
             </div>
           ))
         )}
      </div>

      <div className="fixed bottom-32 right-6 z-40">
        <button 
          onClick={() => navigate('/provider/offer/new')}
          className="w-14 h-14 bg-slate-900 rounded-full shadow-xl shadow-slate-900/40 text-white flex items-center justify-center active:scale-90 transition-transform"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};
