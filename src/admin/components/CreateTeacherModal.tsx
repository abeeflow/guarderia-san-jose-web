import React, { useEffect, useRef, useState } from 'react';
import { X, User, Calendar, Shield, Image as ImageIcon, Camera } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AlertModal from './AlertModal';
import { OptimizedImage } from '../../components/OptimizedImage';

interface DBTeacher {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  fecha_cum: string | null;
  activo: boolean;
  img_maestro: string | null;
  curso: string;
}

interface FormData {
  nombre: string;
  apellidos: string;
  correo: string;
  fecha_cum: string;
  activo: boolean;
  curso: string;
}

export default function CreateTeacherModal({
  isOpen,
  onClose,
  onSave,
  teacherToEdit
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (form: FormData, imageUrl?: string | null) => Promise<void>;
  teacherToEdit?: DBTeacher;
}) {
  const [form, setForm] = useState<FormData>({
    nombre: '',
    apellidos: '',
    correo: '',
    fecha_cum: '',
    activo: true,
    curso: ''
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error' | 'warning',
    title: '',
    message: '',
    onClose: undefined as (() => void) | undefined
  });

  useEffect(() => {
    if (isOpen) {
      if (teacherToEdit) {
        setForm({
          nombre: teacherToEdit.nombre || '',
          apellidos: teacherToEdit.apellidos || '',
          correo: teacherToEdit.correo || '',
          fecha_cum: teacherToEdit.fecha_cum ? teacherToEdit.fecha_cum.slice(0, 10) : '',
          activo: teacherToEdit.activo,
          curso: teacherToEdit.curso || ''
        });
        setPreviewImage(teacherToEdit.img_maestro || '');
        setImageFile(null);
      } else {
        setForm({
          nombre: '',
          apellidos: '',
          correo: '',
          fecha_cum: '',
          activo: true,
          curso: ''
        });
        setPreviewImage('');
        setImageFile(null);
      }
      setErrors({});
    }
  }, [isOpen, teacherToEdit]);

  if (!isOpen) return null;

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!form.nombre.trim()) e.nombre = 'El nombre es obligatorio';
    if (!form.apellidos.trim()) e.apellidos = 'Los apellidos son obligatorios';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.correo.trim()) e.correo = 'El correo es obligatorio';
    else if (!emailRegex.test(form.correo)) e.correo = 'Correo inválido';
    if (!form.curso.trim()) e.curso = 'El curso es obligatorio';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const sanitize = (s: string) => {
    const sanitized = s.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return sanitized || 'undefined';
  };

  const uploadImage = async (file: File, path: string) => {
    try {
      const { error } = await supabase.storage.from('fotos-local').upload(path, file, { upsert: true });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('fotos-local').getPublicUrl(path);
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      let imageUrl: string | null = previewImage || null;
      
      // If we have a new file, upload it
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop() || 'jpg';
        const safeName = sanitize(`${form.nombre}_${form.apellidos}`);
        const fileName = `foto_${Date.now()}.${fileExt}`;
        const filePath = `maestros/${safeName}/${fileName}`;
        
        imageUrl = await uploadImage(imageFile, filePath);
      } else if (imageUrl && imageUrl.startsWith('blob:')) {
        // Safety check: if we have a blob url but no file, we can't save it
        imageUrl = null;
      }

      await onSave(form, imageUrl);
    } catch (err) {
      console.error('Error saving teacher:', err);
      setAlertConfig({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'No se pudo guardar el maestro.',
        onClose: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <AlertModal
        isOpen={alertConfig.isOpen}
        onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-start justify-between p-8 pb-0 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-[#111118]">{teacherToEdit ? 'Editar Maestro' : 'Crear Maestro'}</h2>
            <p className="text-gray-500 mt-1">Completa los datos del maestro.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X size={24} />
          </button>
        </div>
        <div className="overflow-y-auto">
          <form onSubmit={submit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Nombre</label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-xl border ${errors.nombre ? 'border-red-500' : 'border-gray-200'} focus:border-[#00A76F] focus:ring-2 focus:ring-[#00A76F]/20 outline-none`}
                value={form.nombre}
                onChange={e => {
                  setForm({ ...form, nombre: e.target.value });
                  if (errors.nombre) setErrors({ ...errors, nombre: '' });
                }}
              />
              {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Apellidos</label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-xl border ${errors.apellidos ? 'border-red-500' : 'border-gray-200'} focus:border-[#00A76F] focus:ring-2 focus:ring-[#00A76F]/20 outline-none`}
                value={form.apellidos}
                onChange={e => {
                  setForm({ ...form, apellidos: e.target.value });
                  if (errors.apellidos) setErrors({ ...errors, apellidos: '' });
                }}
              />
              {errors.apellidos && <p className="text-red-500 text-xs mt-1">{errors.apellidos}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Correo</label>
              <input
                type="email"
                className={`w-full px-4 py-3 rounded-xl border ${errors.correo ? 'border-red-500' : 'border-gray-200'} focus:border-[#00A76F] focus:ring-2 focus:ring-[#00A76F]/20 outline-none`}
                value={form.correo}
                onChange={e => {
                  setForm({ ...form, correo: e.target.value });
                  if (errors.correo) setErrors({ ...errors, correo: '' });
                }}
              />
              {errors.correo && <p className="text-red-500 text-xs mt-1">{errors.correo}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Fecha de nacimiento</label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00A76F] focus:ring-2 focus:ring-[#00A76F]/20 outline-none"
                  value={form.fecha_cum}
                  onChange={e => setForm({ ...form, fecha_cum: e.target.value })}
                />
                {!form.fecha_cum && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Calendar size={18} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Curso</label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-xl border ${errors.curso ? 'border-red-500' : 'border-gray-200'} focus:border-[#00A76F] focus:ring-2 focus:ring-[#00A76F]/20 outline-none`}
                value={form.curso}
                onChange={e => {
                  setForm({ ...form, curso: e.target.value });
                  if (errors.curso) setErrors({ ...errors, curso: '' });
                }}
              />
              {errors.curso && <p className="text-red-500 text-xs mt-1">{errors.curso}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Estado Activo</label>
              <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between border border-gray-100 border-dashed">
                <div className="flex items-center gap-2 text-[#00A76F] font-bold text-xs tracking-wider uppercase">
                  <Shield size={16} />
                  Acceso
                </div>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, activo: !form.activo })}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-[#00A76F] focus:ring-offset-2 ${form.activo ? 'bg-[#00A76F]' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ${form.activo ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Foto del Maestro</label>
            <div className="flex gap-6 items-center">
              {/* Image Preview - Left side */}
              <div 
                className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg shrink-0 group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {previewImage ? (
                  <>
                    <OptimizedImage
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full"
                      imageClassName="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-bold text-center px-2">Cambiar</span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center gap-1 text-gray-400 hover:bg-gray-100 transition-colors">
                    <User size={32} />
                  </div>
                )}
              </div>

              {/* Upload Button & Info - Right side */}
              <div className="flex-1 border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#00A76F] hover:bg-gray-50 transition-all h-32"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div className="p-3 bg-gray-100 rounded-full text-gray-500">
                  <ImageIcon size={20} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-700">Subir foto</p>
                  <p className="text-xs text-gray-400">JPG, PNG, WebP (Max. 2MB)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl text-gray-600 font-bold hover:bg-gray-50">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl bg-[#00A76F] text-white font-bold hover:bg-[#009462] transition-colors shadow-lg shadow-[#00A76F]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Guardando...' : (teacherToEdit ? 'Guardar Cambios' : 'Crear Maestro')}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
