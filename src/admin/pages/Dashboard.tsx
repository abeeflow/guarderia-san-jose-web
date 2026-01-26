import { 
  UserPlus, 
  CheckCircle2, 
  Send, 
  Plus, 
  Shield, 
  Edit2, 
  Trash2, 
  PlayCircle,
  ArrowRight,
  Download
} from 'lucide-react';
import { OptimizedImage } from '../../components/OptimizedImage';

export default function Dashboard() {
  // Mock data
  const users = [
    { 
      id: 1, 
      name: 'Admin Principal', 
      email: 'admin@guarderia.com', 
      role: 'Administrador', 
      roleIcon: Shield,
      status: 'Activo',
      statusColor: 'bg-[#EBFDF5] text-[#00A76F]',
      image: 'https://i.pravatar.cc/150?img=11'
    },
    { 
      id: 2, 
      name: 'Directora Académica', 
      email: 'directora@guarderia.com', 
      role: 'Editor Académico', 
      roleIcon: Edit2,
      status: 'Activo',
      statusColor: 'bg-[#EBFDF5] text-[#00A76F]',
      image: 'https://i.pravatar.cc/150?img=5'
    },
    { 
      id: 3, 
      name: 'Profesor Juan', 
      email: 'juan.prof@guarderia.com', 
      role: 'Profesor', 
      roleIcon: Shield, // Using Shield as generic role icon placeholder if specific icon not needed
      status: 'Inactivo',
      statusColor: 'bg-gray-100 text-gray-500',
      image: 'https://i.pravatar.cc/150?img=3'
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-serif text-[#111118] mb-1">Bienvenido, Administrador</h1>
        <p className="text-gray-500 text-sm">Resumen de la actividad diaria y gestión de la comunidad escolar.</p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Register Child */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-[#EBFDF5] p-3 rounded-lg text-[#00A76F]">
              <UserPlus size={24} />
            </div>
          </div>
          <h3 className="text-lg font-bold text-[#111118] mb-2">Registrar Niño</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Alta de nuevos alumnos en la base de datos.
          </p>
          <a href="#" className="flex items-center gap-2 text-[#00A76F] text-xs font-bold tracking-wider hover:gap-3 transition-all">
            COMENZAR <ArrowRight size={14} />
          </a>
        </div>

        {/* Card 2: Attendance */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-gray-50 p-3 rounded-lg text-gray-600">
              <CheckCircle2 size={24} />
            </div>
          </div>
          <h3 className="text-lg font-bold text-[#111118] mb-2">Pasar Asistencia</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Control diario de presencia por grupos.
          </p>
          <a href="#" className="flex items-center gap-2 text-[#111118] text-xs font-bold tracking-wider hover:gap-3 transition-all">
            ABRIR PLANILLA <ArrowRight size={14} />
          </a>
        </div>

        {/* Card 3: Communication */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-gray-50 p-3 rounded-lg text-gray-600">
              <Send size={24} />
            </div>
          </div>
          <h3 className="text-lg font-bold text-[#111118] mb-2">Comunicación</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Enviar notificaciones y avisos a padres.
          </p>
          <a href="#" className="flex items-center gap-2 text-[#111118] text-xs font-bold tracking-wider hover:gap-3 transition-all">
            REDACTAR <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Users Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#111118]">Gestión de Usuarios</h2>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
               <Download size={16} />
               Exportar
             </button>
             <button className="flex items-center gap-2 bg-[#111118] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-900 transition-colors shadow-lg shadow-gray-200">
               <Plus size={18} />
               Nuevo Usuario
             </button>
          </div>
        </div>

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
                          <OptimizedImage 
                            src={user.image} 
                            alt={user.name} 
                            className="w-10 h-10 rounded-lg overflow-hidden" 
                            imageClassName="object-cover"
                          />
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                           <p className="text-xs text-gray-500">{user.email}</p>
                         </div>
                       </div>
                     </td>
                     <td className="py-5 px-6">
                       <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                         <Shield size={16} className="text-gray-500" />
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
                       <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="text-gray-400 hover:text-gray-600 transition-colors">
                           <Edit2 size={18} />
                         </button>
                         <button className="text-gray-400 hover:text-red-500 transition-colors">
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
      </div>

      {/* Learning Center Banner */}
      <div className="bg-[#111118] rounded-2xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gray-700 rounded-full mix-blend-overlay filter blur-2xl opacity-20 translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="relative z-10 text-center md:text-left">
          <h2 className="text-2xl font-serif text-white mb-2">Centro de Aprendizaje</h2>
          <p className="text-gray-400 text-sm max-w-md">
            Tutoriales rápidos para dominar la administración de su centro y aprovechar al máximo EduCare.
          </p>
        </div>
        
        <button className="relative z-10 bg-white text-[#111118] px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg whitespace-nowrap">
          <PlayCircle size={18} />
          Ver Videotutoriales
        </button>
      </div>
    </div>
  );
}
