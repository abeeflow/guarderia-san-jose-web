import { Baby } from 'lucide-react';

export default function KidsAdmin() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111118]">Gestión de Niños</h1>
          <p className="text-gray-500 mt-1">Administra los perfiles de los estudiantes.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#00A76F] text-white font-semibold rounded-lg hover:bg-[#009462] transition-colors shadow-sm">
          <Baby size={20} />
          <span>Nuevo Estudiante</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Baby size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Módulo en Construcción</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Próximamente podrás gestionar aquí la información de todos los niños inscritos en la guardería.
        </p>
      </div>
    </div>
  );
}
