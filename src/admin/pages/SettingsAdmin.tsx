import { Settings } from 'lucide-react';

export default function SettingsAdmin() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111118]">Configuración</h1>
          <p className="text-gray-500 mt-1">Ajustes generales del sistema.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-gray-50 text-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Settings size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Módulo en Construcción</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Aquí podrás configurar parámetros globales de la aplicación.
        </p>
      </div>
    </div>
  );
}
