import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Plus, Trash2, Image as ImageIcon, X, Info, Edit2, GripVertical, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AlertModal from '../components/AlertModal';
import ConfirmModal from '../components/ConfirmModal';
import { OptimizedImage } from '../../components/OptimizedImage';

interface Installation {
  id: number;
  img_insta: string | null;
  created_at?: string;
  nombre_imagen?: string | null;
  orden?: number | null;
}

export default function InstallationsAdmin() {
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNameId, setEditingNameId] = useState<number | null>(null);
  const [editingNameValue, setEditingNameValue] = useState('');
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
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

  const showAlert = useCallback((type: 'success' | 'error' | 'warning', title: string, message: string, onClose?: () => void) => {
    setAlertConfig({ isOpen: true, type, title, message, onClose });
  }, []);

  // Optimized: Only fetch necessary fields
  const fetchInstallations = useCallback(async () => {
    setIsLoading(true);
    try {
      // Try to fetch with all fields first
      let { data, error } = await supabase
        .from('instalaciones')
        .select('id, img_insta, created_at, nombre_imagen, orden')
        .order('created_at', { ascending: false });

      // If error about missing columns, try without them
      if (error && (error.message?.includes('nombre_imagen') || error.message?.includes('orden') || error.message?.includes('does not exist'))) {
        // Try with orden only (without nombre_imagen)
        let result: any = await supabase
          .from('instalaciones')
          .select('id, img_insta, created_at, orden')
          .order('created_at', { ascending: false });
        
        if (result.error && (result.error.message?.includes('orden') || result.error.message?.includes('does not exist'))) {
          // orden doesn't exist, use basic fields only
          result = await supabase
            .from('instalaciones')
            .select('id, img_insta, created_at')
            .order('created_at', { ascending: false });
        }
        
        data = result.data;
        error = result.error;
      }

      if (error) {
        throw error;
      }
      
      // Normalize data: ensure all fields exist (set to null if missing)
      const installationsData: Installation[] = (data || []).map((inst: any) => ({
        id: inst.id,
        img_insta: inst.img_insta,
        created_at: inst.created_at,
        nombre_imagen: inst.nombre_imagen ?? null,
        orden: inst.orden ?? null
      }));
      
      // Sort: items with orden first (ascending), then items without orden by created_at
      installationsData.sort((a, b) => {
        // Both have orden
        if (a.orden !== null && a.orden !== undefined && b.orden !== null && b.orden !== undefined) {
          return a.orden - b.orden;
        }
        // Only a has orden
        if (a.orden !== null && a.orden !== undefined && (b.orden === null || b.orden === undefined)) {
          return -1;
        }
        // Only b has orden
        if ((a.orden === null || a.orden === undefined) && b.orden !== null && b.orden !== undefined) {
          return 1;
        }
        // Both are null, sort by created_at
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      });
      
      setInstallations(installationsData);
    } catch (error) {
      console.error('Error fetching installations:', error);
      showAlert('error', 'Error', 'No se pudo cargar las fotos de instalaciones.');
    } finally {
      setIsLoading(false);
    }
  }, [showAlert]);

  useEffect(() => {
    fetchInstallations();
  }, [fetchInstallations]);

  // Function to format image name from URL
  const formatImageName = (url: string): string => {
    try {
      // Extract filename from URL
      const urlParts = url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      // Remove extension
      const nameWithoutExt = fileName.split('.').slice(0, -1).join('.');
      
      // Remove special characters (_, -, etc.) and replace with spaces
      const cleanedName = nameWithoutExt
        .replace(/[_-]/g, ' ')
        .replace(/[^\w\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      // Convert to uppercase
      return cleanedName.toUpperCase();
    } catch (error) {
      return 'IMAGEN';
    }
  };

  // Get display name (custom name or formatted from URL)
  const getDisplayName = (installation: Installation): string => {
    if (installation.nombre_imagen) {
      return installation.nombre_imagen.toUpperCase();
    }
    if (installation.img_insta) {
      return formatImageName(installation.img_insta);
    }
    return 'IMAGEN';
  };

  // Handle name edit
  const handleStartEditName = (id: number, currentName: string) => {
    setEditingNameId(id);
    setEditingNameValue(currentName);
  };

  const handleSaveName = async (id: number) => {
    try {
      // Try to update nombre_imagen field
      const { error } = await supabase
        .from('instalaciones')
        .update({ nombre_imagen: editingNameValue.trim() || null })
        .eq('id', id);

      if (error) {
        // If field doesn't exist, just update local state
        if (error.message?.includes('nombre_imagen') || error.message?.includes('does not exist') || error.code === '42703') {
          console.warn('Campo nombre_imagen no existe en la base de datos, el nombre se mantendrá solo en esta sesión');
          // Update local state only
          setInstallations(prev => prev.map(inst => 
            inst.id === id 
              ? { ...inst, nombre_imagen: editingNameValue.trim() || null }
              : inst
          ));
          setEditingNameId(null);
          setEditingNameValue('');
          showAlert('warning', 'Advertencia', 'El nombre se ha actualizado en esta sesión. Nota: El campo "nombre_imagen" no existe en la base de datos.');
          return;
        }
        throw error;
      }

      setInstallations(prev => prev.map(inst => 
        inst.id === id 
          ? { ...inst, nombre_imagen: editingNameValue.trim() || null }
          : inst
      ));
      
      setEditingNameId(null);
      setEditingNameValue('');
      showAlert('success', 'Nombre Actualizado', 'El nombre de la imagen ha sido actualizado correctamente.');
    } catch (error) {
      console.error('Error updating name:', error);
      showAlert('error', 'Error', 'No se pudo actualizar el nombre. Intenta nuevamente.');
    }
  };

  const handleCancelEditName = () => {
    setEditingNameId(null);
    setEditingNameValue('');
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetId) {
      setDraggedItem(null);
      return;
    }

    const draggedIndex = installations.findIndex(inst => inst.id === draggedItem);
    const targetIndex = installations.findIndex(inst => inst.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedItem(null);
      return;
    }

    // Optimistic update
    const newInstallations = [...installations];
    const [draggedItemData] = newInstallations.splice(draggedIndex, 1);
    newInstallations.splice(targetIndex, 0, draggedItemData);

    // Update order numbers
    const updatedInstallations = newInstallations.map((inst, index) => ({
      ...inst,
      orden: index + 1
    }));

    setInstallations(updatedInstallations);
    setDraggedItem(null);

    // Save new order to database
    try {
      // Update orden field for all items
      const updatePromises = updatedInstallations.map((inst, index) =>
        supabase
          .from('instalaciones')
          .update({ orden: index + 1 })
          .eq('id', inst.id)
      );

      const results = await Promise.all(updatePromises);
      const errors = results.filter(r => r.error);
      
      if (errors.length > 0) {
        console.error('Errors updating order:', errors);
        throw new Error('Error al actualizar el orden en la base de datos');
      }
      
      showAlert('success', 'Orden Actualizado', 'El orden de las fotos ha sido actualizado correctamente.');
    } catch (error) {
      console.error('Error updating order:', error);
      fetchInstallations(); // Revert on error
      showAlert('error', 'Error', 'No se pudo actualizar el orden. Intenta nuevamente.');
    }
  };

  const confirmDeleteInstallation = (id: number, imgUrl: string) => {
    setConfirmConfig({
      isOpen: true,
      title: '¿Eliminar Foto?',
      message: 'Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar esta foto permanentemente?',
      onConfirm: () => handleDeleteInstallation(id, imgUrl)
    });
  };

  // Optimized: Update local state immediately, delete in background
  const handleDeleteInstallation = async (id: number, imgUrl: string) => {
    // Optimistic update - remove from UI immediately
    setInstallations(prev => prev.filter(inst => inst.id !== id));
    setConfirmConfig(prev => ({ ...prev, isOpen: false }));

    try {
      // Extract file path from URL
      const urlParts = imgUrl.split('/');
      const bucketIndex = urlParts.findIndex(part => part === 'fotos-local');
      
      // Delete operations in parallel
      const deletePromises: Promise<any>[] = [];

      if (bucketIndex !== -1 && bucketIndex < urlParts.length - 1) {
        const filePath = urlParts.slice(bucketIndex + 1).join('/');
        deletePromises.push(
          supabase.storage.from('fotos-local').remove([filePath])
        );
      }

      // Delete from database
      const dbDeletePromise = supabase.from('instalaciones').delete().eq('id', id);
      deletePromises.push(Promise.resolve(dbDeletePromise));

      await Promise.all(deletePromises);
      showAlert('success', 'Foto Eliminada', 'La foto ha sido eliminada correctamente.');
    } catch (error) {
      console.error('Error deleting installation:', error);
      // Revert optimistic update on error
      fetchInstallations();
      showAlert('error', 'Error', 'No se pudo eliminar la foto. Intenta nuevamente.');
    }
  };

  // Optimized: Upload multiple images in parallel
  const handleImageUpload = async (files: File[]) => {
    const timestamp = Date.now();
    const uploadPromises = files.map(async (file, index) => {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const fileName = `instalacion_${timestamp}_${index}.${fileExt}`;
      const filePath = `instalaciones/${fileName}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('fotos-local')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('fotos-local')
        .getPublicUrl(filePath);

      return publicUrl;
    });

    try {
      // Upload all files in parallel
      const publicUrls = await Promise.all(uploadPromises);

      // Insert all records in a single batch
      const currentMaxOrder = installations.length > 0 
        ? Math.max(...installations.map(inst => inst.orden || 0), 0)
        : 0;
      
      // Try to include orden, but it will be ignored if field doesn't exist
      const records = publicUrls.map((url, index) => {
        const record: any = {
          img_insta: url,
          created_at: new Date().toISOString()
        };
        // Only add orden if we have installations (meaning field might exist)
        if (installations.length > 0) {
          record.orden = currentMaxOrder + index + 1;
        }
        return record;
      });

      const { error: dbError } = await supabase
        .from('instalaciones')
        .insert(records);

      if (dbError) throw dbError;

      // Optimized: Add new items to state instead of refetching
      const newInstallations: Installation[] = records.map((record, index) => ({
        id: Date.now() + index, // Temporary ID, will be updated on next fetch
        img_insta: record.img_insta,
        created_at: record.created_at,
        orden: record.orden
      }));

      setInstallations(prev => [...newInstallations, ...prev]);
      
      const successMessage = files.length === 1 
        ? 'La foto ha sido agregada correctamente.'
        : `${files.length} fotos han sido agregadas correctamente.`;
      
      showAlert('success', files.length === 1 ? 'Foto Agregada' : 'Fotos Agregadas', successMessage);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error uploading images:', error);
      showAlert('error', 'Error', 'No se pudieron subir las fotos. Intenta nuevamente.');
      // Refresh to ensure consistency
      fetchInstallations();
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111118]">Fotos Instalaciones</h1>
          <p className="text-gray-500 mt-1">Gestiona el álbum de fotos de las instalaciones de la guardería.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#111118] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-900 transition-colors shadow-lg shadow-gray-200"
        >
          <Plus size={18} />
          Agregar nueva Imagen
        </button>
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#EBFDF5] rounded-xl flex items-center justify-center">
            <ImageIcon className="text-[#00A76F]" size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Fotos</p>
            <p className="text-2xl font-bold text-[#111118]">{installations.length}</p>
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          <Info className="text-blue-500" size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-blue-800 font-medium">
            Las fotos se mostrarán en el sistema como se ven en esta sección, de izquierda a derecha.
          </p>
        </div>
      </div>

      {/* Gallery */}
      {isLoading ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-[#111118] rounded-full animate-spin"></div>
            <p className="text-gray-500">Cargando fotos...</p>
          </div>
        </div>
      ) : installations.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="flex flex-col items-center gap-3 opacity-50">
            <ImageIcon size={48} className="text-gray-400" />
            <p className="text-gray-500">No hay fotos de instalaciones aún.</p>
            <p className="text-sm text-gray-400">Haz clic en "Agregar nueva Imagen" para comenzar.</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {installations.map((installation) => (
              <div
                key={installation.id}
                draggable
                onDragStart={(e) => handleDragStart(e, installation.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, installation.id)}
                className={`group relative flex flex-col rounded-xl overflow-hidden border border-gray-200 hover:border-[#00A76F] transition-all shadow-sm hover:shadow-lg cursor-move ${
                  draggedItem === installation.id ? 'opacity-50 scale-95' : ''
                }`}
              >
                {/* Image Name - Editable */}
                {installation.img_insta && (
                  <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex items-center gap-2">
                    {editingNameId === installation.id ? (
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="text"
                          value={editingNameValue}
                          onChange={(e) => setEditingNameValue(e.target.value)}
                          onBlur={() => handleSaveName(installation.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveName(installation.id);
                            } else if (e.key === 'Escape') {
                              handleCancelEditName();
                            }
                          }}
                          className="flex-1 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#00A76F]"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveName(installation.id)}
                          className="text-[#00A76F] hover:text-[#009462] transition-colors"
                          title="Guardar"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={handleCancelEditName}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Cancelar"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <GripVertical size={14} className="text-gray-400 shrink-0" />
                        <p 
                          className="flex-1 text-xs font-bold text-gray-700 truncate cursor-text"
                          onClick={() => handleStartEditName(installation.id, getDisplayName(installation))}
                          title="Haz clic para editar"
                        >
                          {getDisplayName(installation)}
                        </p>
                        <button
                          onClick={() => handleStartEditName(installation.id, getDisplayName(installation))}
                          className="text-gray-400 hover:text-[#00A76F] transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                          title="Editar nombre"
                        >
                          <Edit2 size={12} />
                        </button>
                      </>
                    )}
                  </div>
                )}
                
                {/* Image Container */}
                <div className="relative aspect-square">
                  {installation.img_insta ? (
                    <>
                      <OptimizedImage
                        src={installation.img_insta}
                        alt={`Instalación ${installation.id}`}
                        className="w-full h-full"
                        imageClassName="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => confirmDeleteInstallation(installation.id, installation.img_insta!)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          title="Eliminar foto"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <ImageIcon size={32} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <UploadImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpload={handleImageUpload}
        />
      )}
    </div>
  );
}

interface UploadImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => Promise<void>;
}

interface FilePreview {
  file: File;
  preview: string;
}

function UploadImageModal({ isOpen, onClose, onUpload }: UploadImageModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<FilePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedFiles([]);
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: FilePreview[] = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setSelectedFiles(prev => [...prev, ...newFiles]);
    
    // Reset input to allow selecting same files again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    const fileToRemove = selectedFiles[index];
    URL.revokeObjectURL(fileToRemove.preview);
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    const files = selectedFiles.map(f => f.file);
    
    try {
      await onUpload(files);
      // Cleanup preview URLs
      selectedFiles.forEach(f => URL.revokeObjectURL(f.preview));
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-start justify-between p-8 pb-0 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-[#111118]">Agregar Imágenes</h2>
            <p className="text-gray-500 mt-1">Sube una o varias fotos de las instalaciones de la guardería.</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Seleccionar Imágenes</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-[#00A76F] hover:bg-gray-50 transition-all min-h-[200px]"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="p-4 bg-gray-100 rounded-full">
                <ImageIcon size={32} className="text-gray-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">Haz clic para seleccionar imágenes</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP (Max. 5MB por imagen)</p>
                <p className="text-xs text-gray-400 mt-1">Puedes seleccionar múltiples imágenes</p>
              </div>
            </div>
          </div>

          {/* Preview Grid */}
          {selectedFiles.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  Imágenes seleccionadas ({selectedFiles.length})
                </label>
                <button
                  type="button"
                  onClick={() => {
                    selectedFiles.forEach(f => URL.revokeObjectURL(f.preview));
                    setSelectedFiles([]);
                  }}
                  className="text-xs text-red-500 hover:text-red-600 font-medium"
                >
                  Limpiar todas
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-2">
                {selectedFiles.map((filePreview, index) => (
                  <div
                    key={index}
                    className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
                  >
                    <img
                      src={filePreview.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      title="Eliminar"
                    >
                      <X size={16} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate">
                      {filePreview.file.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-gray-600 font-bold hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={selectedFiles.length === 0 || isUploading}
              className="px-6 py-2.5 rounded-xl bg-[#00A76F] text-white font-bold hover:bg-[#009462] transition-colors shadow-lg shadow-[#00A76F]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading 
                ? `Subiendo ${selectedFiles.length} imagen${selectedFiles.length > 1 ? 'es' : ''}...` 
                : `Subir ${selectedFiles.length} imagen${selectedFiles.length > 1 ? 'es' : ''}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

