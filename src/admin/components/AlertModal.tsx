import { Check, X, AlertTriangle } from 'lucide-react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning';
}

export default function AlertModal({ isOpen, onClose, title, message, type }: AlertModalProps) {
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
          type === 'success' ? 'bg-green-50 text-green-500' :
          type === 'error' ? 'bg-red-50 text-red-500' :
          'bg-yellow-50 text-yellow-500'
        }`}>
          {type === 'success' && (
            <div className="relative">
                <div className="absolute inset-0 bg-green-200 rounded-full opacity-20 animate-ping"></div>
                <Check size={40} strokeWidth={3} />
            </div>
          )}
          {type === 'error' && <X size={40} strokeWidth={3} />}
          {type === 'warning' && <AlertTriangle size={40} strokeWidth={3} />}
        </div>

        {/* Content */}
        <h3 className="text-xl font-black text-[#1E1B4B] mb-3">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 px-2">
          {message}
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95 ${
             type === 'error' 
                ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' 
                : 'bg-[#2563EB] hover:bg-[#1d4ed8] shadow-blue-500/20'
          }`}
        >
          Continuar
        </button>

        {/* Footer */}
        <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
           <div className="w-2 h-2 bg-gray-300 rounded-sm"></div>
           EDUCARE SYSTEM
        </div>
      </div>
    </div>
  );
}
