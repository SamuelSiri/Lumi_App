import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import negroLogo from '../../assets/images/logo_completo_negro-removebg-preview.png';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Conoce Lumi', href: '/about' },
  { label: 'Cómo Funciona', href: '/how' },
  { label: 'Docs', href: '/docs' },
  { label: 'Testimonios', href: '/testimonios' },
  { label: 'Contacto', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
        }}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 flex items-center justify-between h-24 lg:h-28">
          {/* Logo — large */}
          <Link to="/" className="relative z-10 shrink-0">
            <motion.img
              src={negroLogo}
              alt="Lumi"
              className="h-14 lg:h-[4.5rem] w-auto"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            />
          </Link>

          {/* Desktop links — black text */}
          <div className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={clsx(
                  'text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-300',
                  location.pathname === link.href
                    ? 'text-rosa'
                    : 'text-black/60 hover:text-rosa'
                )}
              >
                {link.label}
              </Link>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/login"
                className="ml-2 px-7 py-2.5 bg-rosa text-white text-[11px] font-bold uppercase tracking-[0.12em] rounded-full hover:bg-rosa-hover transition-colors duration-300"
              >
                Acceder
              </Link>
            </motion.div>
          </div>

          {/* Mobile hamburger — black */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-10 p-2"
            aria-label="Menú"
          >
            {mobileOpen ? <X size={26} className="text-black" /> : <Menu size={26} className="text-black" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-negro/95 backdrop-blur-2xl lg:hidden flex flex-col justify-center items-center"
          >
            <button onClick={() => setMobileOpen(false)} className="absolute top-7 right-6 text-white/60 hover:text-white text-3xl">&times;</button>
            <nav className="flex flex-col items-center gap-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      'text-3xl font-black uppercase tracking-tight transition-colors',
                      location.pathname === link.href ? 'text-rosa' : 'text-white hover:text-rosa'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }}>
                <Link to="/terms" onClick={() => setMobileOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-gris-500 mt-6 block">
                  Términos y Condiciones
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.4 }}>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="mt-4 px-10 py-4 bg-rosa text-white text-lg font-bold rounded-full hover:bg-rosa-hover transition-colors">
                  Acceder
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
