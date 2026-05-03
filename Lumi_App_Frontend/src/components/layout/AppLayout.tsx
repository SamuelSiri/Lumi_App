import { Link, Outlet } from 'react-router-dom';
import FloatingNav from './FloatingNav';
import rosaLogo from '../../assets/images/rosa_vivido_logo_completo-removebg-preview.png';
import rosaIcon from '../../assets/images/rosa_vivido_icon-removebg-preview.png';

export default function AppLayout() {
  return (
    <div className="min-h-screen" style={{ background: '#fafafa' }}>
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b" style={{ borderColor: '#0a0a1233' }}>
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={rosaLogo} alt="LUMI" className="h-8 w-auto" />
          </div>
          <div className="flex items-center gap-3">
            {/* LUMI status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: '#22C55E10' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: '#22C55E', animation: 'pulse-soft 2s ease-in-out infinite' }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: '#22C55E' }}>En línea</span>
            </div>
            {/* User → Perfil */}
            <Link to="/app/perfil" className="flex items-center gap-2.5 group">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-black uppercase tracking-[0.15em] transition-colors duration-200 group-hover:text-rosa" style={{ color: '#0a0a12' }}>Demo Emprendimiento</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: '#8a8a8a' }}>Administrador</p>
              </div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[10px] font-black tracking-wider transition-transform duration-200 group-hover:scale-110" style={{ background: '#FD4282', boxShadow: '0 4px 12px rgba(253,66,130,0.3)' }}>
                DE
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* LUMI assistant floating indicator */}
      <div className="fixed top-20 right-4 z-30 hidden lg:block">
        <div className="relative">
          <img src={rosaIcon} alt="LUMI" className="w-12 h-auto opacity-80" style={{ animation: 'float 5s ease-in-out infinite', filter: 'drop-shadow(0 4px 12px rgba(253,66,130,0.2))' }} />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white" style={{ background: '#22C55E' }} />
        </div>
      </div>

      <main className="w-full px-4 sm:px-6 lg:px-8 py-6 pb-28">
        <Outlet />
      </main>

      <FloatingNav />
    </div>
  );
}
