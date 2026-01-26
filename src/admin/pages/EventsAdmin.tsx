import { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, Edit2, Calendar } from 'lucide-react';
import CreateEventModal from '../components/CreateEventModal';
import AlertModal from '../components/AlertModal';
import ConfirmModal from '../components/ConfirmModal';
import { supabase } from '../../lib/supabase';

interface DBEvent {
  id: number;
  titulo: string;
  fecha_even: string;
  categoria: string;
  descripcion: string;
  img_portada: string | null;
  img_album: string | string[] | null;
}

export default function EventsAdmin() {
  const [events, setEvents] = useState<DBEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<DBEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'warning';
    title: string;
    message: string;
    onClose?: () => void;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  });

  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  // Stats State
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    upcoming: 0,
    photos: 0
  });

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .order('fecha_even', { ascending: false });

      if (error) throw error;
      
      const eventsData = data || [];
      setEvents(eventsData);

      // Calculate Stats
      const now = new Date();
      let totalPhotos = 0;
      let completed = 0;
      let upcoming = 0;

      eventsData.forEach(ev => {
        // Photos
        totalPhotos += ev.img_portada ? 1 : 0;
        let album = ev.img_album;
        if (typeof album === 'string') {
          try { album = JSON.parse(album); } catch { album = []; }
        }
        if (Array.isArray(album)) totalPhotos += album.length;

        // Date
        const evDate = new Date(ev.fecha_even);
        if (evDate < now) completed++;
        else upcoming++;
      });

      setStats({
        total: eventsData.length,
        completed,
        upcoming,
        photos: totalPhotos
      });

    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreate = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (event: DBEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const confirmDelete = (id: number) => {
    setConfirmConfig({
      isOpen: true,
      title: '¿Eliminar Evento?',
      message: 'Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este evento permanentemente?',
      onConfirm: () => handleDelete(id)
    });
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('eventos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const getGalleryCount = (event: DBEvent) => {
    let count = event.img_portada ? 1 : 0;
    
    let album = event.img_album;
    
    if (typeof album === 'string') {
      try {
        album = JSON.parse(album);
      } catch (e) {
        console.error('Error parsing album JSON:', e);
        album = [];
      }
    }
    
    if (Array.isArray(album)) {
      count += album.length;
    }
    
    return count;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-8">
      {/* Header & Stats */}
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-[#111118]">Gestión de Eventos</h1>
            <p className="text-gray-500 mt-1">Administra y organiza los eventos de la institución educativa.</p>
          </div>
          <button
            onClick={handleCreate}
            className="bg-[#1E1B4B] text-white px-6 py-3 rounded-xl hover:bg-[#1E1B4B]/90 flex items-center gap-2 font-medium shadow-lg shadow-[#1E1B4B]/20 transition-all hover:scale-105 active:scale-95"
          >
            <Plus size={20} />
            Nuevo Evento
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Eventos</p>
              <p className="text-2xl font-black text-[#111118]">{stats.total}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
          <div className="flex gap-2 bg-gray-50 p-1 rounded-lg">
             <button className="px-4 py-1.5 bg-white rounded-md shadow-sm text-xs font-bold text-[#111118]">Todas las categorías</button>
             <button className="px-4 py-1.5 text-gray-500 hover:bg-gray-200/50 rounded-md text-xs font-medium transition-colors">Último año</button>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Mostrando {events.length} resultados
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Evento</th>
                <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Fecha</th>
                <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Galería</th>
                <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-[#1E1B4B]/20 border-t-[#1E1B4B] rounded-full animate-spin"></div>
                      <p>Cargando eventos...</p>
                    </div>
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-3 opacity-50">
                      <Calendar size={48} />
                      <p>No hay eventos registrados.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-bold text-[#111118] text-base">{event.titulo}</p>
                          <p className="text-xs text-gray-500 mt-0.5 max-w-[200px] truncate">{event.descripcion}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                       <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                          <Calendar size={16} className="text-gray-400" />
                          {formatDate(event.fecha_even)}
                       </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2 text-[#111118] font-bold text-sm bg-gray-50 w-fit px-3 py-1.5 rounded-lg border border-gray-100">
                        <ImageIcon size={16} className="text-[#1E1B4B]" />
                        <span>{getGalleryCount(event)} fotos</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(event)}
                          className="p-2 text-gray-400 hover:text-[#1E1B4B] hover:bg-gray-100 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => confirmDelete(event.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          {/* Pagination Footer (Mock) */}
          {events.length > 0 && (
            <div className="p-6 border-t border-gray-100 flex items-center justify-between">
              <button className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50" disabled>
                &lt; Anterior
              </button>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg bg-[#1E1B4B] text-white font-bold text-sm flex items-center justify-center">1</button>
                {/* <button className="w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-50 font-medium text-sm flex items-center justify-center transition-colors">2</button> */}
              </div>
              <button className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50" disabled>
                Siguiente &gt;
              </button>
            </div>
          )}
        </div>
      </div>

      <CreateEventModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
        onSuccess={() => {
            fetchEvents();
            setIsModalOpen(false);
            setSelectedEvent(null);
        }}
        eventToEdit={selectedEvent}
      />

      <AlertModal 
        isOpen={alertConfig.isOpen}
        onClose={() => {
          setAlertConfig(prev => ({ ...prev, isOpen: false }));
          if (alertConfig.onClose) alertConfig.onClose();
        }}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
      <ConfirmModal 
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmConfig.onConfirm}
        title={confirmConfig.title}
        message={confirmConfig.message}
      />
    </div>
  );
}
