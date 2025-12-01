

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon,
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = "h-14 px-6 rounded-[20px] font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed select-none relative overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-glow hover:shadow-lg hover:shadow-violet-500/40",
    secondary: "bg-white text-violet-700 border-2 border-violet-100 hover:border-violet-200",
    glass: "bg-white/30 backdrop-blur-md border border-white/40 text-white hover:bg-white/40",
    ghost: "bg-transparent text-slate-500 hover:text-violet-600 hover:bg-violet-50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {/* Shine effect for primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
      )}
      
      {icon && <span className="text-xl relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
};