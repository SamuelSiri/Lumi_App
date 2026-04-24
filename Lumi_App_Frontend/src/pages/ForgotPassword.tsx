import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, KeyRound, Shield, Heart } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import rosaIcon from '../assets/images/rosa_vivido_icon-removebg-preview.png';
import pastelIcon from '../assets/images/rosapastelicon-removebg-preview.png';
import rosaLogo from '../assets/images/rosa_vivido_logo_completo-removebg-preview.png';

/* ── Brand palette ── */
const P = {
  pink: '#FF2D78',
  pinkLight: '#FF6BA8',
  pinkSoft: '#FFF0F5',
  pinkGlow: 'rgba(255,45,120,0.15)',
  green: '#00E676',
  dark: '#0D0D0D',
  white: '#ffffff',
  textMuted: '#64748B',
  border: '#E2E8F0',
  bgPage: '#FFF5F8',
};

const ease = [0.23, 1, 0.32, 1] as const;

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setIsSent(true); }, 1200);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: P.bgPage }}>
      <Navbar />

      {/* ═══ Background decoration ═══ */}

      {/* Large blurred pink blob top-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400, height: 400, top: '-5%', right: '-5%',
          background: `radial-gradient(circle, ${P.pink}, transparent)`,
          opacity: 0.08, filter: 'blur(60px)',
        }}
      />

      {/* Mirror blob bottom-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 300, height: 300, bottom: '-5%', left: '-5%',
          background: `radial-gradient(circle, ${P.pink}, transparent)`,
          opacity: 0.06, filter: 'blur(60px)',
        }}
      />

      {/* Floating CSS blobs */}
      <div className="absolute pointer-events-none" style={{ width: 100, height: 80, background: `${P.pink}08`, borderRadius: '60% 40% 70% 30%', top: '15%', left: '8%', animation: 'auth-blob-drift-1 12s ease-in-out infinite' }} />
      <div className="absolute pointer-events-none" style={{ width: 70, height: 70, background: 'transparent', borderRadius: '50%', bottom: '25%', right: '12%', border: `1.5px solid ${P.pink}15`, animation: 'auth-blob-drift-2 10s ease-in-out infinite' }} />
      <div className="absolute pointer-events-none" style={{ width: 60, height: 50, background: `${P.pink}06`, borderRadius: '40% 60% 30% 70%', top: '60%', left: '15%', animation: 'auth-blob-drift-3 14s ease-in-out infinite' }} />
      <div className="absolute pointer-events-none" style={{ width: 50, height: 50, background: 'transparent', borderRadius: '50%', top: '30%', right: '20%', border: `1px solid ${P.pink}12`, animation: 'auth-blob-drift-4 9s ease-in-out infinite' }} />

      {/* Tiny ✦ symbols */}
      {['12%,20%', '75%,15%', '25%,75%', '80%,65%', '50%,10%'].map((pos, i) => {
        const [t, l] = pos.split(',');
        return (
          <span key={i} className="absolute pointer-events-none select-none" style={{ top: t, left: l, fontSize: 10 + i, color: P.pink, opacity: 0.06 + i * 0.015, animation: `auth-blob-drift-${(i % 4) + 1} ${10 + i * 2}s ease-in-out infinite` }}>✦</span>
        );
      })}

      {/* Ghost mascot outlines */}
      <motion.img
        src={rosaIcon} alt=""
        className="absolute pointer-events-none select-none hidden lg:block"
        initial={{ opacity: 0 }} animate={{ opacity: 0.04 }} transition={{ delay: 0.8 }}
        style={{ width: 160, right: '8%', top: '18%', animation: 'auth-blob-drift-1 8s ease-in-out infinite' }}
      />
      <motion.img
        src={pastelIcon} alt=""
        className="absolute pointer-events-none select-none hidden lg:block"
        initial={{ opacity: 0 }} animate={{ opacity: 0.035 }} transition={{ delay: 1.1 }}
        style={{ width: 110, left: '10%', bottom: '15%', animation: 'auth-blob-drift-2 10s ease-in-out 1s infinite' }}
      />

      {/* Floating icons */}
      <motion.div className="absolute pointer-events-none hidden lg:block" initial={{ opacity: 0 }} animate={{ opacity: 0.06 }} transition={{ delay: 1.2 }} style={{ top: '25%', left: '18%', animation: 'auth-blob-drift-3 8s ease-in-out infinite' }}>
        <KeyRound size={22} style={{ color: P.pink }} />
      </motion.div>
      <motion.div className="absolute pointer-events-none hidden lg:block" initial={{ opacity: 0 }} animate={{ opacity: 0.05 }} transition={{ delay: 1.4 }} style={{ bottom: '30%', right: '15%', animation: 'auth-blob-drift-1 9s ease-in-out 2s infinite' }}>
        <Shield size={20} style={{ color: P.pink }} />
      </motion.div>
      <motion.div className="absolute pointer-events-none hidden lg:block" initial={{ opacity: 0 }} animate={{ opacity: 0.04 }} transition={{ delay: 1.6 }} style={{ top: '55%', right: '30%', animation: 'auth-blob-drift-4 7s ease-in-out 1s infinite' }}>
        <Heart size={16} style={{ color: P.pink }} />
      </motion.div>

      {/* Noise */}
      <div className="noise absolute inset-0 pointer-events-none" />

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-28 pb-12 lg:pt-0">
        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.6, ease }}
              className="w-full max-w-md"
            >
              {/* Logo */}
              <motion.div
                className="flex justify-center mb-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease }}
              >
                <img src={rosaLogo} alt="LUMI" className="h-12 w-auto" />
              </motion.div>

              {/* Card */}
              <motion.div
                className="rounded-3xl p-8 lg:p-10 space-y-6"
                style={{
                  background: P.white,
                  boxShadow: `0 8px 40px rgba(255,45,120,0.08), 0 2px 8px rgba(0,0,0,0.04)`,
                  borderTop: `3px solid ${P.pink}`,
                  borderRadius: 24,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease }}
              >
                {/* Back link */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 group"
                    style={{ color: P.textMuted }}
                    onMouseEnter={e => { e.currentTarget.style.color = P.pink; }}
                    onMouseLeave={e => { e.currentTarget.style.color = P.textMuted; }}
                  >
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                    Volver al login
                  </Link>
                </motion.div>

                <div className="text-center">
                  {/* Key icon with swing */}
                  <motion.div
                    className="flex justify-center mb-5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.45, type: 'spring', stiffness: 200 }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `${P.pink}10`,
                        animation: 'auth-swing 2s ease-in-out infinite',
                      }}
                    >
                      <KeyRound size={28} style={{ color: P.pink }} />
                    </div>
                  </motion.div>

                  {/* Title with clip reveal */}
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.01 }}
                    style={{
                      fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 900, lineHeight: 0.95,
                      letterSpacing: '-0.03em', textTransform: 'uppercase', color: P.dark,
                      animation: mounted ? 'auth-clip-reveal 0.8s cubic-bezier(0.23,1,0.32,1) 0.5s both' : 'none',
                    }}
                  >
                    Recupera tu{' '}
                    <span className="italic" style={{ fontWeight: 400, color: P.pink }}>acceso</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: P.textMuted }}
                  >
                    Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña de forma segura.
                  </motion.p>

                  {/* Green accent line */}
                  <div className="flex justify-center mt-4">
                    <div
                      className="h-0.5 rounded-full"
                      style={{
                        background: P.green,
                        animation: mounted ? 'auth-grow-line 0.6s ease-out 0.9s both' : 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Form */}
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <div>
                    <label
                      className="block text-[11px] font-semibold uppercase tracking-[0.08em] mb-2 transition-colors duration-200"
                      style={{ color: focusedField === 'email' ? P.pink : P.textMuted }}
                    >
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full px-5 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{
                        background: `${P.dark}05`,
                        border: `1.5px solid ${focusedField === 'email' ? P.pink : `${P.dark}10`}`,
                        color: P.dark,
                        boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(255,45,120,0.12)' : 'none',
                      }}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed"
                    style={{
                      background: P.pink,
                      color: P.white,
                      boxShadow: `0 0 30px ${P.pink}25`,
                    }}
                    onMouseEnter={e => { if (!isLoading) { e.currentTarget.style.boxShadow = `0 0 50px ${P.pink}40`; e.currentTarget.style.transform = 'scale(1.02)'; } }}
                    onMouseLeave={e => { if (!isLoading) { e.currentTarget.style.boxShadow = `0 0 30px ${P.pink}25`; e.currentTarget.style.transform = 'scale(1)'; } }}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      </span>
                    ) : (
                      'Enviar instrucciones'
                    )}
                  </button>
                </motion.form>

                <motion.p
                  className="text-center text-sm"
                  style={{ color: P.textMuted }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85 }}
                >
                  ¿Recordaste tu contraseña?{' '}
                  <Link to="/login" className="font-bold" style={{ color: P.pink }}>Inicia sesión</Link>
                </motion.p>
              </motion.div>
            </motion.div>
          ) : (
            /* ═══ SUCCESS STATE ═══ */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="w-full max-w-md"
            >
              <motion.div
                className="flex justify-center mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <img src={rosaLogo} alt="LUMI" className="h-12 w-auto" />
              </motion.div>

              <div
                className="rounded-3xl p-8 lg:p-10 text-center"
                style={{
                  background: P.white,
                  boxShadow: `0 8px 40px rgba(255,45,120,0.08), 0 2px 8px rgba(0,0,0,0.04)`,
                  borderTop: `3px solid ${P.green}`,
                  borderRadius: 24,
                }}
              >
                <motion.div
                  className="flex justify-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{ background: `${P.green}12`, boxShadow: `0 0 40px ${P.green}15` }}
                  >
                    <CheckCircle className="w-10 h-10" style={{ color: P.green }} />
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', textTransform: 'uppercase', color: P.dark }}
                >
                  Revisa tu{' '}
                  <span className="italic" style={{ fontWeight: 400, color: P.pink }}>correo</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 text-sm leading-relaxed"
                  style={{ color: P.textMuted }}
                >
                  Enviamos instrucciones de recuperación a{' '}
                  <span className="font-bold" style={{ color: P.dark }}>{email}</span>.
                  Si no lo encuentras, revisa la carpeta de correo no deseado.
                </motion.p>

                <motion.div className="flex justify-center my-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <div className="h-0.5 w-12 rounded-full" style={{ background: P.green }} />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                  <Link
                    to="/verificar"
                    className="inline-flex w-full justify-center py-4 rounded-xl text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300"
                    style={{ background: P.pink, color: P.white, boxShadow: `0 0 30px ${P.pink}25` }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 50px ${P.pink}40`; e.currentTarget.style.transform = 'scale(1.02)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 30px ${P.pink}25`; e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    Ingresar código
                  </Link>
                </motion.div>

                <motion.div className="mt-6 space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                  <button
                    type="button"
                    onClick={() => setIsSent(false)}
                    className="text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-200"
                    style={{ color: P.textMuted }}
                    onMouseEnter={e => { e.currentTarget.style.color = P.pink; }}
                    onMouseLeave={e => { e.currentTarget.style.color = P.textMuted; }}
                  >
                    ¿No recibiste el correo? Intentar de nuevo
                  </button>
                  <p className="text-sm">
                    <Link to="/login" className="font-bold" style={{ color: P.pink }}>Volver al inicio</Link>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
