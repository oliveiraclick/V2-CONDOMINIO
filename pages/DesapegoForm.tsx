

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { maskPhone } from '../utils';

export const DesapegoForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Se tiver ID, é edição
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    phone: '',
    description: '',
    images: [] as string[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let finalVal = value;
    if (name === 'phone') finalVal = maskPhone(value);
    
    setFormData(prev => ({ ...prev, [name]: finalVal }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui iria a lógica de salvar no backend
    alert("Anúncio salvo com sucesso!");
    navigate('/desapego');
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center gap-3">
        <button 
          onClick={() => navigate('/desapego')} 
          className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-black text-slate-900">{isEditing ? 'Editar Anúncio' : 'Novo Desapego'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto space-y-6 animate-slide-up">
        
        {/* Image Upload Area */}
        <div>
           <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Fotos (Até 4)</label>
           <div className="grid grid-cols-2 gap-3">
              {/* Mock Upload Button */}
              <button type="button" className="aspect-square rounded-[24px] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:bg-violet-50 hover:border-violet-300 hover:text-violet-600 transition-all">
                 <Upload size={24} className="mb-2" />
                 <span className="text-[10px] font-bold uppercase">Adicionar</span>
              </button>
              
              {/* Mock Preview (Static for visual) */}
              <div className="aspect-square rounded-[24px] bg-slate-100 relative overflow-hidden group">
                 <img src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=400" className="w-full h-full object-cover opacity-80" alt="" />
                 <button type="button" className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={16} />
                 </button>
              </div>
           </div>
        </div>

        <div className="space-y-2">
          <Input 
             label="O que você está vendendo?" 
             name="title" 
             placeholder="Ex: Bicicleta, Sofá..." 
             value={formData.title} 
             onChange={handleChange} 
             required 
          />
          
          <div className="grid grid-cols-2 gap-4">
             <Input 
               label="Valor (R$)" 
               name="price" 
               type="number" 
               placeholder="0,00" 
               value={formData.price} 
               onChange={handleChange} 
               required 
             />
             <Input 
               label="WhatsApp Contato" 
               name="phone" 
               placeholder="(00) 00000-0000" 
               value={formData.phone} 
               onChange={handleChange} 
               required 
             />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Descrição</label>
            <textarea 
              name="description"
              rows={4}
              placeholder="Conte detalhes sobre o estado do produto, tempo de uso, motivo da venda..."
              className="w-full p-5 rounded-[20px] bg-slate-50 border-2 border-transparent focus:bg-white focus:border-violet-400 focus:outline-none transition-all text-slate-800 font-medium resize-none"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        <div className="pt-6">
           <Button fullWidth type="submit">
              {isEditing ? 'Salvar Alterações' : 'Publicar Anúncio'}
           </Button>
           <p className="text-center text-xs text-slate-400 mt-4 font-medium px-4">
             Seu nome e endereço (Bloco/Apto) aparecerão automaticamente no anúncio.
           </p>
        </div>

      </form>
    </div>
  );
};