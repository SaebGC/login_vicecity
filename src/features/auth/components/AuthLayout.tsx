import React from "react";
import Image from "next/image";

interface AuthLayoutProps {
  /** Contenido dinámico a renderizar en la columna derecha (LoginForm o RegisterForm) */
  children: React.ReactNode;
  /** Título a mostrar sobre la imagen en la columna izquierda */
  title: React.ReactNode;
  /** Descripción a mostrar sobre la imagen en la columna izquierda */
  description: string;
}

/**
 * Layout reutilizable para las pantallas de autenticación (Login y Register).
 * Maneja automáticamente la estructura Split-Screen (Grid de 2 columnas)
 * y muestra la imagen premium de la marca en pantallas grandes.
 */
export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-club-bg">
      {/* Columna Izquierda (Imagen) - Oculta en móviles, ocupa 50% en pantallas 'lg' */}
      <div className="hidden lg:flex relative w-1/2 min-h-screen">
        <Image
          src="/Lucia_Caminos_gym.jpg"
          alt="Vice City Iguana Club Gym"
          fill
          className="object-cover"
          priority
        />
        {/* Filtros degradados superpuestos usando los colores de la marca para dar aspecto lujoso */}
        <div className="absolute inset-0 bg-gradient-to-t from-club-accent/90 via-club-primary/30 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-club-accent/60 to-transparent" />
        
        {/* Textos descriptivos sobre la imagen */}
        <div className="absolute bottom-16 left-16 right-16 z-10">
          <h1 className="text-white text-5xl font-heading mb-4 leading-tight tracking-wide drop-shadow-lg uppercase">
            {title}
          </h1>
          <p className="text-white/90 text-lg font-body max-w-md drop-shadow">
            {description}
          </p>
        </div>
      </div>

      {/* Columna Derecha (Contenedor del Formulario) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-24 bg-club-bg relative">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
