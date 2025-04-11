'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa useRouter para la redirección

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Inicializa el router

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/users', { // Cambia la URL a tu API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
console.log("anyelo", data )
      if (response.ok) {
        console.log('Inicio de sesión exitoso', data);
        // Almacena el token (ejemplo con localStorage)
        localStorage.setItem('authToken', data.token);
        // Redirige al usuario a la página principal o dashboard
        router.push('/dashboard');
      } else {
        setError(data.message || 'Error al iniciar sesión. Inténtalo de nuevo.');
      }
    } catch (err: any) {
      console.error('Error al iniciar sesión:', err);
      setError('Error al iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
};

export default LoginForm;