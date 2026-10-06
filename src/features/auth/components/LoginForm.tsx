"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";

export default function LoginForm() {
  // --- Estados del Formulario ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // --- Estado de validación y UI ---
  const [errors, setErrors] = useState<{ email?: string; password?: string; submit?: string }>({});
  const [status, setStatus] = useState<"initial" | "loading" | "success" | "error">("initial");

  /**
   * Valida el formato del correo mediante Expresión Regular
   */
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  /**
   * Valida todos los campos antes de enviar al backend.
   * Retorna 'true' si no hay errores.
   */
  const handleValidation = () => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    // Validación de correo
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validación de contraseña
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Manejador del evento Submit. Simula una petición asíncrona al servidor.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("initial");
    
    if (!handleValidation()) return;

    setStatus("loading");
    setErrors({});

    // Mock API call (Simulación de Backend)
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulamos un error aleatorio del 30% para ver la UI de error
          if (Math.random() > 0.7) {
            reject(new Error("Invalid credentials or server error"));
          } else {
            resolve(true);
          }
        }, 1500);
      });

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrors({ submit: err.message || "An error occurred during login" });
    }
  };

  // --- Vista Exitoso (Success State) ---
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center rounded-2xl bg-club-surface border border-club-primary/20 shadow-[0_4px_20px_var(--shadow-color)]">
        <div className="w-16 h-16 bg-club-primary/20 rounded-full flex items-center justify-center text-club-primary mb-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-heading text-text-main">Login Successful!</h2>
        <p className="text-text-muted font-body">Welcome back to the Vice City Iguana Club.</p>
        <button 
          onClick={() => {
            setStatus("initial");
            setEmail("");
            setPassword("");
          }}
          className="mt-4 px-6 py-2 bg-club-surface border border-club-primary text-text-main rounded-lg font-body hover:bg-club-primary/10 transition-colors"
        >
          Login Again
        </button>
      </div>
    );
  }

  // --- Vista Principal (Formulario de Login) ---
  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-club-surface border border-black/5 shadow-[0_8px_30px_var(--shadow-color)]">
      
      {/* Cabecera */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-heading text-text-main mb-2 tracking-wide uppercase font-bold">
          Iguana Club
        </h1>
        <p className="text-text-muted font-body">Enter your credentials to access</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        
        {/* Mensaje de error general de la API */}
        {errors.submit && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center font-body">
            {errors.submit}
          </div>
        )}

        {/* Campo: Correo Electrónico */}
        <Input
          label="Email Address"
          type="email"
          placeholder="member@iguana.club"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          error={errors.email}
          disabled={status === "loading"}
        />

        {/* Campo: Contraseña */}
        <PasswordInput
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          error={errors.password}
          disabled={status === "loading"}
          showForgotPassword={true} // Habilita el link "Forgot Password?"
        />

        {/* Botón de Enviar */}
        <Button
          type="submit"
          isLoading={status === "loading"}
          loadingText="AUTHORIZING..."
          disabled={!email && !password}
        >
          Login / Iniciar Sesión
        </Button>

        {/* Enlace de Registro */}
        <div className="text-center pt-4 border-t border-black/5 mt-4">
          <p className="text-sm text-text-muted font-body">
            Don't have an account?{" "}
            <Link href="/register" className="text-club-primary font-bold hover:text-text-main transition-colors hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
