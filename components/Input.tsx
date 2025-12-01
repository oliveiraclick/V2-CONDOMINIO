

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  icon, 
  isPassword = false, 
  className = '', 
  error,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : props.type || 'text';

  return (
    <div className="w-full mb-6">
      {label && <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">{label}</label>}
      <div className="relative group">
        <input
          type={inputType}
          className={`w-full h-14 px-5 rounded-[20px] bg-white/50 backdrop-blur-sm border-2 border-slate-100 focus:bg-white focus:border-violet-400 focus:ring-4 focus:ring-violet-100 focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 font-bold ${error ? 'border-red-400 bg-red-50' : ''} ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-600 focus:outline-none transition-colors"
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
        )}
        {!isPassword && icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-violet-500 transition-colors">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-2 ml-1 font-bold">{error}</p>}
    </div>
  );
};