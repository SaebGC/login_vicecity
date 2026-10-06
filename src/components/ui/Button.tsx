import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Activa el estado visual de carga (bloquea el botón y muestra spinner) */
  isLoading?: boolean;
  /** Texto a mostrar mientras carga */
  loadingText?: string;
  children: React.ReactNode;
}

/**
 * Componente Botón Primario reutilizable.
 * Aplica estilos de marca, efectos hover/disabled y un estado de carga.
 */
export function Button({ isLoading, loadingText, children, className = "", ...props }: ButtonProps) {
  return (
    <button
      disabled={isLoading || props.disabled}
      className={`w-full relative flex items-center justify-center py-3 px-4 bg-club-primary hover:brightness-95 disabled:bg-club-primary/50 disabled:cursor-not-allowed text-club-accent rounded-lg font-heading tracking-wider transition-all duration-300 shadow-md hover:shadow-lg group overflow-hidden mt-6 ${className}`}
      {...props}
    >
      {/* Efecto de brillo/animación en hover */}
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
      
      {/* Contenido (Spinner o Texto normal) */}
      <span className="relative flex items-center gap-2 font-bold">
        {isLoading ? (
          <>
            <Loader2 className="animate-spin text-club-accent" size={20} />
            {loadingText || "PROCESANDO..."}
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
}
