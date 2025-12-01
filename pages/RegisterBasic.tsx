

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegistration } from '../context/RegistrationContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { maskPhone, maskDate } from '../utils';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export const RegisterBasic: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateBasicInfo } = useRegistration();

  if (!data.role) {
    // Fix: Ensure the useEffect callback does not return an awaitable value.
    // The `navigate` function is synchronous, but explicitly using `void`
    // can prevent potential linter misinterpretations.
    React.useEffect(() => {
      void navigate('/register/type');
    }, [navigate]);
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'phone') formattedValue = maskPhone(value);
    if (name === 'birthDate') formattedValue = maskDate(value);
    updateBasicInfo({ [name]: formattedValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.role === 'resident') {
      navigate('/login');
    } else {
      navigate('/register/provider-complete');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-[#f8fafc] max-w-lg mx-auto">
      <div className="flex items-center mb-8 pt-4">
        <Link to="/register/type" className="p-3 -ml-3 rounded-full hover:bg-slate-100 text-slate-900 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div className="ml-2">
          <h1 className="text-2xl font-black text-slate-900">Informações Básicas</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <Input label="Nome Completo" name="name" placeholder="Seu Nome" value={data.basicInfo.name} onChange={handleChange} required />

        <div className="grid grid-cols-2 gap-4">
          <Input label="Telefone" name="phone" placeholder="(00) 00000-0000" value={data.basicInfo.phone} onChange={handleChange} maxLength={15} required />
          <Input label="Nascimento" name="birthDate" placeholder="DD/MM/AAAA" value={data.basicInfo.birthDate} onChange={handleChange} maxLength={10} required />
        </div>

        {data.role === 'resident' && (
          <>
            <Input label="Nome do Condomínio" name="condoName" placeholder="Residencial..." value={data.basicInfo.condoName || ''} onChange={handleChange} required />
             <Input label="Endereço" name="address" placeholder="Bloco B, Apt 402" value={data.basicInfo.address || ''} onChange={handleChange} required />
          </>
        )}

        <Input label="E-mail" name="email" type="email" placeholder="seu@email.com" value={data.basicInfo.email} onChange={handleChange} required />
        <Input label="Senha" name="password" isPassword placeholder="•••••••" value={data.basicInfo.password} onChange={handleChange} required />
        
        <div className="pt-6">
          <Button type="submit" fullWidth>
            {data.role === 'resident' ? 'Finalizar' : 'Continuar'} 
            {data.role !== 'resident' && <ChevronRight size={20} />}
          </Button>
        </div>
      </form>
    </div>
  );
};