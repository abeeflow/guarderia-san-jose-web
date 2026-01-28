import { useEffect, useMemo, useState } from 'react';
import { Plus, Edit2, Trash2, User as UserIcon, Filter, Search, type LucideIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AlertModal from '../components/AlertModal';
import ConfirmModal from '../components/ConfirmModal';
import { OptimizedImage } from '../../components/OptimizedImage';
import CreateTeacherModal from '../components/CreateTeacherModal';

interface DBTeacher {
  id: number;
  created_at?: string;
  nombre: string;
  apellidos: string;
  correo: string;
  fecha_cum: string | null;
  activo: boolean;
  img_maestro: string | null;
  curso: string;
}

interface TeacherRow {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  fecha_cum: string | null;
  curso: string;
  activo: boolean;
  avatar: string | null;
  roleIcon: LucideIcon;
  statusText: string;
  statusColor: string;
}

export default function TeachersAdmin() {
  const [teachers, setTeachers] = useState<TeacherRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState<DBTeacher | null>(null);
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error' | 'warning',
    title: '',
    message: '',
    onClose: undefined as (() => void) | undefined
  });
  const [confirmConfig, setConfirmConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  const [searchText, setSearchText] = useState('');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const showAlert = (type: 'success' | 'error' | 'warning', title: string, message: string, onClose?: () => void) => {
    setAlertConfig({ isOpen: true, type, title, message, onClose });
  };

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('maestros')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      const mapped: TeacherRow[] = (data || []).map((t: DBTeacher) => ({
        id: t.id,
        nombre: t.nombre,
        apellidos: t.apellidos,
        correo: t.correo,
        fecha_cum: t.fecha_cum,
        curso: t.curso,
        activo: t.activo,
        avatar: t.img_maestro,
        roleIcon: UserIcon,
        statusText: t.activo ? 'Activo' : 'Inactivo',
        statusColor: t.activo ? 'bg-[#EBFDF5] text-[#00A76F]' : 'bg-gray-100 text-gray-500'
      }));
      setTeachers(mapped);
    } catch (e) {
      console.error('Error fetching teachers:', e);
      showAlert('error', 'Error', 'No se pudo cargar la lista de maestros.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const courses = useMemo(() => {
    const set = new Set<string>();
    teachers.forEach(t => t.curso && set.add(t.curso));
    return Array.from(set);
  }, [teachers]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter(t => {
      const matchesSearch =
        `${t.nombre} ${t.apellidos} ${t.correo}`.toLowerCase().includes(searchText.toLowerCase());
      const matchesCourse = courseFilter === 'all' ? true : t.curso === courseFilter;
      const matchesStatus =
        statusFilter === 'all' ? true : statusFilter === 'active' ? t.activo : !t.activo;
      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [teachers, searchText, courseFilter, statusFilter]);

  const openCreate = () => {
    setTeacherToEdit(null);
    setIsModalOpen(true);
  };

  const openEdit = (id: number) => {
    const found = teachers.find(t => t.id === id);
    if (!found) return;
    const teacher: DBTeacher = {
      id: found.id,
      nombre: found.nombre,
      apellidos: found.apellidos,
      correo: found.correo,
      fecha_cum: found.fecha_cum,
      activo: found.activo,
      img_maestro: found.avatar,
      curso: found.curso
    };
    setTeacherToEdit(teacher);
    setIsModalOpen(true);
  };

  const confirmDeleteTeacher = (id: number) => {
    setConfirmConfig({
      isOpen: true,
      title: '¿Eliminar Maestro?',
      message: 'Esta acción no se puede deshacer. ¿Deseas eliminar este maestro permanentemente?',
      onConfirm: () => handleDeleteTeacher(id)
    });
  };

  const handleDeleteTeacher = async (id: number) => {
    try {
      const { error } = await supabase.from('maestros').delete().eq('id', id);
      if (error) throw error;
      await fetchTeachers();
      showAlert('success', 'Maestro Eliminado', 'El maestro fue eliminado correctamente.');
    } catch (e) {
      console.error('Error deleting teacher:', e);
      showAlert('error', 'Error', 'No se pudo eliminar el maestro. Intenta nuevamente.');
    } finally {
      setConfirmConfig(prev => ({ ...prev, isOpen: false }));
    }
  };

  const handleSaveTeacher = async (payload: {
    nombre: string;
    apellidos: string;
    correo: string;
    fecha_cum?: string;
    activo: boolean;
    curso: string;
    img_maestro?: string | null;
  }, editingId?: number) => {
    try {
      if (editingId) {
        const { error } = await supabase
          .from('maestros')
          .update({
            nombre: payload.nombre,
            apellidos: payload.apellidos,
            correo: payload.correo,
            fecha_cum: payload.fecha_cum || null,
            activo: payload.activo,
            curso: payload.curso,
            img_maestro: payload.img_maestro || null
          })
          .eq('id', editingId);
        if (error) throw error;
        showAlert('success', 'Maestro Actualizado', 'Los datos del maestro han sido actualizados.');
      } else {
        const { error } = await supabase
          .from('maestros')
          .insert([{
            nombre: payload.nombre,
            apellidos: payload.apellidos,
            correo: payload.correo,
            fecha_cum: payload.fecha_cum || null,
            activo: payload.activo,
            curso: payload.curso,
            img_maestro: payload.img_maestro || null,
            created_at: new Date().toISOString()
          }]);
        if (error) throw error;
        showAlert('success', 'Maestro Creado', 'El maestro ha sido registrado correctamente.');
      }
      await fetchTeachers();
    } catch (e) {
      console.error('Error saving teacher:', e);
      showAlert('error', 'Error', 'No se pudo guardar el maestro. Intenta nuevamente.');
      throw e;
    }
  };

  return (
    <div className="space-y-6">
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
        title={confirmConfig.title}
        message={confirmConfig.message}
        onConfirm={confirmConfig.onConfirm}
      />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-[#111118]">Gestión de Maestros</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#111118] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-900 transition-colors shadow-lg shadow-gray-200"
          >
            <Plus size={18} />
            Nuevo Maestro
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200 flex-1">
            <Search size={16} className="text-gray-400" />
            <input
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder="Buscar por nombre, apellido o correo"
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
              <Filter size={16} className="text-gray-400" />
              <select
                value={courseFilter}
                onChange={e => setCourseFilter(e.target.value)}
                className="bg-transparent text-sm outline-none"
              >
                <option value="all">Todos los cursos</option>
                {courses.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
              <Filter size={16} className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                className="bg-transparent text-sm outline-none"
              >
                <option value="all">Todos</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/30 border-b border-gray-100">
              <tr>
                <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider min-w-[250px]">Maestro</th>
                <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider min-w-[150px]">Fecha Cumpleaños</th>
                <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider min-w-[150px]">Curso</th>
                <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider min-w-[120px]">Estado</th>
                <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right min-w-[100px]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-gray-300 border-t-[#111118] rounded-full animate-spin"></div>
                      <p>Cargando maestros...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredTeachers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500">
                    <div className="opacity-50">No hay maestros según los filtros aplicados.</div>
                  </td>
                </tr>
              ) : (
                filteredTeachers.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        {t.avatar ? (
                          <OptimizedImage
                            src={t.avatar}
                            alt={`${t.nombre} ${t.apellidos}`}
                            className="w-10 h-10 rounded-lg overflow-hidden"
                            imageClassName="object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center">
                            <UserIcon size={18} />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{t.nombre} {t.apellidos}</p>
                          <p className="text-xs text-gray-500">{t.correo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="text-gray-700 text-sm font-medium">
                        {t.fecha_cum ? (() => {
                          const parts = t.fecha_cum.split('-');
                          const y = parts[0];
                          const m = parts[1]?.padStart(2, '0');
                          const d = parts[2]?.padStart(2, '0');
                          return `${d}/${m}/${y}`;
                        })() : '-'}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="text-gray-700 text-sm font-medium">{t.curso || 'Sin asignar'}</div>
                    </td>
                    <td className="py-5 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${t.statusColor}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {t.statusText}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={() => openEdit(t.id)}>
                          <Edit2 size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-red-500 transition-colors" onClick={() => confirmDeleteTeacher(t.id)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateTeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={async (form, imageUrl) => {
          const payload = {
            nombre: form.nombre,
            apellidos: form.apellidos,
            correo: form.correo,
            fecha_cum: form.fecha_cum || undefined,
            activo: form.activo,
            curso: form.curso,
            img_maestro: imageUrl || null
          };
          await handleSaveTeacher(payload, teacherToEdit?.id);
          setIsModalOpen(false);
          setTeacherToEdit(null);
        }}
        teacherToEdit={teacherToEdit || undefined}
      />
    </div>
  );
}
