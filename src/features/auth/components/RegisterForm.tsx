"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";

export default function RegisterForm() {
  // --- Estados del Formulario ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // --- Estado de validación y UI ---
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string; 
    password?: string; 
    confirmPassword?: string;
    submit?: string 
  }>({});
  const [status, setStatus] = useState<"initial" | "loading" | "success" | "error">("initial");

  /**
   * Valida el formato del correo mediante Expresión Regular
   */
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  /**
   * Ejecuta validaciones del cliente antes de enviar al backend.
   */
  const handleValidation = () => {
    const newErrors: typeof errors = {};
    let isValid = true;

    // Validación de Nombre Completo
    if (!name.trim()) {
      newErrors.name = "Full name is required";
      isValid = false;
    }

    // Validación de Correo
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validación de Contraseña (mínimo 6 caracteres)
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Validación de Confirmación (deben coincidir)
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Manejador del evento Submit. Simula petición asíncrona.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("initial");
    
    if (!handleValidation()) return;

    setStatus("loading");
    setErrors({});

    // Mock API call
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulamos error aleatorio
          if (Math.random() > 0.7) {
            reject(new Error("Email is already registered. Please login instead."));
          } else {
            resolve(true);
          }
        }, 1500);
      });

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrors({ submit: err.message || "An error occurred during registration" });
    }
  };

  // --- Vista Exitoso (Success State) ---
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center rounded-2xl bg-club-surface border border-club-primary/20 shadow-[0_4px_20px_var(--shadow-color)]">
        <div className="w-16 h-16 bg-club-primary/20 rounded-full flex items-center justify-center text-club-primary mb-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-heading text-text-main">Registration Successful!</h2>
        <p className="text-text-muted font-body">Welcome to the Vice City Iguana Club family.</p>
        <Link 
          href="/login"
          className="mt-4 px-6 py-2 bg-club-surface border border-club-primary text-text-main rounded-lg font-body hover:bg-club-primary/10 transition-colors"
        >
          Proceed to Login
        </Link>
      </div>
    );
  }

  // --- Vista Principal (Formulario de Registro) ---
  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-club-surface border border-black/5 shadow-[0_8px_30px_var(--shadow-color)]">
      
      {/* Cabecera */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-heading text-text-main mb-2 tracking-wide uppercase font-bold">
          Join The Club
        </h1>
        <p className="text-text-muted font-body">Create your premium account today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        
        {/* Mensaje de error general de la API */}
        {errors.submit && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center font-body">
            {errors.submit}
          </div>
        )}

        {/* Campo: Nombre Completo */}
        <Input
          label="Full Name"
          type="text"
          placeholder="Lucia Caminos"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          error={errors.name}
          disabled={status === "loading"}
        />

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
        />

        {/* Campo: Confirmar Contraseña */}
        <PasswordInput
          label="Confirm Password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }}
          error={errors.confirmPassword}
          disabled={status === "loading"}
        />

        {/* Botón de Enviar */}
        <Button
          type="submit"
          isLoading={status === "loading"}
          loadingText="REGISTERING..."
          disabled={!name && !email && !password && !confirmPassword}
        >
          Register
        </Button>

        {/* Enlace de Login */}
        <div className="text-center pt-4 border-t border-black/5 mt-4">
          <p className="text-sm text-text-muted font-body">
            Already have an account?{" "}
            <Link href="/login" className="text-club-primary font-bold hover:text-text-main transition-colors hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
