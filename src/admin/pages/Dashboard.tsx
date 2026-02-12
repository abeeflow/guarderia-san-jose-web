import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight,
  Calendar,
  Users,
  Image as ImageIcon
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Dashboard() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    events: 0,
    users: 0,
    installations: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setIsLoading(true);
      
      // Fetch all metrics in parallel
      const [eventsResult, usersResult, installationsResult] = await Promise.all([
        supabase.from('eventos').select('id', { count: 'exact', head: true }),
        supabase.from('users').select('id', { count: 'exact', head: true }),
        supabase.from('instalaciones').select('id', { count: 'exact', head: true })
      ]);

      setMetrics({
        events: eventsResult.count || 0,
        users: usersResult.count || 0,
        installations: installationsResult.count || 0
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-serif text-[#111118] mb-1">Bienvenido</h1>
        <p className="text-gray-500 text-sm">Panel de administración general.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Events Metric */}
        <div 
          onClick={() => navigate('/admin/events')}
          className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Eventos</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-gray-100 rounded animate-pulse"></div>
              ) : (
                <p className="text-3xl font-bold text-[#111118]">{metrics.events}</p>
              )}
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <Calendar className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-blue-500 text-xs font-bold tracking-wider group-hover:gap-3 transition-all">
            Ir a sección <ArrowRight size={14} />
          </div>
        </div>

        {/* Users Metric */}
        <div 
          onClick={() => navigate('/admin/users')}
          className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Usuarios</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-gray-100 rounded animate-pulse"></div>
              ) : (
                <p className="text-3xl font-bold text-[#111118]">{metrics.users}</p>
              )}
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
              <Users className="text-green-500" size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-500 text-xs font-bold tracking-wider group-hover:gap-3 transition-all">
            Ir a sección <ArrowRight size={14} />
          </div>
        </div>

        {/* Installations Photos Metric */}
        <div 
          onClick={() => navigate('/admin/installations')}
          className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Fotos Instalaciones</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-gray-100 rounded animate-pulse"></div>
              ) : (
                <p className="text-3xl font-bold text-[#111118]">{metrics.installations}</p>
              )}
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-colors">
              <ImageIcon className="text-purple-500" size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-purple-500 text-xs font-bold tracking-wider group-hover:gap-3 transition-all">
            Ir a sección <ArrowRight size={14} />
          </div>
        </div>
      </div>

      

      

      {/* Learning Center Banner */}
      
    </div>
  );
}
