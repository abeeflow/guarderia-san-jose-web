import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  Calendar, 
  Users, 
  LogOut, 
  Menu, 
  Settings,
  User,
  X,
  Building2,
  Home
} from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const mainNavItems = [
    { path: '/admin/dashboard', icon: Home, label: 'Inicio' },
    { path: '/admin/events', icon: Calendar, label: 'Eventos' },
    { path: '/admin/users', icon: Users, label: 'Usuarios' },
    { path: '/admin/teachers', icon: User, label: 'Maestros' },
    { path: '/admin/installations', icon: Building2, label: 'Fotos Instalaciones' },
    // { path: '/admin/kids', icon: Baby, label: 'Niños' },
    // { path: '/admin/groups', icon: UsersRound, label: 'Grupos' },
  ];

  const secondaryNavItems = [
    { path: '/admin/settings', icon: Settings, label: 'Configuración' },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`bg-[#0F172A] text-white transition-all duration-300 flex flex-col fixed h-full z-30 md:relative
          ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64 md:translate-x-0 md:w-20'}
        `}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <div className={`flex items-center gap-3 ${!isSidebarOpen && 'hidden'}`}>
             <div className="w-10 h-10 bg-white rounded-lg p-1 flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="San José" className="w-full h-full object-contain" />
             </div>
             <div className="flex flex-col">
                <h1 className="font-bold text-sm text-white leading-tight">Guardería Jardín</h1>
                <span className="text-xs text-blue-200">Bilingüe San José</span>
             </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/10 text-gray-400 rounded-lg md:hidden"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-xl transition-all font-medium text-sm ${
                    isActive 
                      ? 'bg-[#1E1B4B] text-white shadow-lg shadow-[#1E1B4B]/20' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    <span className={`${!isSidebarOpen && 'hidden'}`}>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Section Divider */}
          <div className={`mt-8 mb-2 px-3 ${!isSidebarOpen && 'hidden'}`}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Administración</p>
          </div>

          <nav className="space-y-1">
            {secondaryNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-xl transition-all font-medium text-sm ${
                    isActive 
                      ? 'bg-[#1E1B4B] text-white shadow-lg shadow-[#1E1B4B]/20' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    <span className={`${!isSidebarOpen && 'hidden'}`}>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Profile (Bottom) */}
        <div className="p-4 border-t border-white/10">
          <div className={`flex items-center gap-3 ${!isSidebarOpen ? 'justify-center' : ''}`}>
            <div className="relative">
               <div className="w-10 h-10 rounded-full bg-[#FFD8A8] flex items-center justify-center text-[#FF922B] font-bold">
                  AP
               </div>
               <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0F172A] rounded-full"></span>
            </div>
            
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">Admin Principal</p>
                <p className="text-xs text-gray-400 truncate">admin@educare.com</p>
              </div>
            )}
            {isSidebarOpen && (
              <button 
                onClick={handleLogout}
                className="text-gray-400 hover:text-white transition-colors"
                title="Cerrar Sesión"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        
        {/* Top Bar */}
        <header className="h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white shrink-0 z-20">
          {/* Search Removed */}
          <div className="flex-1"></div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            {/* Removed Bell and Action Button per request */}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8 bg-[#FAFAFA]">
           {/* Mobile Menu Toggle */}
           <div className="md:hidden mb-4">
             <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 bg-white rounded-lg shadow-sm border"
              >
                <Menu size={20} />
              </button>
           </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
