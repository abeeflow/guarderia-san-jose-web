import { useState, useEffect } from 'react';
import { X, User, Shield, Eye, EyeOff } from 'lucide-react';

export interface UserFormData {
  name: string;
  email: string;
  role: string;
  password?: string;
  isActive: boolean;
}

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (userData: UserFormData) => void;
  userToEdit?: Partial<UserFormData> & { id?: number; estado?: boolean };
}

export default function CreateUserModal({ isOpen, onClose, onCreate, userToEdit }: CreateUserModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    isActive: true
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (userToEdit) {
        setFormData({
          name: userToEdit.name || '',
          email: userToEdit.email || '',
          role: userToEdit.role || '',
          password: userToEdit.password || '',
          isActive: userToEdit.estado ?? true
        });
      } else {
        setFormData({
          name: '',
          email: '',
          role: '',
          password: '',
          isActive: true
        });
      }
      setErrors({});
    }
  }, [isOpen, userToEdit]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Formato de correo inválido';
    }

    if (!formData.role) newErrors.role = 'Debes seleccionar un rol';

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onCreate(formData);
      onClose();
      // Reset form
      setFormData({
        name: '',
        email: '',
        role: '',
        password: '',
        isActive: true
      });
      setErrors({});
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-8 pb-0">
          <div>
            <h2 className="text-2xl font-bold text-[#111118]">{userToEdit ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>
            <p className="text-gray-500 mt-1">{userToEdit ? 'Modifica los datos del usuario seleccionado.' : 'Completa los datos para registrar un nuevo integrante del equipo.'}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#00A76F] font-bold text-xs tracking-wider uppercase">
              <User size={16} />
              Información Personal
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Nombre Completo</label>
                <input 
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-[#00A76F] focus:ring-2 focus:ring-[#00A76F]/20 outline-none transition-all placeholder-gray-400 text-gray-800`}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                    if (errors.name) setErrors({...errors, name: ''});
                  }}
                  
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Correo Electrónico</label>
                <input 
                  type="email"
                  placeholder="juan@guarderia.com"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-[#00A76F] focus:ring-2 focus:ring-[#00A76F]/20 outline-none transition-all placeholder-gray-400 text-gray-800`}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    if (errors.email) setErrors({...errors, email: ''});
                  }}
                  
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* System Access Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#00A76F] font-bold text-xs tracking-wider uppercase">
              <Shield size={16} />
              Acceso al Sistema
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Rol asignado</label>
                <div className="relative">
                  <select 
                    className={`w-full px-4 py-3 rounded-xl border ${errors.role ? 'border-red-500' : 'border-gray-200'} focus:border-[#00A76F] focus:ring-2 focus:ring-[#00A76F]/20 outline-none transition-all appearance-none bg-white text-gray-800`}
                    value={formData.role}
                    onChange={(e) => {
                      setFormData({...formData, role: e.target.value});
                      if (errors.role) setErrors({...errors, role: ''});
                    }}
                    
                  >
                    <option value="" disabled>Seleccionar rol</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Editor Académico">Editor Académico</option>
                    <option value="Profesor">Profesor</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Contraseña Temporal</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:border-[#00A76F] focus:ring-2 focus:ring-[#00A76F]/20 outline-none transition-all placeholder-gray-400 text-gray-800`}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({...formData, password: e.target.value});
                      if (errors.password) setErrors({...errors, password: ''});
                    }}
                    
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
            </div>
          </div>

          {/* Status Switch */}
          <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between border border-gray-100 border-dashed">
            <div>
              <p className="text-sm font-bold text-gray-900">Estado Activo</p>
              <p className="text-xs text-gray-500">Permitir el acceso inmediato al sistema</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({...formData, isActive: !formData.isActive})}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#00A76F] focus:ring-offset-2 ${
                formData.isActive ? 'bg-[#00A76F]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  formData.isActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-gray-600 font-bold hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl bg-[#00A76F] text-white font-bold hover:bg-[#009462] transition-colors shadow-lg shadow-[#00A76F]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Guardando...' : (userToEdit ? 'Guardar Cambios' : 'Crear Usuario')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
