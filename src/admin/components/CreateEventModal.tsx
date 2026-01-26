import { useState, useRef, useEffect } from 'react';
import { X, Calendar, Image as ImageIcon, Plus } from 'lucide-react';
import AlertModal from './AlertModal';
import { supabase } from '../../lib/supabase';

// Define interface matching DB structure locally to avoid circular dependencies
interface DBEvent {
  id: number;
  titulo: string;
  fecha_even: string;
  categoria: string;
  descripcion: string;
  img_portada: string | null;
  img_album: string | string[] | null;
}

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Generic success callback
  eventToEdit?: DBEvent | null; // Optional event to edit
}

export default function CreateEventModal({ isOpen, onClose, onSuccess, eventToEdit }: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    category: 'Escolar',
    description: '',
    image: '',
  });
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState<{ file: File, preview: string }[]>([]);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Populate form when eventToEdit changes
  useEffect(() => {
    if (isOpen) {
      if (eventToEdit) {
        // Edit Mode
        let gallery: string[] = [];
        if (typeof eventToEdit.img_album === 'string') {
          try {
            gallery = JSON.parse(eventToEdit.img_album);
          } catch (e) {
            console.error('Error parsing gallery JSON', e);
            gallery = [];
          }
        } else if (Array.isArray(eventToEdit.img_album)) {
          gallery = eventToEdit.img_album;
        }

        setFormData({
          title: eventToEdit.titulo,
          date: eventToEdit.fecha_even,
          category: eventToEdit.categoria,
          description: eventToEdit.descripcion,
          image: eventToEdit.img_portada || '',
        });
        setExistingGallery(gallery);
      } else {
        // Create Mode - Reset
        setFormData({
          title: '',
          date: '',
          category: 'Escolar',
          description: '',
          image: '',
        });
        setExistingGallery([]);
      }
      // Always reset files on open
      setMainImageFile(null);
      setNewGalleryFiles([]);
      setErrors({});
    }
  }, [isOpen, eventToEdit]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) newErrors.title = 'El nombre del evento es obligatorio';
    if (!formData.date) newErrors.date = 'La fecha del evento es obligatoria';
    if (!formData.description.trim()) newErrors.description = 'La descripción es obligatoria';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sanitizeFileName = (name: string) => {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  };

  const uploadImage = async (file: File, path: string) => {
    const { error } = await supabase.storage
      .from('fotos-local')
      .upload(path, file, {
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('fotos-local')
      .getPublicUrl(path);

    return publicUrl;
  };

  const showAlert = (type: 'success' | 'error' | 'warning', title: string, message: string, onClose?: () => void) => {
    setAlertConfig({
      isOpen: true,
      type,
      title,
      message,
      onClose
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const sanitizedTitle = sanitizeFileName(formData.title);
      let mainImageUrl = formData.image;
      const galleryUrls: string[] = [...existingGallery];

      // 1. Upload Main Image (only if new file selected)
      if (mainImageFile) {
        const fileExt = mainImageFile.name.split('.').pop();
        const mainImagePath = `eventos/${sanitizedTitle}/principal_${Date.now()}.${fileExt}`;
        mainImageUrl = await uploadImage(mainImageFile, mainImagePath);
      }

      // 2. Upload New Gallery Images
      if (newGalleryFiles.length > 0) {
        await Promise.all(newGalleryFiles.map(async ({ file }, index) => {
          const fileExt = file.name.split('.').pop();
          const galleryPath = `eventos/${sanitizedTitle}/secundaria_${Date.now()}_${index}.${fileExt}`;
          const url = await uploadImage(file, galleryPath);
          galleryUrls.push(url);
        }));
      }

      const eventData = {
        titulo: formData.title,
        fecha_even: formData.date,
        categoria: formData.category,
        descripcion: formData.description,
        img_portada: mainImageUrl,
        img_album: JSON.stringify(galleryUrls)
      };

      if (eventToEdit) {
        // UPDATE
        const { error: dbError } = await supabase
          .from('eventos')
          .update(eventData)
          .eq('id', eventToEdit.id);
        
        if (dbError) throw dbError;
        showAlert('success', '¡Acción Completada con Éxito!', 'El evento ha sido actualizado correctamente en el sistema.', () => {
          onSuccess();
          onClose();
        });
      } else {
        // INSERT
        const { error: dbError } = await supabase
          .from('eventos')
          .insert(eventData);
        
        if (dbError) throw dbError;
        showAlert('success', '¡Acción Completada con Éxito!', 'El evento ha sido creado correctamente en el sistema.', () => {
          onSuccess();
          onClose();
        });
      }
      
    } catch (error) {
      console.error('Error saving event:', error);
      showAlert('error', '¡Error!', 'Ha ocurrido un error al guardar el evento. Por favor intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // File upload handlers
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImageFile(file);
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: url }));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setNewGalleryFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeExistingImage = (index: number) => {
    setExistingGallery(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewGalleryFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-[#111118]">
              {eventToEdit ? 'Editar Evento' : 'Nuevo Evento'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {eventToEdit ? 'Modifica los detalles del evento' : 'Registra una nueva actividad para el calendario escolar'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          <form id="create-event-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Event Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">NOMBRE DEL EVENTO</label>
              <input 
                type="text"
                placeholder="Ej: Festival de Primavera"
                className={`w-full px-4 py-3 rounded-xl border ${errors.title ? 'border-red-500' : 'border-gray-200'} focus:border-[#1E1B4B] focus:ring-2 focus:ring-[#1E1B4B]/20 outline-none transition-all placeholder-gray-400 text-gray-800`}
                value={formData.title}
                onChange={(e) => {
                  setFormData({...formData, title: e.target.value});
                  if (errors.title) setErrors({...errors, title: ''});
                }}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Date and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">FECHA DEL EVENTO</label>
                <div className="relative">
                  <input 
                    type="date"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.date ? 'border-red-500' : 'border-gray-200'} focus:border-[#1E1B4B] focus:ring-2 focus:ring-[#1E1B4B]/20 outline-none transition-all placeholder-gray-400 text-gray-800 appearance-none`}
                    value={formData.date}
                    onChange={(e) => {
                      setFormData({...formData, date: e.target.value});
                      if (errors.date) setErrors({...errors, date: ''});
                    }}
                  />
                  {!formData.date && (
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                       <Calendar size={18} />
                     </div>
                  )}
                </div>
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">CATEGORÍA</label>
                <div className="relative">
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1E1B4B] focus:ring-2 focus:ring-[#1E1B4B]/20 outline-none transition-all appearance-none bg-white text-gray-800"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Escolar">Escolar</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Deportivo">Deportivo</option>
                    <option value="Reunión">Reunión</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">DESCRIPCIÓN</label>
              <textarea 
                placeholder="Describe brevemente los detalles del evento..."
                rows={3}
                className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-red-500' : 'border-gray-200'} focus:border-[#1E1B4B] focus:ring-2 focus:ring-[#1E1B4B]/20 outline-none transition-all placeholder-gray-400 text-gray-800 resize-none`}
                value={formData.description}
                onChange={(e) => {
                  setFormData({...formData, description: e.target.value});
                  if (errors.description) setErrors({...errors, description: ''});
                }}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Photos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Photo */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">FOTO PRINCIPAL</label>
                <div 
                  className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#1E1B4B] hover:bg-gray-50 transition-all h-[160px] relative overflow-hidden group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleMainImageChange}
                  />
                  
                  {formData.image ? (
                    <>
                      <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-bold">Cambiar imagen</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                        <ImageIcon size={24} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-gray-700">Subir foto destacada</p>
                        <p className="text-xs text-gray-400 mt-1">Recomendado 1200x800px</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Album */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">ÁLBUM DE FOTOS</label>
                
                {/* Image Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                  {existingGallery.map((url, index) => (
                    <div key={`existing-${index}`} className="relative aspect-square rounded-lg overflow-hidden group border border-gray-200">
                      <img src={url} alt={`Galería ${index}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {newGalleryFiles.map((item, index) => (
                    <div key={`new-${index}`} className="relative aspect-square rounded-lg overflow-hidden group border border-gray-200">
                      <img src={item.preview} alt={`Nueva ${index}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {/* Upload Button */}
                  <div 
                    className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#1E1B4B] hover:bg-gray-50 transition-all aspect-square"
                  >
                     <input 
                      type="file" 
                      multiple
                      className="hidden" 
                      id="gallery-input"
                      accept="image/*"
                      onChange={handleGalleryChange}
                    />
                    <label htmlFor="gallery-input" className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-2">
                      <div className="w-8 h-8 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-1">
                        <Plus size={20} />
                      </div>
                      <span className="text-xs text-gray-500 text-center">Agregar fotos</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0 z-10">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-200 rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            form="create-event-form"
            disabled={isLoading}
            className="px-6 py-2.5 bg-[#1E1B4B] text-white font-medium rounded-xl hover:bg-[#1E1B4B]/90 transition-colors shadow-lg shadow-[#1E1B4B]/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Guardando...</span>
              </>
            ) : (
              <span>{eventToEdit ? 'Actualizar Evento' : 'Guardar Evento'}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
