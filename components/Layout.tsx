import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  Heart, 
  User, 
  Database, 
  LogOut, 
  Search,
  Menu,
  X,
  Ghost,
  Sparkles
} from 'lucide-react';
import { currentUser } from '../services/mockData';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show layout on landing page
  if (location.pathname === '/') {
    return <>{children}</>;
  }

  const navItems = [
    { to: '/confessions', label: 'Confessions', icon: MessageSquare, count: '12' },
    { to: '/matching', label: 'Discover', icon: Search, count: null },
    { to: '/matches', label: 'Matches', icon: Heart, count: '3' },
    { to: '/profile', label: 'Profile', icon: User, count: null },
    { to: '/data', label: 'Sovereignty', icon: Database, count: null },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const NavContent = () => (
    <div className="flex flex-col h-full bg-white rounded-[2rem] p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-8 pl-2">
        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
          <Ghost size={24} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-mono font-bold text-lg leading-tight">NearClaw</h1>
          <div className="flex items-center gap-2 mt-1">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             <span className="text-xs font-mono text-zinc-500">ONLINE</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? 'bg-zinc-100 text-black font-bold shadow-sm'
                  : 'text-zinc-500 hover:bg-zinc-50 hover:text-black'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <item.icon size={20} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-sm">{item.label}</span>
                </div>
                {item.count && (
                  <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded-full ${
                    isActive ? 'bg-black text-white' : 'bg-zinc-200 text-zinc-600'
                  }`}>
                    {item.count}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-zinc-100">
        <div className="bg-zinc-50 p-4 rounded-2xl flex items-center gap-3 mb-3">
          <div className="relative">
            <img 
              src={currentUser.avatarUrl} 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-sm font-bold truncate">{currentUser.username}</p>
            <p className="text-xs text-zinc-400 font-mono truncate">ID: {currentUser.id}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-mono font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut size={16} />
          DISCONNECT
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-6 flex gap-6">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 sticky top-6 h-[calc(100vh-3rem)]">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-zinc-100 h-16 flex items-center justify-between px-4 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
            <Ghost size={16} />
          </div>
          <span className="font-mono font-bold">NearClaw</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-zinc-100 rounded-full text-zinc-900"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="absolute top-4 left-4 bottom-4 w-72"
            onClick={e => e.stopPropagation()}
          >
            <NavContent />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 pt-16 md:pt-0 min-w-0">
        <div className="max-w-4xl mx-auto h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;