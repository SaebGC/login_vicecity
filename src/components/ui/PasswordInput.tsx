"use client";

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Texto del label que aparece arriba del input */
  label: string;
  /** Mensaje de error a mostrar (si existe) */
  error?: string;
  /** Opción para mostrar el enlace de recuperar contraseña */
  showForgotPassword?: boolean;
}

/**
 * Componente Input específico para contraseñas.
 * Incluye la lógica interna para mostrar/ocultar la contraseña
 * y opcionalmente un enlace para recuperar la contraseña.
 */
export function PasswordInput({ label, error, showForgotPassword, className = "", ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text-main font-body block">
          {label}
        </label>
        
        {/* Enlace condicional para recuperar contraseña */}
        {showForgotPassword && (
          <Link 
            href="/forgot-password" 
            className="text-xs text-club-primary hover:text-text-main transition-colors font-body underline-offset-2 hover:underline"
          >
            Forgot Password?
          </Link>
        )}
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className={`w-full bg-[#f8f9f4] border ${
            error 
              ? "border-red-500 focus:border-red-500" 
              : "border-black/10 focus:border-club-primary"
          } rounded-lg px-4 py-3 text-text-main font-body outline-none transition-colors placeholder:text-text-muted/60 pr-10 ${className}`}
          {...props}
        />
        
        {/* Botón toggle para mostrar/ocultar texto */}
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1} // Evitamos que haga foco al navegar con teclado
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Mensaje de error (solo se renderiza si hay error) */}
      {error && <p className="text-red-500 text-xs mt-1 font-body">{error}</p>}
    </div>
  );
}
