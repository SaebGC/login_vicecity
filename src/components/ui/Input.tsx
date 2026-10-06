import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Texto del label que aparece arriba del input */
  label: string;
  /** Mensaje de error a mostrar (si existe) */
  error?: string;
}

/**
 * Componente Input reutilizable.
 * Maneja sus propios estilos de error y accesibilidad básica.
 */
export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-text-main font-body block">
        {label}
      </label>
      <div className="relative">
        <input
          className={`w-full bg-[#f8f9f4] border ${
            error 
              ? "border-red-500 focus:border-red-500" 
              : "border-black/10 focus:border-club-primary"
          } rounded-lg px-4 py-3 text-text-main font-body outline-none transition-colors placeholder:text-text-muted/60 ${className}`}
          {...props}
        />
      </div>
      {/* Mensaje de error (solo se renderiza si hay error) */}
      {error && <p className="text-red-500 text-xs mt-1 font-body">{error}</p>}
    </div>
  );
}
