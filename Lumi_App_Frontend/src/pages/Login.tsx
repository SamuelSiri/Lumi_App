import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, Heart, Lock } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import rosaIcon from '../assets/images/rosa_vivido_icon-removebg-preview.png';
import rosaLogo from '../assets/images/rosa_vivido_logo_completo-removebg-preview.png';

/* ── Brand palette ── */
const P = {
  pink: '#FF2D78',
  pinkLight: '#FF6BA8',
  pinkSoft: '#FFF0F5',
  pinkGlow: 'rgba(255,45,120,0.15)',
  green: '#00E676',
  dark: '#0D0D0D',
  gray: '#F5F5F5',
  white: '#ffffff',
  cream: '#F5F0EB',
  textMuted: '#64748B',
  border: '#E2E8F0',
};

/* ── Floating blobs data (CSS shapes, no images) ── */
const blobs = [
  { w: 120, h: 100, bg: `${P.pink}12`, radius: '60% 40% 70% 30%', top: '8%', left: '6%', anim: 'auth-blob-drift-1 12s ease-in-out infinite' },
  { w: 80, h: 80, bg: 'transparent', radius: '50%', top: '22%', right: '10%', anim: 'auth-blob-drift-2 15s ease-in-out infinite', border: `1.5px solid ${P.pink}20` },
  { w: 60, h: 50, bg: `${P.pink}08`, radius: '40% 60% 30% 70%', bottom: '18%', right: '15%', anim: 'auth-blob-drift-3 10s ease-in-out infinite' },
  { w: 90, h: 75, bg: `${P.pink}10`, radius: '70% 30% 50% 50%', bottom: '30%', left: '10%', anim: 'auth-blob-drift-4 14s ease-in-out infinite' },
  { w: 45, h: 45, bg: 'transparent', radius: '50%', top: '55%', left: '25%', anim: 'auth-blob-drift-2 8s ease-in-out infinite', border: `1px solid ${P.pink}15` },
];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => navigate('/app'), 600);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: P.white }}>
      <Navbar />

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* ═══════════════ LEFT — Brand panel ═══════════════ */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="relative lg:w-[48%] w-full lg:min-h-screen hidden lg:flex items-center justify-center py-20 lg:py-0 px-8 overflow-hidden"
          style={{ background: P.cream }}
        >
          {/* Noise overlay */}
          <div className="absolute inset-0 pointer-events-none" />

          {/* Floating CSS blobs */}
          {blobs.map((b, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                width: b.w,
                height: b.h,
                background: b.bg,
                borderRadius: b.radius,
                border: b.border || 'none',
                top: b.top,
                left: b.left,
                right: b.right,
                bottom: b.bottom,
                animation: b.anim,
              }}
            />
          ))}

          {/* Tiny ✦ symbols */}
          {['12%,8%', '75%,20%', '30%,85%', '85%,70%'].map((pos, i) => {
            const [t, l] = pos.split(',');
            return (
              <span
                key={`star-${i}`}
                className="absolute pointer-events-none select-none"
                style={{ top: t, left: l, fontSize: 10 + i * 2, color: P.pink, opacity: 0.08 + i * 0.02, animation: `auth-blob-drift-${(i % 4) + 1} ${10 + i * 3}s ease-in-out infinite` }}
              >
                ✦
              </span>
            );
          })}

          {/* Scattered icons */}
          <motion.div
            className="absolute pointer-events-none"
            style={{ top: '18%', right: '18%', animation: 'auth-blob-drift-1 8s ease-in-out infinite' }}
            initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} transition={{ delay: 1 }}
          >
            <Lock size={22} style={{ color: P.pink }} />
          </motion.div>
          <motion.div
            className="absolute pointer-events-none"
            style={{ bottom: '25%', left: '18%', animation: 'auth-blob-drift-2 9s ease-in-out 1s infinite' }}
            initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} transition={{ delay: 1.3 }}
          >
            <Heart size={20} style={{ color: P.pink }} />
          </motion.div>
          <motion.div
            className="absolute pointer-events-none"
            style={{ top: '60%', right: '25%', animation: 'auth-blob-drift-3 7s ease-in-out 2s infinite' }}
            initial={{ opacity: 0 }} animate={{ opacity: 0.07 }} transition={{ delay: 1.5 }}
          >
            <Shield size={18} style={{ color: P.pink }} />
          </motion.div>

          {/* Editorial label */}
          <span
            className="absolute top-[10%] left-[8%] pointer-events-none select-none"
            style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: P.dark, opacity: 0.08 }}
          >
            ✦ LUMI
          </span>

          {/* Thin diagonal line */}
          <div
            className="absolute pointer-events-none"
            style={{ width: 120, height: 2, background: `${P.pink}15`, top: '15%', right: '5%', transform: 'rotate(45deg)' }}
          />

          {/* ── Center content ── */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
            {/* Mascot with glow */}
            <motion.div
              className="relative mb-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Pink glow behind mascot */}
              <div
                className="absolute inset-0 -m-8 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${P.pink}20 0%, transparent 70%)` }}
              />
              <img
                src={rosaIcon}
                alt="LUMI"
                className="w-36 lg:w-48 h-auto relative z-10"
                style={{ animation: 'auth-float-gentle 3s ease-in-out infinite', filter: `drop-shadow(0 0 40px ${P.pink}25)` }}
              />
            </motion.div>

            {/* Title with clip-path reveal */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.01 }}
              style={{
                fontSize: 'clamp(26px, 3.5vw, 44px)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: P.dark,
                animation: mounted ? 'auth-clip-reveal 0.8s cubic-bezier(0.23,1,0.32,1) 0.5s both' : 'none',
              }}
            >
              Bienvenido{' '}
              <span className="italic" style={{ fontWeight: 400, color: P.pink }}>
                de nuevo
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-4 text-sm leading-relaxed"
              style={{ color: P.textMuted }}
            >
              La tranquilidad de saber que tus seres queridos están bien, siempre contigo.
            </motion.p>

            {/* Green accent line — animated grow */}
            <div
              className="mt-8 h-0.5 rounded-full"
              style={{
                background: P.green,
                animation: mounted ? 'auth-grow-line 0.6s ease-out 1.1s both' : 'none',
              }}
            />
          </div>
        </motion.div>

        {/* ═══════════════ RIGHT — Form panel ═══════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="relative flex-1 flex items-center justify-center px-6 lg:px-16 py-16 lg:py-0"
          style={{ background: P.white }}
        >
          <div className="relative z-10 w-full max-w-md">
            {/* Mobile: small mascot + logo */}
            <motion.div
              className="flex flex-col items-center mb-8 lg:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={rosaIcon}
                alt="LUMI"
                className="w-10 h-10 mb-3"
                style={{ animation: 'auth-float-gentle 3s ease-in-out infinite' }}
              />
              <img src={rosaLogo} alt="LUMI" className="h-8 w-auto" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="mb-2"
              style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', textTransform: 'uppercase', color: P.dark }}
            >
              Iniciar sesión
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-sm mb-8"
              style={{ color: P.textMuted }}
            >
              Ingresa para ver cómo está tu familia
            </motion.p>

            {/* Social buttons */}
            <motion.div
              className="flex gap-3 mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-[0.97]"
                style={{ background: P.white, border: `1.5px solid ${P.border}`, color: P.dark }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = P.pink; e.currentTarget.style.boxShadow = `0 4px 20px ${P.pinkGlow}`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = P.border; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-[0.97]"
                style={{ background: P.dark, color: P.white }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Apple
              </button>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${P.border}, transparent)` }} />
              <span className="text-[11px] font-medium uppercase tracking-[0.1em]" style={{ color: '#94A3B8' }}>o con correo</span>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${P.border}, transparent)` }} />
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email field */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
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
                    boxShadow: focusedField === 'email' ? `0 0 0 3px rgba(255,45,120,0.12)` : 'none',
                  }}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </motion.div>

              {/* Password field */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="flex justify-between items-center mb-2">
                  <label
                    className="text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200"
                    style={{ color: focusedField === 'password' ? P.pink : P.textMuted }}
                  >
                    Contraseña
                  </label>
                  <Link
                    to="/recuperar"
                    className="text-[10px] font-bold uppercase tracking-[0.08em] relative group"
                    style={{ color: P.pink }}
                  >
                    ¿Olvidaste?
                    <span
                      className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                      style={{ background: P.pink }}
                    />
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Tu contraseña"
                    className="w-full px-5 pr-12 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: `${P.dark}05`,
                      border: `1.5px solid ${focusedField === 'password' ? P.pink : `${P.dark}10`}`,
                      color: P.dark,
                      boxShadow: focusedField === 'password' ? `0 0 0 3px rgba(255,45,120,0.12)` : 'none',
                    }}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-150"
                    style={{ color: P.textMuted }}
                    onMouseEnter={e => { e.currentTarget.style.color = P.pink; }}
                    onMouseLeave={e => { e.currentTarget.style.color = P.textMuted; }}
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>

              {/* Submit button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed"
                  style={{
                    background: isSuccess ? P.green : P.pink,
                    color: P.white,
                    boxShadow: isSuccess ? `0 0 30px ${P.green}40` : `0 0 30px ${P.pink}25`,
                    transform: isLoading ? 'scale(1)' : undefined,
                  }}
                  onMouseEnter={e => { if (!isLoading && !isSuccess) { e.currentTarget.style.boxShadow = `0 0 50px ${P.pink}40`; e.currentTarget.style.transform = 'scale(1.02)'; } }}
                  onMouseLeave={e => { if (!isLoading && !isSuccess) { e.currentTarget.style.boxShadow = `0 0 30px ${P.pink}25`; e.currentTarget.style.transform = 'scale(1)'; } }}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'auth-check-pop 0.4s ease-out both' }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  ) : (
                    'Iniciar sesión'
                  )}
                </button>
              </motion.div>
            </form>

            {/* Bottom link */}
            <motion.p
              className="text-center mt-8 text-sm"
              style={{ color: P.textMuted }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
            >
              ¿No tienes cuenta?{' '}
              <Link to="/registro" className="font-bold transition-colors duration-200" style={{ color: P.pink }}>
                Regístrate
              </Link>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
