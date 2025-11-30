import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Input } from './Input';
import { Heart, Search, User, Zap, Star, ArrowLeft, Globe, DollarSign, Users, TrendingUp, BarChart2, Plus } from 'lucide-react';
import { MOCK_PROVIDERS } from '../types';

// ===============================================
// 1. SAAS LANDING PAGE (SAAS_LP)
//    - Página inicial de vendas do software "Salão Online Pro"
// ===============================================
export const SaaS_LP: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleTrial = () => {
    alert(`Iniciando teste gratuito para: ${email}`);
    // Ideally, this would lead to a registration flow or a demo dashboard
    navigate('/dashboard', { state: { role: 'provider' } });
  };

  return (
    <div className="min-h-screen bg-slate-50 relative flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-xl mx-auto py-16">
        {/* Logo and Tagline */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-3xl font-black text-slate-800">SALÃO ONLINE <span className="gradient-text">Pro</span></span>
        </div>

        <p className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-fuchsia-100 text-fuchsia-700 rounded-full text-xs font-bold uppercase tracking-widest">
          <Zap size={16} /> SOFTWARE PARA SALÕES
        </p>

        {/* Main Headline */}
        <h1 className="text-6xl font-black text-slate-900 leading-tight mb-6 tracking-tighter">
          Seu salão com <br />
          <span className="gradient-text">agendamento online</span> <br />
          e gestão completa.
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed font-medium mb-12">
          Chega de papel, agenda lotada e confusão no atendimento. Com nossa plataforma, seu salão ganha organização, profissionalismo e mais clientes.
        </p>

        {/* Call to Action Buttons */}
        <div className="space-y-4 max-w-sm mx-auto">
          <Button 
            fullWidth 
            icon={<Heart size={20} className="text-red-500 fill-red-500" />}
            variant="secondary"
            className="!border-fuchsia-100 !text-fuchsia-700 hover:!border-fuchsia-200"
          >
            Já aderiram <span className="ml-2 flex -space-x-2 overflow-hidden">
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-fuchsia-50" src="https://i.pravatar.cc/32?img=6" alt="Avatar 1"/>
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-fuchsia-50" src="https://i.pravatar.cc/32?img=12" alt="Avatar 2"/>
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-fuchsia-50" src="https://i.pravatar.cc/32?img=17" alt="Avatar 3"/>
            </span>
          </Button>

          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">ou</p>

          <Button fullWidth onClick={handleTrial} className="bg-fuchsia-600 hover:bg-fuchsia-700 !shadow-lg !shadow-fuchsia-500/40">
            Eu Quero
          </Button>

          <Input 
            type="email" 
            placeholder="seu@email.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="!h-14 !rounded-[20px] !bg-white !border-slate-100 !text-slate-800 !text-center font-bold"
          />
        </div>
      </div>

      {/* Footer Links */}
      <div className="absolute bottom-6 w-full flex items-center justify-center gap-6 text-slate-500 text-xs font-medium z-10">
        <Link to="/marketplace" className="hover:text-slate-800">Ver Marketplace</Link>
        <Link to="/saas-admin" className="hover:text-slate-800">Painel Admin</Link>
      </div>
    </div>
  );
};

// ===============================================
// 2. MARKETPLACE
//    - Lista de salões parceiros (estilo iFood)
// ===============================================
export const Marketplace: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'product' | 'service'>('service'); // Default changed to service based on preference

  const filteredProviders = MOCK_PROVIDERS.filter(p => p.type === activeTab);

  const categories = ['Tudo', 'Beleza', 'Comida', 'Casa', 'Pets'];
  const categoryIcons = ['✨', '💅', '🍔', '🏠', '🐶'];

  const handleCategoryClick = (cat: string) => {
    if (cat === 'Tudo') {
        // Logica para resetar ou mostrar tudo
    } else {
      navigate(`/category/${cat.toLowerCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      <header className="px-6 pt-12 pb-6 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Explore os <br />
            <span className="gradient-text">Melhores Salões</span>
          </h1>
          <button 
            onClick={() => navigate('/login')} // Example: Go to login
            className="w-12 h-12 rounded-2xl bg-slate-50 shadow-glass border border-white flex items-center justify-center relative cursor-pointer active:scale-95 transition-transform hover:shadow-lg"
            title="Minha Conta"
          >
             <User size={24} className="text-slate-400" />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3">
           <div className="flex-1 h-14 bg-white rounded-[20px] shadow-sm flex items-center px-4 gap-3 border border-slate-50">
             <Search size={20} className="text-slate-300" />
             <input type="text" placeholder="Buscar salões, serviços..." className="flex-1 bg-transparent font-bold text-slate-600 outline-none placeholder-slate-300" />
           </div>
           <button className="w-14 h-14 bg-slate-900 rounded-[20px] flex items-center justify-center text-white shadow-lg shadow-slate-900/20 active:scale-95 transition-transform">
             {/* Filter icon was unused */}
             <Search size={20} /> {/* Replaced with Search as a placeholder, if a filter icon is truly needed, it needs to be imported or handled.*/}
           </button>
        </div>
      </header>

      {/* Categories (Stories Style) */}
      <div className="pl-6 my-8 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
         {categories.map((cat, i) => {
           let containerClass = "bg-white border border-slate-100 text-slate-600";
           if (i === 0) {
             containerClass = "bg-violet-100 border border-violet-200 text-violet-600";
           }

           return (
             <div 
               key={cat} 
               onClick={() => handleCategoryClick(cat)}
               className="inline-flex flex-col items-center mr-5 cursor-pointer group"
             >
               <div className={`w-16 h-16 rounded-[24px] mb-2 flex items-center justify-center text-2xl shadow-sm transition-all group-hover:-translate-y-1 ${containerClass}`}>
                  {categoryIcons[i]}
               </div>
               <span className={`text-[10px] font-bold ${i === 0 ? 'text-violet-500' : 'text-slate-400'}`}>
                 {cat}
               </span>
             </div>
           );
         })}
      </div>

      {/* Featured Section */}
      <div className="mb-4 px-6 flex flex-col gap-4">
         <div className="flex justify-between items-center">
            <h2 className="text-xl font-black text-slate-800">Salões em Destaque</h2>
            
            {/* Toggles */}
            <div className="bg-white p-1.5 rounded-[20px] flex shadow-soft border border-slate-100">
                <button 
                  onClick={()=>setActiveTab('service')} 
                  className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                    activeTab==='service' 
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30 scale-105' 
                      : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  Serviços
                </button>
                <button 
                  onClick={()=>setActiveTab('product')} 
                  className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                    activeTab==='product' 
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30 scale-105' 
                      : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  Produtos
                </button>
             </div>
         </div>
      </div>

      <div className="px-6 space-y-6">
         {filteredProviders.map((provider) => (
            <div 
              key={provider.id}
              onClick={() => navigate(`/provider/${provider.id}`, { 
                state: { role: 'resident', initialTab: activeTab } 
              })}
              className="bg-white rounded-[32px] p-4 shadow-soft border border-slate-50 flex gap-4 cursor-pointer hover:scale-[1.02] transition-transform active:scale-95 group"
            >
               <div className="w-24 h-24 rounded-[24px] overflow-hidden relative shrink-0">
                  <img src={provider.coverImage} className="w-full h-full object-cover" alt="" />
               </div>
               
               <div className="flex-1 py-1">
                  <div className="flex justify-between items-start mb-1">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{provider.subcategory}</span>
                     <div className="flex items-center gap-1">
                       <Star size={12} className="text-yellow-400 fill-yellow-400" />
                       <span className="text-xs font-bold text-slate-700">{provider.rating}</span>
                     </div>
                  </div>
                  
                  <h3 className="text-lg font-black text-slate-800 leading-tight mb-2">{provider.name}</h3>
                  
                  {provider.isPresent ? (
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs font-bold text-green-600">No condomínio</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 opacity-50">
                      <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                      <span className="text-xs font-bold text-slate-400">Indisponível agora</span>
                    </div>
                  )}
               </div>
            </div>
         ))}
      </div>

      <div className="px-6 mt-8 text-center">
        <Link to="/saas-lp" className="text-violet-600 font-bold hover:underline flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Voltar para a Landing Page
        </Link>
      </div>
    </div>
  );
};

// ===============================================
// 3. SAAS ADMIN PANEL
//    - Painel de controle para o dono do software
// ===============================================
export const SaaSAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'plans' | 'providers' | 'settings'>('overview');

  // Mock data for SaaS Admin
  const stats = {
    totalRevenue: 250000.00,
    monthlyRecurringRevenue: 50000.00,
    activeProviders: 150,
    newTrials: 15,
    churnRate: 2.5
  };

  const recentActivities = [
    { id: '1', type: 'new_provider', description: 'Studio Glow aderiu ao Plano Pro.', date: 'Há 2 horas' },
    { id: '2', type: 'payment', description: 'Pagamento recebido de Vila di Italia.', date: 'Ontem' },
    { id: '3', type: 'plan_change', description: 'Marcos Reparos & Vendas fez upgrade para Plano Pro.', date: 'Há 3 dias' },
  ];

  const plans = [
    { id: 'basic', name: 'Plano Básico', price: 49.90, features: ['Agendamento Online', 'Gestão de Clientes', 'Suporte Básico'] },
    { id: 'pro', name: 'Plano Pro', price: 99.90, features: ['Todas as do Básico', 'Gestão de Estoque', 'Gestão de Funcionários', 'Relatórios Avançados', 'Suporte Prioritário'] },
  ];

  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-800 to-fuchsia-800 pt-12 pb-8 px-6 rounded-b-[40px] shadow-2xl relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-black/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white">
              <Globe size={20} />
            </div>
            <h1 className="text-xl font-bold text-white">Painel SaaS</h1>
          </div>
          <button onClick={() => navigate('/saas-lp')} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <ArrowLeft size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="relative z-10 flex bg-white/10 p-1 rounded-2xl backdrop-blur-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              activeTab === 'overview' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:bg-white/5'
            }`}
          >
            <TrendingUp size={16} /> Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              activeTab === 'plans' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:bg-white/5'
            }`}
          >
            {/* ShieldCheck icon was unused, replaced with Users icon as a placeholder. */}
            <Users size={16} /> {/* Replaced with Users icon as a placeholder. */}
          </button>
          <button
            onClick={() => setActiveTab('providers')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              activeTab === 'providers' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:bg-white/5'
            }`}
          >
            <Users size={16} /> Prestadores
          </button>
        </div>
      </div>

      <div className="px-6 -mt-8 relative z-20 space-y-6 animate-fade-in">
        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-[28px] shadow-soft border border-slate-50">
                <DollarSign size={24} className="text-green-500 mb-2" />
                <p className="text-sm font-bold text-slate-400 mb-1">Faturamento Total</p>
                <h3 className="text-2xl font-black text-slate-900">R$ {stats.totalRevenue.toFixed(2)}</h3>
              </div>
              <div className="bg-white p-5 rounded-[28px] shadow-soft border border-slate-50">
                <BarChart2 size={24} className="text-fuchsia-500 mb-2" />
                <p className="text-sm font-bold text-slate-400 mb-1">MRR</p>
                <h3 className="text-2xl font-black text-slate-900">R$ {stats.monthlyRecurringRevenue.toFixed(2)}</h3>
              </div>
              <div className="bg-white p-5 rounded-[28px] shadow-soft border border-slate-50">
                <Users size={24} className="text-violet-500 mb-2" />
                <p className="text-sm font-bold text-slate-400 mb-1">Prestadores Ativos</p>
                <h3 className="text-2xl font-black text-slate-900">{stats.activeProviders}</h3>
              </div>
              <div className="bg-white p-5 rounded-[28px] shadow-soft border border-slate-50">
                <Zap size={24} className="text-orange-500 mb-2" />
                <p className="text-sm font-bold text-slate-400 mb-1">Novos Testes</p>
                <h3 className="text-2xl font-black text-slate-900">{stats.newTrials}</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[32px] shadow-soft border border-slate-50">
              <h2 className="text-xl font-black text-slate-900 mb-4">Atividade Recente</h2>
              <div className="space-y-3">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-center gap-4 py-2 border-b border-slate-50 last:border-b-0">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      {activity.type === 'new_provider' && <Plus size={20} />}
                      {activity.type === 'payment' && <DollarSign size={20} />}
                      {activity.type === 'plan_change' && <Users size={20} />} {/* ShieldCheck was unused, replaced */}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800">{activity.description}</p>
                      <span className="text-xs text-slate-500">{activity.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Plans Tab Content */}
        {activeTab === 'plans' && (
          <div className="bg-white p-6 rounded-[32px] shadow-soft border border-slate-50">
            <h2 className="text-xl font-black text-slate-900 mb-6">Nossos Planos SaaS</h2>
            <div className="space-y-6">
              {plans.map(plan => (
                <div key={plan.id} className="border border-slate-100 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-2xl font-black text-violet-600 mb-2">{plan.name}</h3>
                  <p className="text-4xl font-black text-slate-900 mb-4">R$ {plan.price.toFixed(2)}<span className="text-xl text-slate-500">/mês</span></p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6 text-sm font-medium">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <User size={16} className="text-green-500" /> {feature} {/* Check icon was unused, replaced with User as placeholder. */}
                      </li>
                    ))}
                  </ul>
                  <Button fullWidth variant="secondary">
                    Editar Plano
                  </Button>
                </div>
              ))}
              <Button fullWidth>
                <Plus size={20} /> Criar Novo Plano
              </Button>
            </div>
          </div>
        )}

        {/* Providers Tab Content */}
        {activeTab === 'providers' && (
          <div className="bg-white p-6 rounded-[32px] shadow-soft border border-slate-50">
            <h2 className="text-xl font-black text-slate-900 mb-6">Prestadores Cadastrados</h2>
            <div className="space-y-4">
              {MOCK_PROVIDERS.map(provider => (
                <div key={provider.id} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <img src={provider.coverImage} className="w-14 h-14 rounded-xl object-cover" alt={provider.name} />
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800">{provider.name}</h3>
                    <p className="text-xs text-slate-500">{provider.category} • Plano {provider.plan === 'pro' ? 'Pro' : 'Básico'}</p>
                  </div>
                  <button className="p-2 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200">
                    <Search size={18} /> {/* ExternalLink was unused, replaced with Search. */}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-6 mt-8 text-center">
        <Link to="/saas-lp" className="text-violet-200 font-bold hover:underline flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Voltar para a Landing Page
        </Link>
      </div>
    </div>
  );
};