import { useEffect } from 'react';

export interface ProgramDetail {
  id: number;
  title: string;
  age: string;
  image: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  description: string;
  fullDescription: string;
  methodology: string;
  includes: { icon: string; text: string }[];
}

interface ProgramModalProps {
  program: ProgramDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProgramModal({ program, isOpen, onClose }: ProgramModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !program) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-5 border-b border-gray-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <span className="material-symbols-outlined text-gray-500 text-xl">close</span>
          </button>

          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 flex items-center justify-center rounded-2xl ${program.iconBg} ${program.iconColor} shrink-0`}>
              <span className="material-symbols-outlined text-3xl">{program.icon}</span>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[#111118] tracking-tight">{program.title}</h2>
              <p className="text-sm font-semibold text-[#5f5f8c] uppercase tracking-wide mt-0.5">{program.age}</p>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Description */}
          <div>
            <p className="text-[#111118] text-base leading-relaxed text-justify">
              {program.fullDescription}
            </p>
          </div>

          {/* Methodology */}
          <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-xl">auto_stories</span>
              <h3 className="font-bold text-[#111118] text-sm uppercase tracking-wide">Metodología</h3>
            </div>
            <p className="text-[#5f5f8c] text-sm leading-relaxed text-justify">
              {program.methodology}
            </p>
          </div>

          {/* What's Included */}
          <div>
            <h3 className="font-bold text-[#111118] text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">checklist</span>
              Qué incluye este programa
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {program.includes.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100"
                >
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                    <span className="material-symbols-outlined text-primary text-lg">{item.icon}</span>
                  </div>
                  <p className="text-sm text-[#111118] font-medium leading-snug pt-1">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
