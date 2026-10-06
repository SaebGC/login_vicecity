# Vice City Iguana Club - Frontend

Este repositorio contiene la implementación inicial del Frontend para el proyecto **Vice City Iguana Club**, enfocado en la experiencia de usuario y la arquitectura de los módulos de autenticación (Login y Registro).

## 🎯 Estado Actual

Se han desarrollado las interfaces de **Login** y **Registro** utilizando un diseño moderno de pantalla dividida (Split-Screen), cumpliendo estrictamente con la guía visual de la marca y la arquitectura definida. Todo el código está preparado para su futura integración con el Backend.

### ✨ Características Implementadas

- **Diseño Premium (Split-Screen):** Las pantallas grandes muestran una imagen inmersiva (`Lucia_Caminos_gym.jpg`) con un degradado en los colores de la marca (`--club-primary` y `--club-accent`).
- **Sistema de Colores:** Integración completa de la paleta oficial en Tailwind (`--club-bg`, `--club-surface`, `--text-main`, `--text-muted`, etc.).
- **Validaciones en el Cliente:** Los formularios incluyen validaciones estrictas (campos requeridos, formato de correo válido, coincidencia de contraseñas, longitud mínima).
- **Manejo de Estados UI:**
  - *Initial*: Formulario limpio.
  - *Error*: Alertas visuales y mensajes en línea debajo de cada input.
  - *Loading*: Desactivación de botones y *spinner* animado durante la petición.
  - *Success*: Vista de éxito simulada tras una petición correcta.
- **Toggle de Contraseñas:** Botón funcional (ojo) para mostrar y ocultar las contraseñas.
- **Componentes Reutilizables:** Se extrajeron los elementos visuales repetitivos para mantener el código limpio y fácil de mantener.

## 📁 Arquitectura del Proyecto

El código está organizado siguiendo los principios de escalabilidad del proyecto:

```text
src/
├── app/
│   ├── login/page.tsx         # Ruta de acceso al Login
│   └── register/page.tsx      # Ruta de acceso al Registro
├── components/
│   └── ui/                    # Componentes genéricos y reutilizables
│       ├── Button.tsx         # Botón estándar con manejo de estado 'loading'
│       ├── Input.tsx          # Input de texto genérico con manejo de errores
│       └── PasswordInput.tsx  # Input específico con toggle de visibilidad
└── features/
    └── auth/                  # Lógica aislada del módulo de Autenticación
        ├── components/
        │   ├── AuthLayout.tsx # Layout del Split-Screen usado en Login/Register
        │   ├── LoginForm.tsx  # Lógica y UI del formulario de Login
        │   └── RegisterForm.tsx # Lógica y UI del formulario de Registro
```

## 🛠️ Cómo Probar Localmente

1. Clona el repositorio e instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abre tu navegador en [http://localhost:3000](http://localhost:3000). Serás redirigido automáticamente al `/login`.
4. Visita [http://localhost:3000/register](http://localhost:3000/register) para probar la creación de cuenta.
5. Intenta enviar los formularios vacíos o con contraseñas que no coincidan para probar las validaciones.

## 🔌 Tareas Pendientes para Integración Backend

Para que los formularios sean 100% funcionales a nivel de servidor, se debe actualizar la lógica simulada actual:

1. **Reemplazar Simulaciones:** En `LoginForm.tsx` y `RegisterForm.tsx`, localizar la función `handleSubmit` y cambiar el bloque `setTimeout` simulado por una petición real (ej. `fetch('/api/auth/login', {...})`).
2. **Manejo de Sesión:** Procesar el JWT o cookie devuelto por el servidor y almacenarlo en el contexto de la aplicación o a través de `next-auth`.
3. **Redirección:** Sustituir la vista de éxito temporal (`status === "success"`) por una redirección automática al panel del usuario (`router.push('/dashboard')`).
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
