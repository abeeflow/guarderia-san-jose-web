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
        <h1 className="text-3xl font-serif text-[#111118] mb-1">Bienvenido</h1>
        <p className="text-gray-500 text-sm"></p>
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

      

      {/* Learning Center Banner */}
      
    </div>
  );
}
