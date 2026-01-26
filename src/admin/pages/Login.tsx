import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Lock, User, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error: dbError } = await supabase
        .from('users')
        .select('*')
        .or(`email.eq.${username},name.eq.${username}`)
        .eq('password', password)
        .maybeSingle();

      if (dbError) throw dbError;

      if (data) {
        if (!data.estado) {
          setError('Tu cuenta está inactiva. Contacta al administrador.');
        } else {
          login(data);
          navigate('/admin/dashboard');
        }
      } else {
        setError('Credenciales inválidas. Verifica tu usuario/correo y contraseña.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Ocurrió un error al intentar iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Hero & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0a1e5e] text-white overflow-hidden flex-col justify-end p-12 lg:p-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://static.vecteezy.com/system/resources/previews/008/517/116/non_2x/playschool-teacher-teaching-to-kids-vector.jpg" 
            alt="Teacher reading to kids" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e5e] via-[#0a1e5e]/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase mb-6">
            Acceso Administrativo
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Gestión escolar <br />
            <span className="italic font-light">eficiente y segura.</span>
          </h1>
          
          <p className="text-blue-100 text-lg leading-relaxed max-w-md">
            Plataforma centralizada para la coordinación académica, administrativa y comunicación institucional.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="max-w-[420px] w-full">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex items-center justify-center">
               <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-2xl font-bold text-[#111118] mb-2">Panel de Administración</h2>
            <p className="text-gray-500">Ingresa al sistema de gestión de personal</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center gap-2 animate-fade-in">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Administrador
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0a1e5e] transition-colors" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0a1e5e]/20 focus:border-[#0a1e5e] outline-none transition-all placeholder:text-gray-400"
                  placeholder="Usuario o correo"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-700">
                  Contraseña
                </label>
                <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0a1e5e] transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0a1e5e]/20 focus:border-[#0a1e5e] outline-none transition-all placeholder:text-gray-400"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="w-4 h-4 text-[#0a1e5e] border-gray-300 rounded focus:ring-[#0a1e5e]"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                Recordar sesión en este equipo
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0a1e5e] hover:bg-[#0a1e5e]/90 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#0a1e5e]/20 hover:shadow-xl hover:shadow-[#0a1e5e]/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>Verificando...</span>
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500 mb-8">
              ¿Problemas de acceso? <a href="#" className="font-bold text-blue-600 hover:underline">Soporte Técnico TI</a>
            </p>
            
            <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-gray-300 tracking-widest uppercase">
              <span>Dashboard</span>
              <span>•</span>
              <span>RRHH</span>
              <span>•</span>
              <span>Seguridad</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
