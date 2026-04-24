import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Brain, Users, Lightbulb } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import azulIcon from '../assets/images/icono_lumi_azul-removebg-preview.png';
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
  azul: '#3F50B3',
};

/* ── Floating blobs (different positions than login) ── */
const blobs = [
  { w: 100, h: 85, bg: `${P.azul}10`, radius: '50% 60% 40% 70%', top: '15%', right: '8%', anim: 'auth-blob-drift-2 13s ease-in-out infinite' },
  { w: 70, h: 70, bg: 'transparent', radius: '50%', bottom: '20%', left: '12%', anim: 'auth-blob-drift-1 10s ease-in-out infinite', border: `1.5px solid ${P.pink}18` },
  { w: 110, h: 90, bg: `${P.pink}08`, radius: '60% 40% 55% 45%', top: '60%', right: '18%', anim: 'auth-blob-drift-4 15s ease-in-out infinite' },
  { w: 55, h: 55, bg: 'transparent', radius: '50%', top: '30%', left: '20%', anim: 'auth-blob-drift-3 9s ease-in-out infinite', border: `1px solid ${P.azul}12` },
  { w: 80, h: 65, bg: `${P.azul}06`, radius: '40% 70% 50% 60%', bottom: '35%', right: '5%', anim: 'auth-blob-drift-2 12s ease-in-out infinite' },
];

function getStrength(pw: string) {
  if (!pw.length) return { level: 0, label: '', color: '' };
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const map: Record<number, { label: string; color: string }> = {
    1: { label: 'Débil', color: '#EF4444' },
    2: { label: 'Regular', color: '#F59E0B' },
    3: { label: 'Buena', color: P.azul },
    4: { label: 'Fuerte', color: P.green },
  };
  return { level: s, ...(map[s] || { label: 'Débil', color: '#EF4444' }) };
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmPassword: '' });
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const strength = getStrength(form.password);
  const up = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

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
        {/* ═══════════════ LEFT — Form panel ═══════════════ */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="relative flex-1 flex items-center justify-center px-6 lg:px-16 py-16 lg:py-0 order-2 lg:order-1"
          style={{ background: P.white }}
        >
          <div className="relative z-10 w-full max-w-md">
            {/* Mobile: mascot + logo */}
            <motion.div
              className="flex flex-col items-center mb-8 lg:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={azulIcon}
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
              Crear cuenta
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-sm mb-8"
              style={{ color: P.textMuted }}
            >
              Únete y comienza a cuidar a tu familia
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
              transition={{ delay: 0.35 }}
            >
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${P.border}, transparent)` }} />
              <span className="text-[11px] font-medium uppercase tracking-[0.1em]" style={{ color: '#94A3B8' }}>o con correo</span>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${P.border}, transparent)` }} />
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] mb-2 transition-colors duration-200" style={{ color: focusedField === 'nombre' ? P.pink : P.textMuted }}>Nombre completo</label>
                <input
                  type="text" value={form.nombre} onChange={e => up('nombre', e.target.value)} placeholder="María García"
                  className="w-full px-5 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ background: `${P.dark}05`, border: `1.5px solid ${focusedField === 'nombre' ? P.pink : `${P.dark}10`}`, color: P.dark, boxShadow: focusedField === 'nombre' ? '0 0 0 3px rgba(255,45,120,0.12)' : 'none' }}
                  onFocus={() => setFocusedField('nombre')} onBlur={() => setFocusedField(null)}
                />
              </motion.div>

              {/* Email */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] mb-2 transition-colors duration-200" style={{ color: focusedField === 'email' ? P.pink : P.textMuted }}>Correo electrónico</label>
                <input
                  type="email" value={form.email} onChange={e => up('email', e.target.value)} placeholder="tu@correo.com"
                  className="w-full px-5 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ background: `${P.dark}05`, border: `1.5px solid ${focusedField === 'email' ? P.pink : `${P.dark}10`}`, color: P.dark, boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(255,45,120,0.12)' : 'none' }}
                  onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                />
              </motion.div>

              {/* Password */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.49, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] mb-2 transition-colors duration-200" style={{ color: focusedField === 'password' ? P.pink : P.textMuted }}>Contraseña</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'} value={form.password} onChange={e => up('password', e.target.value)} placeholder="Mínimo 8 caracteres"
                    className="w-full px-5 pr-12 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{ background: `${P.dark}05`, border: `1.5px solid ${focusedField === 'password' ? P.pink : `${P.dark}10`}`, color: P.dark, boxShadow: focusedField === 'password' ? '0 0 0 3px rgba(255,45,120,0.12)' : 'none' }}
                    onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-150" style={{ color: P.textMuted }} onMouseEnter={e => { e.currentTarget.style.color = P.pink; }} onMouseLeave={e => { e.currentTarget.style.color = P.textMuted; }}>
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {strength.level > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300" style={{ background: i <= strength.level ? strength.color : `${P.dark}08` }} />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: strength.color }}>{strength.label}</span>
                  </div>
                )}
              </motion.div>

              {/* Confirm Password */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.56, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] mb-2 transition-colors duration-200" style={{ color: focusedField === 'confirm' ? P.pink : P.textMuted }}>Confirmar contraseña</label>
                <div className="relative">
                  <input
                    type={showCpw ? 'text' : 'password'} value={form.confirmPassword} onChange={e => up('confirmPassword', e.target.value)} placeholder="Repite tu contraseña"
                    className="w-full px-5 pr-12 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{ background: `${P.dark}05`, border: `1.5px solid ${focusedField === 'confirm' ? P.pink : `${P.dark}10`}`, color: P.dark, boxShadow: focusedField === 'confirm' ? '0 0 0 3px rgba(255,45,120,0.12)' : 'none' }}
                    onFocus={() => setFocusedField('confirm')} onBlur={() => setFocusedField(null)}
                  />
                  <button type="button" onClick={() => setShowCpw(!showCpw)} className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-150" style={{ color: P.textMuted }} onMouseEnter={e => { e.currentTarget.style.color = P.pink; }} onMouseLeave={e => { e.currentTarget.style.color = P.textMuted; }}>
                    {showCpw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>

              {/* Custom Checkbox */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.63, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}>
                <label className="flex items-start gap-3 cursor-pointer pt-1 group">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={e => setAcceptTerms(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className="w-[18px] h-[18px] rounded flex items-center justify-center transition-all duration-150"
                      style={{
                        background: acceptTerms ? P.pink : 'transparent',
                        border: acceptTerms ? `2px solid ${P.pink}` : `2px solid ${P.border}`,
                      }}
                    >
                      {acceptTerms && (
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'auth-check-pop 0.2s ease-out both' }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-xs leading-relaxed" style={{ color: P.textMuted }}>
                    Acepto los{' '}
                    <Link to="/terms" className="font-bold transition-colors duration-200" style={{ color: P.pink }}>Términos y Condiciones</Link>
                    {' '}y la{' '}
                    <Link to="/terms" className="font-bold transition-colors duration-200" style={{ color: P.pink }}>Política de Privacidad</Link>
                  </span>
                </label>
              </motion.div>

              {/* Submit */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}>
                <button
                  type="submit"
                  disabled={isLoading || !acceptTerms || isSuccess}
                  className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: isSuccess ? P.green : P.pink,
                    color: P.white,
                    boxShadow: isSuccess ? `0 0 30px ${P.green}40` : `0 0 30px ${P.pink}25`,
                  }}
                  onMouseEnter={e => { if (!isLoading && !isSuccess && acceptTerms) { e.currentTarget.style.boxShadow = `0 0 50px ${P.pink}40`; e.currentTarget.style.transform = 'scale(1.02)'; } }}
                  onMouseLeave={e => { if (!isLoading && !isSuccess) { e.currentTarget.style.boxShadow = `0 0 30px ${P.pink}25`; e.currentTarget.style.transform = 'scale(1)'; } }}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center"><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /></span>
                  ) : isSuccess ? (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'auth-check-pop 0.4s ease-out both' }}><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                  ) : (
                    'Crear cuenta'
                  )}
                </button>
              </motion.div>
            </form>

            <motion.p className="text-center mt-8 text-sm" style={{ color: P.textMuted }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              ¿Ya tienes cuenta?{' '}<Link to="/login" className="font-bold" style={{ color: P.pink }}>Inicia sesión</Link>
            </motion.p>
          </div>
        </motion.div>

        {/* ═══════════════ RIGHT — Brand panel ═══════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="relative lg:w-[48%] w-full lg:min-h-screen hidden lg:flex items-center justify-center py-20 lg:py-0 px-8 overflow-hidden order-1 lg:order-2"
          style={{ background: P.cream }}
        >
          {/* Noise overlay */}
          <div className="noise absolute inset-0 pointer-events-none" />

          {/* Floating CSS blobs */}
          {blobs.map((b, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                width: b.w, height: b.h, background: b.bg, borderRadius: b.radius,
                border: b.border || 'none', top: b.top, left: b.left, right: b.right, bottom: b.bottom,
                animation: b.anim,
              }}
            />
          ))}

          {/* Tiny ✦ symbols */}
          {['20%,15%', '70%,10%', '45%,80%', '80%,60%'].map((pos, i) => {
            const [t, l] = pos.split(',');
            return (
              <span key={`star-${i}`} className="absolute pointer-events-none select-none" style={{ top: t, left: l, fontSize: 10 + i * 2, color: P.pink, opacity: 0.08 + i * 0.02, animation: `auth-blob-drift-${(i % 4) + 1} ${11 + i * 3}s ease-in-out infinite` }}>✦</span>
            );
          })}

          {/* Scattered icons */}
          <motion.div className="absolute pointer-events-none" style={{ top: '20%', left: '18%', animation: 'auth-blob-drift-1 8s ease-in-out infinite' }} initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} transition={{ delay: 1 }}>
            <Brain size={22} style={{ color: P.dark }} />
          </motion.div>
          <motion.div className="absolute pointer-events-none" style={{ bottom: '22%', right: '20%', animation: 'auth-blob-drift-2 9s ease-in-out 1s infinite' }} initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} transition={{ delay: 1.3 }}>
            <Users size={20} style={{ color: P.pink }} />
          </motion.div>
          <motion.div className="absolute pointer-events-none" style={{ top: '60%', left: '25%', animation: 'auth-blob-drift-3 7s ease-in-out 2s infinite' }} initial={{ opacity: 0 }} animate={{ opacity: 0.07 }} transition={{ delay: 1.5 }}>
            <Lightbulb size={18} style={{ color: P.dark }} />
          </motion.div>

          {/* Editorial label */}
          <span className="absolute top-[10%] right-[8%] pointer-events-none select-none" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: P.dark, opacity: 0.08 }}>002</span>

          {/* Diagonal line */}
          <div className="absolute pointer-events-none" style={{ width: 100, height: 2, background: `${P.pink}15`, bottom: '20%', left: '5%', transform: 'rotate(-45deg)' }} />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
            <motion.div
              className="relative mb-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="absolute inset-0 -m-8 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${P.azul}15 0%, transparent 70%)` }} />
              <img
                src={azulIcon}
                alt="LUMI"
                className="w-36 lg:w-48 h-auto relative z-10"
                style={{ animation: 'auth-float-gentle 3s ease-in-out infinite', filter: `drop-shadow(0 0 40px ${P.azul}20)` }}
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.01 }}
              style={{
                fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', textTransform: 'uppercase', color: P.dark,
                animation: mounted ? 'auth-clip-reveal 0.8s cubic-bezier(0.23,1,0.32,1) 0.5s both' : 'none',
              }}
            >
              Únete a la{' '}
              <span className="italic" style={{ fontWeight: 400, color: P.pink }}>familia</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }} className="mt-4 text-sm leading-relaxed" style={{ color: P.textMuted }}>
              Crea tu cuenta y comienza a cuidar a quienes más importan con LUMI a tu lado.
            </motion.p>

            <div className="mt-8 h-0.5 rounded-full" style={{ background: P.green, animation: mounted ? 'auth-grow-line 0.6s ease-out 1.1s both' : 'none' }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
