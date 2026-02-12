import { 
  UserPlus, 
  CheckCircle2, 
  Send, 
  ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-serif text-[#111118] mb-1">Bienvenido</h1>
        <p className="text-gray-500 text-sm">Panel de administración general.</p>
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
