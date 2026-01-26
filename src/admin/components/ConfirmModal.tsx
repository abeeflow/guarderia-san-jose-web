import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning';
}

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Eliminar',
  cancelText = 'Cancelar',
  type = 'danger'
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Icon */}
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm ${
          type === 'danger' ? 'bg-red-50 text-red-500' : 'bg-yellow-50 text-yellow-500'
        }`}>
          <AlertTriangle size={40} strokeWidth={3} />
        </div>

        {/* Content */}
        <h3 className="text-xl font-black text-[#1E1B4B] mb-3">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 px-2">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95 ${
               type === 'danger' 
                  ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' 
                  : 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/20'
            }`}
          >
            {confirmText}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
           <div className="w-2 h-2 bg-gray-300 rounded-sm"></div>
           EDUCARE SYSTEM
        </div>
      </div>
    </div>
  );
}
