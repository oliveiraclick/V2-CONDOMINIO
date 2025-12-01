

import React from 'react';

interface SelectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected?: boolean;
  onClick: () => void;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({ title, description, icon, selected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative p-8 rounded-[32px] cursor-pointer transition-all duration-300 border-2 group ${selected ? 'border-violet-500 bg-violet-50' : 'border-transparent bg-white shadow-soft hover:shadow-xl hover:scale-[1.02]'}`}
    >
      <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center mb-6 transition-colors ${selected ? 'bg-violet-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-gradient-to-tr group-hover:from-violet-500 group-hover:to-fuchsia-500 group-hover:text-white'}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-black text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed font-bold">{description}</p>
      
      {/* Decorative gradient blob on hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-fuchsia-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
};