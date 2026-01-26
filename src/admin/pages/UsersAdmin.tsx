import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Shield, User as UserIcon, type LucideIcon } from 'lucide-react';
import CreateUserModal, { type UserFormData } from '../components/CreateUserModal';
import AlertModal from '../components/AlertModal';
import ConfirmModal from '../components/ConfirmModal';
import { supabase } from '../../lib/supabase';

interface DBUser {
  id: number;
  name: string;
  email: string;
  role: string;
  estado: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  estado: boolean;
  roleIcon: LucideIcon;
  status: string;
  statusColor: string;
}

export default function UsersAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
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

  const showAlert = (type: 'success' | 'error' | 'warning', title: string, message: string, onClose?: () => void) => {
    setAlertConfig({
      isOpen: true,
      type,
      title,
      message,
      onClose
    });
  };

  // Fetch users from Supabase
  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedUsers: User[] = data.map((user: DBUser) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          estado: user.estado,
          roleIcon: user.role === 'Administrador' ? Shield : (user.role === 'Editor Académico' ? Edit2 : UserIcon),
          status: user.estado ? 'Activo' : 'Inactivo',
          statusColor: user.estado ? 'bg-[#EBFDF5] text-[#00A76F]' : 'bg-gray-100 text-gray-500',
        }));
        setUsers(mappedUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSaveUser = async (userData: UserFormData) => {
    try {
      if (userToEdit) {
        // Update existing user
        const { error } = await supabase
          .from('users')
          .update({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: userData.role,
            estado: userData.isActive
          })
          .eq('id', userToEdit.id);

        if (error) throw error;
        showAlert('success', '¡Usuario Actualizado!', 'Los datos del usuario han sido actualizados correctamente.');
      } else {
        // Create new user
        const { error } = await supabase
          .from('users')
          .insert([
            {
              name: userData.name,
              email: userData.email,
              password: userData.password, // Note: In a real app, hash this password!
              role: userData.role,
              estado: userData.isActive,
              created_at: new Date().toISOString()
            }
          ]);

        if (error) throw error;
        showAlert('success', '¡Usuario Creado!', 'El nuevo usuario ha sido registrado correctamente en el sistema.');
      }
      
      // Refresh list
      await fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      showAlert('error', '¡Error!', 'Error al guardar usuario. Por favor intente nuevamente.');
      throw error; // Propagate error to modal
    }
  };

  const confirmDeleteUser = (id: number) => {
    setConfirmConfig({
      isOpen: true,
      title: '¿Eliminar Usuario?',
      message: 'Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este usuario permanentemente?',
      onConfirm: () => handleDeleteUser(id)
    });
  };

  const handleDeleteUser = async (id: number) => {
    try {
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);

        if (error) throw error;
        
        await fetchUsers();
        showAlert('success', '¡Usuario Eliminado!', 'El usuario ha sido eliminado correctamente del sistema.');
    } catch (error) {
        console.error('Error deleting user:', error);
        showAlert('error', '¡Error!', 'Error al eliminar usuario. Por favor intente nuevamente.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
         <h1 className="text-2xl font-bold text-[#111118]">Gestión de Usuarios</h1>
         <div className="flex items-center gap-3">
           <button 
            onClick={() => {
              setUserToEdit(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-[#111118] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-900 transition-colors shadow-lg shadow-gray-200"
          >
             <Plus size={18} />
             Nuevo Usuario
           </button>
         </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
             <thead className="bg-gray-50/30 border-b border-gray-100">
               <tr>
                 <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-[40%]">Usuario</th>
                 <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-[25%]">Rol</th>
                 <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-[15%]">Estado</th>
                 <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right w-[20%]">Acciones</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
               {users.map((user) => (
                 <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                   <td className="py-5 px-6">
                     <div className="flex items-center gap-4">
                       <div>
                         <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                         <p className="text-xs text-gray-500">{user.email}</p>
                       </div>
                     </div>
                   </td>
                   <td className="py-5 px-6">
                     <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                      {(() => {
                        const RoleIcon = user.roleIcon;
                        return <RoleIcon size={16} className="text-gray-500" />;
                      })()}
                      {user.role}
                    </div>
                   </td>
                   <td className="py-5 px-6">
                     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${user.statusColor}`}>
                       <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                       {user.status}
                     </span>
                   </td>
                   <td className="py-5 px-6 text-right">
                     <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => {
                          setUserToEdit(user);
                          setIsModalOpen(true);
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => confirmDeleteUser(user.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      </div>

      <CreateUserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleSaveUser}
        userToEdit={userToEdit || undefined}
      />
      
      <ConfirmModal 
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmConfig.onConfirm}
        title={confirmConfig.title}
        message={confirmConfig.message}
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
    </div>
  );
}
