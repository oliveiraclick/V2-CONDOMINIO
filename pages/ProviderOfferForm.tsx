

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Wrench, Check, Image as ImageIcon } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const ProviderOfferForm: React.FC = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<'product' | 'service'>('product');
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save would go here
    navigate('/dashboard', { state: { role: 'provider' } });
  };

  const handleBack = () => {
    navigate('/dashboard', { state: { role: 'provider' } });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center gap-3">
        <button 
          onClick={handleBack} 
          className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-black text-slate-900">Nova Oferta</h1>
      </div>

      <div className="p-6 max-w-lg mx-auto animate-slide-up">
        
        {/* Type Selection */}
        <div className="mb-8">
           <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">O que você vai oferecer?</label>
           <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setType('product')}
                className={`p-6 rounded-[28px] border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden group ${type === 'product' ? 'border-violet-500 bg-violet-50' : 'border-transparent bg-white shadow-soft'}`}
              >
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${type === 'product' ? 'bg-violet-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                    <Package size={24} />
                 </div>
                 <span className={`font-bold ${type === 'product' ? 'text-violet-700' : 'text-slate-500'}`}>Produto</span>
                 {type === 'product' && <div className="absolute top-4 right-4 text-violet-600"><Check size={20} /></div>}
              </button>

              <button 
                onClick={() => setType('service')}
                className={`p-6 rounded-[28px] border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden group ${type === 'service' ? 'border-fuchsia-500 bg-fuchsia-50' : 'border-transparent bg-white shadow-soft'}`}
              >
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${type === 'service' ? 'bg-fuchsia-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                    <Wrench size={24} />
                 </div>
                 <span className={`font-bold ${type === 'service' ? 'text-fuchsia-700' : 'text-slate-500'}`}>Serviço</span>
                 {type === 'service' && <div className="absolute top-4 right-4 text-fuchsia-600"><Check size={20} /></div>}
              </button>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
           {/* Image Upload */}
           <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Foto de Capa</label>
              <div className="w-full aspect-video rounded-[32px] bg-white border-2 border-dashed border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all cursor-pointer flex flex-col items-center justify-center group">
                 <div className="w-16 h-16 rounded-full bg-slate-50 group-hover:bg-white flex items-center justify-center text-slate-400 group-hover:text-violet-600 transition-colors mb-3 shadow-sm">
                    <ImageIcon size={28} />
                 </div>
                 <p className="text-sm font-bold text-slate-400 group-hover:text-violet-600">Toque para adicionar foto</p>
              </div>
           </div>

           <div className="space-y-4">
              <Input 
                label="Nome da Oferta"
                placeholder={type === 'product' ? "Ex: Bolo de Chocolate" : "Ex: Manicure Completa"}
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />

              <div className="grid grid-cols-2 gap-4">
                 <Input 
                   label="Preço (R$)"
                   type="number"
                   placeholder="0,00"
                   value={formData.price}
                   onChange={e => setFormData({...formData, price: e.target.value})}
                 />
                 {type === 'service' && (
                    <div className="flex items-center h-14 mt-6 px-4">
                       <span className="text-xs font-bold text-slate-400">Valor pode variar conforme análise.</span>
                    </div>
                 )}
                 {type === 'product' && (
                    <div className="flex items-center h-14 mt-6">
                       <label className="flex items-center gap-3 cursor-pointer select-none">
                          <div className="relative">
                             <input type="checkbox" className="sr-only peer" defaultChecked />
                             <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                          </div>
                          <span className="text-sm font-bold text-slate-600">Aceitar Pedidos</span>
                       </label>
                    </div>
                 )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Descrição</label>
                <textarea 
                  rows={4}
                  placeholder="Descreva os detalhes, ingredientes ou como funciona o serviço..."
                  className="w-full p-5 rounded-[24px] bg-white border-2 border-slate-100 focus:border-violet-400 focus:outline-none transition-all text-slate-800 font-medium resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
           </div>

           <div className="pt-4">
              <Button type="submit" fullWidth>
                 Criar Oferta
              </Button>
           </div>
        </form>
      </div>
    </div>
  );
};