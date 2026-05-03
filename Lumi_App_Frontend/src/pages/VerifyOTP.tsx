import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, KeyRound, Shield } from 'lucide-react';
import rosaIcon from '../assets/images/rosa_vivido_icon-removebg-preview.png';
import rosaLogo from '../assets/images/rosa_vivido_logo_completo-removebg-preview.png';
import Navbar from '../components/landing/Navbar';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

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

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (resendTimer <= 0) { setCanResend(true); return; }
    const interval = setInterval(() => setResendTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = useCallback((index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  }, [otp]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
  }, [otp]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted.length) return;
    const newOtp = Array(OTP_LENGTH).fill('');
    for (let i = 0; i < pasted.length; i++) newOtp[i] = pasted[i];
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  }, []);

  const handleResend = () => {
    setResendTimer(RESEND_SECONDS);
    setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => navigate('/app'), 600);
    }, 1000);
  };

  const isComplete = otp.every(d => d !== '');

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: P.bgPage }}>
      <Navbar />

      {/* ═══ Background decoration ═══ */}
      <div className="absolute pointer-events-none" style={{ width: 400, height: 400, top: '-5%', right: '-5%', background: `radial-gradient(circle, ${P.pink}, transparent)`, opacity: 0.08, filter: 'blur(60px)' }} />
      <div className="absolute pointer-events-none" style={{ width: 300, height: 300, bottom: '-5%', left: '-5%', background: `radial-gradient(circle, ${P.pink}, transparent)`, opacity: 0.06, filter: 'blur(60px)' }} />

      {/* Floating blobs */}
      <div className="absolute pointer-events-none" style={{ width: 90, height: 75, background: `${P.pink}08`, borderRadius: '60% 40% 70% 30%', top: '20%', right: '12%', animation: 'auth-blob-drift-1 12s ease-in-out infinite' }} />
      <div className="absolute pointer-events-none" style={{ width: 60, height: 60, background: 'transparent', borderRadius: '50%', bottom: '30%', left: '10%', border: `1.5px solid ${P.pink}15`, animation: 'auth-blob-drift-2 10s ease-in-out infinite' }} />
      <div className="absolute pointer-events-none" style={{ width: 50, height: 40, background: `${P.pink}06`, borderRadius: '40% 60% 30% 70%', top: '55%', left: '20%', animation: 'auth-blob-drift-3 14s ease-in-out infinite' }} />

      {/* Tiny ✦ */}
      {['15%,25%', '70%,12%', '30%,80%', '82%,55%'].map((pos, i) => {
        const [t, l] = pos.split(',');
        return <span key={i} className="absolute pointer-events-none select-none" style={{ top: t, left: l, fontSize: 10 + i, color: P.pink, opacity: 0.06 + i * 0.01, animation: `auth-blob-drift-${(i % 4) + 1} ${10 + i * 2}s ease-in-out infinite` }}>✦</span>;
      })}

      {/* Ghost mascots */}
      <motion.img src={rosaIcon} alt="" className="absolute pointer-events-none select-none hidden lg:block" initial={{ opacity: 0 }} animate={{ opacity: 0.035 }} transition={{ delay: 0.8 }} style={{ width: 140, left: '8%', top: '20%', animation: 'auth-blob-drift-2 9s ease-in-out infinite' }} />

      {/* Floating icons */}
      <motion.div className="absolute pointer-events-none hidden lg:block" initial={{ opacity: 0 }} animate={{ opacity: 0.06 }} transition={{ delay: 1 }} style={{ top: '30%', right: '18%', animation: 'auth-blob-drift-3 8s ease-in-out infinite' }}>
        <KeyRound size={20} style={{ color: P.pink }} />
      </motion.div>
      <motion.div className="absolute pointer-events-none hidden lg:block" initial={{ opacity: 0 }} animate={{ opacity: 0.05 }} transition={{ delay: 1.2 }} style={{ bottom: '25%', left: '22%', animation: 'auth-blob-drift-1 9s ease-in-out 1s infinite' }}>
        <Shield size={18} style={{ color: P.pink }} />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none" />

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-28 pb-12 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <motion.div className="flex justify-center mb-10" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6, ease }}>
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
                to="/recuperar"
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 group"
                style={{ color: P.textMuted }}
                onMouseEnter={e => { e.currentTarget.style.color = P.pink; }}
                onMouseLeave={e => { e.currentTarget.style.color = P.textMuted; }}
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                Volver
              </Link>
            </motion.div>

            <div className="text-center">
              {/* Lock icon with swing */}
              <motion.div className="flex justify-center mb-5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.45, type: 'spring', stiffness: 200 }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: `${P.pink}10`, animation: 'auth-swing 2s ease-in-out infinite' }}>
                  <KeyRound size={28} style={{ color: P.pink }} />
                </div>
              </motion.div>

              {/* Title */}
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
                Verificación
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-3 text-sm leading-relaxed" style={{ color: P.textMuted }}>
                Ingresa el código de 6 dígitos que enviamos a tu correo
              </motion.p>

              {/* Green accent */}
              <div className="flex justify-center mt-4">
                <div className="h-0.5 rounded-full" style={{ background: P.green, animation: mounted ? 'auth-grow-line 0.6s ease-out 0.9s both' : 'none' }} />
              </div>
            </div>

            {/* OTP Form */}
            <motion.form
              onSubmit={handleVerify}
              className="space-y-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="flex justify-center gap-2.5 sm:gap-3" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleChange(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    autoFocus={index === 0}
                    className="w-12 h-14 text-center text-xl font-bold rounded-xl outline-none transition-all duration-200"
                    style={{
                      background: P.white,
                      border: `2px solid ${digit ? P.pink : P.border}`,
                      color: P.dark,
                      boxShadow: digit ? `0 0 0 3px rgba(255,45,120,0.1)` : 'none',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = P.pink; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,45,120,0.12)'; }}
                    onBlur={e => { if (!digit) { e.currentTarget.style.borderColor = P.border; e.currentTarget.style.boxShadow = 'none'; } }}
                  />
                ))}
              </div>

              {/* Verify button */}
              <button
                type="submit"
                disabled={isLoading || !isComplete || isSuccess}
                className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: isSuccess ? P.green : P.pink,
                  color: P.white,
                  boxShadow: isSuccess ? `0 0 30px ${P.green}40` : `0 0 30px ${P.pink}25`,
                }}
                onMouseEnter={e => { if (!isLoading && !isSuccess && isComplete) { e.currentTarget.style.boxShadow = `0 0 50px ${P.pink}40`; e.currentTarget.style.transform = 'scale(1.02)'; } }}
                onMouseLeave={e => { if (!isLoading && !isSuccess) { e.currentTarget.style.boxShadow = `0 0 30px ${P.pink}25`; e.currentTarget.style.transform = 'scale(1)'; } }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </span>
                ) : isSuccess ? (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'auth-check-pop 0.4s ease-out both' }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                ) : (
                  'Verificar'
                )}
              </button>
            </motion.form>

            {/* Resend */}
            <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm font-bold transition-colors duration-200"
                  style={{ color: P.pink }}
                  onMouseEnter={e => { e.currentTarget.style.color = P.pinkLight; }}
                  onMouseLeave={e => { e.currentTarget.style.color = P.pink; }}
                >
                  Reenviar código
                </button>
              ) : (
                <p className="text-sm" style={{ color: P.textMuted }}>
                  Reenviar código en{' '}
                  <span className="font-semibold" style={{ color: P.dark }}>{resendTimer}s</span>
                </p>
              )}
            </motion.div>

            {/* Back to login */}
            <motion.p className="text-center text-sm" style={{ color: P.textMuted }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              <Link to="/login" className="font-bold" style={{ color: P.pink }}>Volver al login</Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
