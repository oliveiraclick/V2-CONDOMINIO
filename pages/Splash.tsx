
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirects to login after 2 seconds for faster testing flow
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-slate-900 p-8 relative overflow-hidden">
      
      {/* Animated Gradients */}
      <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-violet-600 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-fuchsia-600 rounded-full blur-[100px] opacity-30 animate-pulse delay-1000"></div>

      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full animate-fade-in">
        {/* Logo Mark */}
        <div className="w-24 h-24 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-[32px] shadow-[0_0_50px_rgba(139,92,246,0.6)] flex items-center justify-center mb-8 rotate-6 hover:rotate-0 transition-transform duration-500">
          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <h1 className="text-6xl font-black text-white tracking-tighter mb-2 drop-shadow-lg">
          LIVIN
        </h1>
        <p className="text-violet-200 font-bold tracking-[0.2em] text-xs uppercase">Comunidade do Futuro</p>
        <div className="mt-4 px-3 py-1 bg-white/10 rounded-full text-[9px] font-bold text-slate-400">v3.0 Final</div>
      </div>
      
      <div className="w-full z-10 pb-10">
         <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 w-1/3 animate-[slideUp_2s_ease-in-out_infinite]"></div>
         </div>
         <p className="text-center text-white/40 text-[10px] font-bold mt-4 uppercase tracking-widest">Iniciando Experiência...</p>
      </div>
    </div>
  );
};
