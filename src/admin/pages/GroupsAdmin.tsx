import { UsersRound } from 'lucide-react';

export default function GroupsAdmin() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111118]">Gestión de Grupos</h1>
          <p className="text-gray-500 mt-1">Organiza las clases y grupos de edad.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#00A76F] text-white font-semibold rounded-lg hover:bg-[#009462] transition-colors shadow-sm">
          <UsersRound size={20} />
          <span>Nuevo Grupo</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <UsersRound size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Módulo en Construcción</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Próximamente podrás crear y asignar grupos para organizar mejor a los estudiantes y maestros.
        </p>
      </div>
    </div>
  );
}
