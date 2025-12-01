import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { User, Zap, ArrowRight, Fingerprint } from 'lucide-react';
import { supabase } from '../supabaseClient'; // Import supabase client

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      // Fetch logo URL from Supabase
      const { data } = await supabase
        .from('app_settings')
        .select('logo_url')
        .eq('id', 1)
        .single();
      
      if (data?.logo_url) {
        setLogoUrl(data.logo_url);
      }
    };
    void fetchLogo();
  }, []);

  const loginAsTest = (role: 'resident' | 'provider') => {
    navigate('/dashboard', { state: { role } });
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden flex flex-col justify-end">
      
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-violet-900/60 to-transparent"></div>
         <div className="absolute top-1/4 right-[-50px] w-96 h-96 bg-fuchsia-600 rounded-full blur-[140px] opacity-40 animate-pulse"></div>
         <div className="absolute top-1/4 left-[-50px] w-96 h-96 bg-violet-600 rounded-full blur-[140px] opacity-40 animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 p-8 text-center mb-6">
         {logoUrl ? (
           <img src={logoUrl} alt="App Logo" className="max-h-20 mx-auto mb-4" />
         ) : (
           <h1 className="text-5xl font-black text-white mb-2 tracking-tighter">Olá, Vizinho.</h1>
         )}
         <p className="text-violet-200 text-lg font-medium">Bem-vindo ao seu lar digital.</p>
      </div>

      <div className="relative z-20 bg-white rounded-t-[48px] p-8 pb-12 animate-slide-up shadow-[0_-20px_60px_rgba(0,0,0,0.5)]">
        <div className="w-16 h-1.5 bg-slate-100 rounded-full mx-auto mb-10"></div>
        
        <form onSubmit={(e) => { e.preventDefault(); loginAsTest('resident'); }} className="space-y-4">
          <Input 
            type="email" 
            placeholder="nome@exemplo.com" 
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            isPassword 
            placeholder="••••••••" 
            label="Senha"
          />
          <div className="flex justify-between items-center py-2">
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-violet-600">Esqueceu a senha?</a>
            <div className="flex gap-4">
               <button type="button" className="w-14 h-14 rounded-[20px] bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100">
                  <Fingerprint size={24} />
               </button>
               <Button type="submit" className="w-20 h-14 !px-0 rounded-[20px]" icon={<ArrowRight size={24} />}></Button>
            </div>
          </div>
        </form>

        <div className="mt-10">
           <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-4">Acesso Rápido (Teste)</p>
           <div className="grid grid-cols-2 gap-4">
              <button onClick={() => loginAsTest('resident')} className="bg-slate-50 p-4 rounded-[24px] flex flex-col items-center gap-3 hover:bg-violet-50 group">
                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-violet-600"><User size={20} /></div>
                 <span className="text-sm font-bold text-slate-600">Sou Morador</span>
              </button>
              <button onClick={() => loginAsTest('provider')} className="bg-slate-50 p-4 rounded-[24px] flex flex-col items-center gap-3 hover:bg-fuchsia-50 group">
                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-fuchsia-600"><Zap size={20} /></div>
                 <span className="text-sm font-bold text-slate-600">Sou Prestador</span>
              </button>
           </div>
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/register/type" className="text-sm font-black text-slate-800 border-b-2 border-fuchsia-400 pb-0.5 hover:text-fuchsia-600">
            Criar uma nova conta
          </Link>
        </div>
      </div>
    </div>
  );
};
