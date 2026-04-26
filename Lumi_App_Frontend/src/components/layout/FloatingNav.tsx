import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Heart, Calendar, Bell,
  Settings, Users, LogOut,
} from 'lucide-react';
import rosaIcon from '../../assets/images/rosa_vivido_icon-removebg-preview.png';

const items = [
  { icon: LayoutDashboard, to: '/app', label: 'Panel' },
  { icon: Heart, to: '/app/cuidado', label: 'Cuidado' },
  { icon: Calendar, to: '/app/calendario', label: 'Calendario' },
  { icon: Bell, to: '/app/alertas', label: 'Alertas' },
  { icon: Settings, to: '/app/dispositivo', label: 'Dispositivo' },
  { icon: Users, to: '/app/familia', label: 'Familia' },
];

const rosa = '#FD4282';

export default function FloatingNav() {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 22 }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-0.5 px-3 py-2.5 rounded-2xl bg-white/90 backdrop-blur-xl border" style={{ borderColor: '#0a0a1233', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
        {/* LUMI mascot */}
        <div className="hidden sm:flex items-center px-2 mr-1.5 border-r" style={{ borderColor: '#0a0a1233' }}>
          <img src={rosaIcon} alt="LUMI" className="w-7 h-auto" />
        </div>

        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/app'}
              className={({ isActive }) =>
                `group relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'hover:bg-black/[0.03]'
                }`
              }
              style={({ isActive }) => isActive ? { background: rosa, boxShadow: `0 4px 16px ${rosa}30` } : { color: '#737373' }}
            >
              <Icon size={17} />
              <span className="hidden lg:inline">{item.label}</span>
            </NavLink>
          );
        })}

        <div className="pl-1 ml-0.5 border-l" style={{ borderColor: '#0a0a1233' }}>
          <button
            onClick={() => navigate('/login')}
            className="flex items-center px-3 py-2 rounded-xl transition-all duration-200"
            style={{ color: '#a3a3a3' }}
            onMouseEnter={e => { e.currentTarget.style.color = rosa; e.currentTarget.style.background = `${rosa}08`; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#a3a3a3'; e.currentTarget.style.background = 'transparent'; }}
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
