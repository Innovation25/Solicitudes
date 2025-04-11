'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [user, setUser] = useState(''); // Estado para el nombre de usuario
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, password }), // Envía 'user' y 'password'
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Inicio de sesión exitoso', data);
        localStorage.setItem('authToken', data.token);
        router.push('/dashboard');
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (err: any) {
      console.error('Error al iniciar sesión:', err);
      setError('Error al iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='flex flex-col bg-white rounded-lg shadow-lg p-8 w-full max-w-md'>
      <div className='flex flex-col justify-center items-center mb-4'>
        <Image
          src="/logo/logo_saime_d.png"
          alt="Logo de la empresa"
          width={150}
          height={50}
          className='object-contain'
        />
        <p className='text-3xl font-bold font-[Roboto] text-[#164694]'>SOLICITUDES</p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4 mb-6'>
        <div>
          <input
            type="text"
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Ingrese su usuario" // Cambiado a "usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)} // Actualizado a setUser
            required
          />
        </div>
        <div>
          <input
            type="password"
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className='text-red-500'>{error}</p>}
        <div className='flex space-x-4'>
          <button
            type="submit"
            className='flex-1 bg-[#164694] text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition'
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
          <button
            type="button"
            className='flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition'
            onClick={() => {
              setUser('');
              setPassword('');
              setError(null);
            }}
          >
            Cancelar
          </button>
        </div>
      </form>

      <div className='text-center text-sm text-gray-600 mb-4'>
        <a href="#" className='text-blue-600 hover:underline'> Recuperar contraseña</a>
      </div>

      <div className='text-center text-xs text-gray-500 mt-4'>
        © Todos los derechos reservados | Diseño de Innovación y Desarrollo
      </div>
    </div>
  );
}