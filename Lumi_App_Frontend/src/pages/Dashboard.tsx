import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Heart, Wifi, Pill, Clock, AlertTriangle, Activity,
  Dumbbell, UtensilsCrossed, MapPin, Send,
  Thermometer, Bell, Sparkles, Trash2, Plus, TrendingUp,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { dispositivoLumi, recordatorios, alertas, generarDatosSalud } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import LeafletMap from '../components/ui/LeafletMap';

const rosa = '#FD4282';
const azul = '#3F50B3';
const dark = '#0a0a12';
const grey = '#8a8a8a';

const ctn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } } };

function relTime(ts: string): string {
  const d = Math.floor((Date.now() - new Date(ts).getTime()) / 60000);
  if (d < 1) return 'Ahora';
  if (d < 60) return `Hace ${d} min`;
  const h = Math.floor(d / 60);
  if (h < 24) return `Hace ${h}h`;
  return `Hace ${Math.floor(h / 24)}d`;
}

const sevColor: Record<string, string> = { critica: '#EF4444', alta: '#EF4444', media: '#F59E0B', baja: azul, info: grey };
const sevLabel: Record<string, string> = { critica: 'Crítica', alta: 'Alta', media: 'Media', baja: 'Baja', info: 'Info' };

/* ─── Polar helper for circular layouts ─── */
function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/* ─── 24h Day Ring ─── */
function DayRing({ now }: { now: Date }) {
  const cx = 100, cy = 100, r = 78;
  const C = 2 * Math.PI * r;
  const hourFrac = now.getHours() + now.getMinutes() / 60;
  const angle = (hourFrac / 24) * 360;

  const events = [
    { hour: 8, label: 'Metformina', color: rosa },
    { hour: 9.5, label: 'Caminata', color: '#22C55E' },
    { hour: 12, label: 'Losartán', color: rosa },
    { hour: 14, label: 'Comida', color: '#F59E0B' },
    { hour: 16.5, label: 'Cita Dr.', color: azul },
    { hour: 21, label: 'Enalapril', color: rosa },
  ];

  // Sleep band 22:00 → 07:00
  const sleepStart = 22, sleepEnd = 7;
  const sleepStartA = (sleepStart / 24) * 360;
  const sleepLength = ((24 - sleepStart + sleepEnd) / 24) * 360;

  const marks = Array.from({ length: 48 }, (_, i) => {
    const a = (i / 48) * 360;
    const isHour = i % 2 === 0;
    const isMain = i % 12 === 0;
    const inner = polar(cx, cy, r - (isMain ? 10 : isHour ? 6 : 4), a);
    const outer = polar(cx, cy, r - 1, a);
    return { a, inner, outer, isHour, isMain };
  });

  const passedFrac = hourFrac / 24;
  const pointer = polar(cx, cy, r + 6, angle);

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Sleep arc */}
      <circle cx={cx} cy={cy} r={r}
        fill="none" stroke={`${azul}25`} strokeWidth="14"
        strokeDasharray={`${(sleepLength / 360) * C} ${C}`}
        strokeDashoffset={-(sleepStartA / 360) * C}
        transform={`rotate(-90 ${cx} ${cy})`} />

      {/* Bg ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={`${dark}10`} strokeWidth="1.5" />

      {/* Active arc (passed time) */}
      <circle cx={cx} cy={cy} r={r}
        fill="none" stroke={rosa} strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray={`${passedFrac * C} ${C}`}
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ filter: `drop-shadow(0 0 4px ${rosa})` }} />

      {/* Hour ticks */}
      {marks.map((m, i) => (
        <line key={i} x1={m.inner.x} y1={m.inner.y} x2={m.outer.x} y2={m.outer.y}
          stroke={m.isMain ? dark : `${dark}25`} strokeWidth={m.isMain ? 1.5 : m.isHour ? 0.8 : 0.4} />
      ))}

      {/* Main hour labels: 00, 06, 12, 18 */}
      {[0, 6, 12, 18].map((h) => {
        const p = polar(cx, cy, r - 22, (h / 24) * 360);
        return (
          <text key={h} x={p.x} y={p.y + 3} textAnchor="middle"
            style={{ fontSize: 8, fontWeight: 900, fill: grey, letterSpacing: '0.1em' }}>
            {h.toString().padStart(2, '0')}
          </text>
        );
      })}

      {/* Event dots */}
      {events.map((e, i) => {
        const p = polar(cx, cy, r, (e.hour / 24) * 360);
        const isPast = e.hour <= hourFrac;
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={4.5}
              fill={isPast ? e.color : 'white'}
              stroke={e.color} strokeWidth="2"
              style={{ filter: isPast ? `drop-shadow(0 0 5px ${e.color})` : 'none' }} />
          </g>
        );
      })}

      {/* Current hour pointer */}
      <line x1={cx} y1={cy} x2={pointer.x} y2={pointer.y}
        stroke={rosa} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.4" />
      <circle cx={pointer.x} cy={pointer.y} r={5} fill={rosa} stroke="white" strokeWidth="2"
        style={{ filter: `drop-shadow(0 0 8px ${rosa})` }} />

      {/* Center text */}
      <text x={cx} y={cy - 6} textAnchor="middle"
        style={{ fontSize: 22, fontWeight: 900, fill: dark, letterSpacing: '-0.04em' }}>
        {now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle"
        style={{ fontSize: 6.5, fontWeight: 900, fill: grey, letterSpacing: '0.18em' }}>
        {Math.round(passedFrac * 100)}% DEL DÍA
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle"
        style={{ fontSize: 5.5, fontWeight: 700, fill: rosa, letterSpacing: '0.18em' }}>
        ◉ {events.filter((e) => e.hour > hourFrac).length} POR VENIR
      </text>
    </svg>
  );
}

/* ─── Mini sparkline ─── */
function Sparkline({ data, color, height = 32, fill = true }: {
  data: number[]; color: string; height?: number; fill?: boolean;
}) {
  if (data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 90 - 5}`).join(' ');
  const area = `0,100 ${points} 100,100`;
  const id = `spark-${color.replace('#', '')}`;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full" style={{ height }}>
      {fill && (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {fill && <polygon points={area} fill={`url(#${id})`} />}
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3" style={{ background: dark, color: 'white', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{label}</p>
      <p className="text-lg font-black mt-1" style={{ color: rosa }}>{payload[0].value} bpm</p>
    </div>
  );
}

type QuickNote = { id: string; text: string; ts: string };

export default function Dashboard() {
  const healthData = useMemo(() => generarDatosSalud(), []);
  const lastAlerts = alertas.slice(0, 3);

  const [msg, setMsg] = useState('');
  const [notes, setNotes] = useLocalStorage<QuickNote[]>('dashboard:notes', []);
  const [streak] = useLocalStorage<number>('dashboard:streak', 14);
  const [moodToday, setMoodToday] = useLocalStorage<string>('dashboard:mood', 'feliz');
  const [readAlerts, setReadAlerts] = useLocalStorage<Record<string, boolean>>('alertas:leidas', {});

  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(iv);
  }, []);

  const dayLabel = now.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' });

  const sendNote = () => {
    const t = msg.trim();
    if (!t) return;
    setNotes((p) => [{ id: `n${Date.now()}`, text: t, ts: new Date().toISOString() }, ...p].slice(0, 12));
    setMsg('');
  };
  const removeNote = (id: string) => setNotes((p) => p.filter((n) => n.id !== id));
  const markAlertRead = (id: string) => setReadAlerts((p) => ({ ...p, [id]: true }));

  const moods = [
    { key: 'feliz', label: 'Feliz', color: '#22C55E' },
    { key: 'tranquilo', label: 'Tranquilo', color: azul },
    { key: 'cansado', label: 'Cansado', color: '#F59E0B' },
    { key: 'preocupado', label: 'Preocupado', color: '#EF4444' },
  ];

  const activities = [
    { id: 1, text: 'LUMI reprodujo música relajante', time: '14:10', Icon: Activity, color: azul },
    { id: 2, text: 'Monitoreo de ritmo cardíaco activado', time: '14:23', Icon: Heart, color: rosa },
    { id: 3, text: 'Recordatorio de Losartán enviado', time: '12:00', Icon: Pill, color: '#F59E0B' },
    { id: 4, text: 'Caminata matutina completada', time: '10:05', Icon: Dumbbell, color: '#22C55E' },
  ];

  const hours = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({
      h: `${7 + i}:00`,
      interactions: Math.floor(Math.random() * 8) + 1,
      motion: Math.floor(Math.random() * 6) + 1,
    })),
    [],
  );

  // Sparkline data per KPI
  const heartTrend = useMemo(() => Array.from({ length: 12 }, () => 65 + Math.floor(Math.random() * 22)), []);
  const tempTrend = useMemo(() => Array.from({ length: 12 }, () => 36.2 + Math.random() * 0.8), []);
  const wifiTrend = useMemo(() => Array.from({ length: 12 }, () => 80 + Math.floor(Math.random() * 20)), []);
  const stepsToday = useMemo(() => Array.from({ length: 12 }, () => Math.floor(Math.random() * 600)), []);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 pointer-events-none flex items-start justify-center overflow-hidden" style={{ height: '50vh' }}>
        <span className="whitespace-nowrap select-none" style={{
          fontSize: 'clamp(140px, 24vw, 420px)', fontWeight: 900, lineHeight: 0.85,
          letterSpacing: '-0.05em', color: `${dark}05`, textTransform: 'uppercase', marginTop: '-20px',
        }}>
          Lumi
        </span>
      </div>

      <span className="absolute pointer-events-none select-none top-[14%] right-[6%] text-2xl" style={{ color: `${rosa}30` }}>✦</span>
      <span className="absolute pointer-events-none select-none top-[8%] left-[5%] text-xl" style={{ color: `${azul}25` }}>◆</span>

      <motion.div variants={ctn} initial="hidden" animate="show" className="relative z-10 w-full pb-12 space-y-5">

        {/* HEADER */}
        <motion.div variants={item} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: rosa }}>
              ✦ {dayLabel}
            </p>
            <h1 className="font-black uppercase tracking-tight" style={{
              fontSize: 'clamp(40px, 7vw, 80px)', lineHeight: 0.9, letterSpacing: '-0.04em', color: dark,
            }}>
              Hola,
              <span className="italic font-light" style={{ color: rosa }}> Demo</span>
              <br />Resumen del día
            </h1>
          </div>
        </motion.div>

        {/* TOP MOSAIC: STATUS DARK + DAY RING + STACK */}
        <div className="grid grid-cols-12 gap-4">
          {/* STATUS DARK CARD */}
          <motion.div variants={item} className="col-span-12 lg:col-span-4 rounded-2xl border-2 p-6 relative overflow-hidden flex flex-col"
            style={{ background: dark, borderColor: `${dark}33` }}>
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none" style={{ background: `${rosa}25`, filter: 'blur(80px)' }} />

            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22C55E', boxShadow: `0 0 10px #22C55E`, animation: 'pulse-soft 2s ease-in-out infinite' }} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: '#22C55E' }}>● Conectada</span>
              </div>

              <div className="flex items-baseline gap-3">
                <p className="font-black tracking-tight text-white" style={{ fontSize: 'clamp(64px, 10vw, 112px)', lineHeight: 0.85, letterSpacing: '-0.05em' }}>
                  {dispositivoLumi.sensores.ritmoCardiaco}
                </p>
                <p className="text-xl font-black uppercase tracking-tight" style={{ color: 'rgba(255,255,255,0.6)' }}>bpm</p>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Ritmo cardíaco · normal
              </p>
            </div>

            <div className="relative mt-auto pt-4">
              <Sparkline data={heartTrend} color={rosa} height={48} />
            </div>

            <div className="relative mt-4 pt-4 grid grid-cols-3 gap-3" style={{ borderTop: `1px solid rgba(255,255,255,0.1)` }}>
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.4)' }}>Temp</p>
                <p className="text-sm font-black tracking-tight text-white">{dispositivoLumi.sensores.temperatura}°C</p>
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.4)' }}>Batería</p>
                <p className="text-sm font-black tracking-tight" style={{ color: '#22C55E' }}>{dispositivoLumi.bateria}%</p>
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.4)' }}>Señal</p>
                <p className="text-sm font-black tracking-tight text-white">{dispositivoLumi.senal}%</p>
              </div>
            </div>
          </motion.div>

          {/* DAY RING centerpiece */}
          <motion.div variants={item} className="col-span-12 lg:col-span-5 rounded-2xl border-2 p-6 relative overflow-hidden"
            style={{ background: 'white', borderColor: `${dark}33` }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: rosa }}>✦ Reloj del día</p>
                <h3 className="font-black uppercase tracking-tight text-2xl mt-1" style={{ color: dark }}>
                  Ritmo
                  <span className="italic font-light" style={{ color: rosa }}> 24h</span>
                </h3>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>Eventos hoy</p>
                <p className="text-xl font-black tracking-tight" style={{ color: dark }}>6</p>
              </div>
            </div>

            <div className="relative mx-auto" style={{ maxWidth: 280 }}>
              <DayRing now={now} />
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: rosa }} />
                <span className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color: grey }}>Medic.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: '#22C55E' }} />
                <span className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color: grey }}>Ejercicio</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: azul }} />
                <span className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color: grey }}>Citas</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT STACK: streak + mood quick */}
          <div className="col-span-12 lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-4">
            <motion.div variants={item} className="rounded-2xl border-2 p-5 flex flex-col justify-between" style={{ background: 'white', borderColor: `${dark}33` }}>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: rosa }}>✦ Racha</p>
                <p className="font-black tracking-tight mt-2" style={{ color: dark, fontSize: 56, lineHeight: 0.9, letterSpacing: '-0.04em' }}>
                  {streak}
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>días seguidos</p>
              </div>
              <div className="flex gap-1 mt-3">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span key={i} className="flex-1 rounded-sm h-6" style={{ background: i < streak ? rosa : `${dark}10`, opacity: i < streak ? 1 - (streak - i - 1) * 0.05 : 1 }} />
                ))}
              </div>
            </motion.div>

            <motion.div variants={item} className="rounded-2xl border-2 p-5 relative overflow-hidden" style={{ background: dark, borderColor: `${dark}33` }}>
              <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full pointer-events-none" style={{ background: `${azul}30`, filter: 'blur(60px)' }} />
              <div className="relative">
                <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: azul }}>◆ Próxima</p>
                <p className="font-black uppercase tracking-tight text-white mt-2" style={{ fontSize: 22, lineHeight: 1, letterSpacing: '-0.04em' }}>
                  Losartán
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  En 1h 23min · 12:00
                </p>
                <Link to="/app/cuidado" className="inline-flex items-center gap-1 mt-4 text-[9px] font-black uppercase tracking-[0.25em]" style={{ color: azul }}>
                  Configurar →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* KPI ROW with sparklines */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { Icon: Heart, label: 'Ritmo cardíaco', value: dispositivoLumi.sensores.ritmoCardiaco, unit: 'bpm', accent: rosa, trend: heartTrend, status: 'Normal', statusColor: '#22C55E' },
            { Icon: Thermometer, label: 'Temperatura', value: dispositivoLumi.sensores.temperatura, unit: '°C', accent: azul, trend: tempTrend, status: 'Normal', statusColor: '#22C55E' },
            { Icon: Wifi, label: 'Señal WiFi', value: dispositivoLumi.senal, unit: '%', accent: '#22C55E', trend: wifiTrend, status: 'Fuerte', statusColor: '#22C55E' },
            { Icon: Activity, label: 'Pasos hoy', value: '4.2k', unit: '', accent: '#F59E0B', trend: stepsToday, status: '+12%', statusColor: '#22C55E' },
          ].map((s) => (
            <motion.div key={s.label} variants={item} className="rounded-2xl p-4 border-2 relative overflow-hidden" style={{ background: 'white', borderColor: `${dark}33` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${s.accent}15`, border: `1.5px solid ${s.accent}30` }}>
                  <s.Icon size={15} style={{ color: s.accent }} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full"
                  style={{ background: `${s.statusColor}10`, color: s.statusColor }}>
                  {s.status}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black tracking-tight" style={{ color: dark, letterSpacing: '-0.04em' }}>{s.value}</span>
                {s.unit && <span className="text-sm font-bold" style={{ color: grey }}>{s.unit}</span>}
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mt-1" style={{ color: grey }}>{s.label}</p>
              <div className="mt-2 -mx-1 -mb-1">
                <Sparkline data={s.trend} color={s.accent} height={28} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* MOSAIC: Map + Mood + Notes (3 cols) */}
        <div className="grid grid-cols-12 gap-4">
          {/* MAP */}
          <motion.div variants={item} className="col-span-12 md:col-span-7 lg:col-span-5 rounded-2xl border-2 relative overflow-hidden" style={{ borderColor: `${dark}33`, minHeight: 320 }}>
            <LeafletMap center={[19.4326, -99.1332]} zoom={15} pinColor={rosa} className="absolute inset-0" />

            <div className="absolute top-3 left-3 z-[500] rounded-full px-3 py-1.5 flex items-center gap-2 pointer-events-none"
              style={{ background: 'white', border: `1px solid ${dark}33`, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
              <MapPin size={11} style={{ color: rosa }} />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: dark }}>Calle Principal #42</span>
            </div>

            <Link to="/app/cuidado"
              className="absolute bottom-3 left-3 right-3 z-[500] py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 text-center text-white"
              style={{ background: rosa, boxShadow: `0 6px 18px ${rosa}50` }}>
              Ver mapa completo →
            </Link>
          </motion.div>

          {/* MOOD */}
          <motion.div variants={item} className="col-span-12 md:col-span-5 lg:col-span-4 rounded-2xl border-2 p-5" style={{ background: 'white', borderColor: `${dark}33` }}>
            <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: rosa }}>✦ Tu lectura</p>
            <h3 className="font-black uppercase tracking-tight text-xl mt-1 mb-4" style={{ color: dark }}>
              Estado emocional
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {moods.map((m) => {
                const active = moodToday === m.key;
                return (
                  <button key={m.key} onClick={() => setMoodToday(m.key)}
                    className="rounded-xl p-3 text-left transition-all duration-300"
                    style={{
                      background: active ? m.color : 'transparent',
                      color: active ? 'white' : dark,
                      border: `1.5px solid ${active ? m.color : `${dark}15`}`,
                      boxShadow: active ? `0 6px 20px ${m.color}40` : 'none',
                    }}>
                    <p className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: active ? 'white' : grey }}>
                      {active ? '◉ Activo' : 'Tocar'}
                    </p>
                    <p className="text-sm font-black uppercase tracking-tight mt-0.5">{m.label}</p>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* NOTES */}
          <motion.div variants={item} className="col-span-12 lg:col-span-3 rounded-2xl border-2 p-5 flex flex-col" style={{ background: 'white', borderColor: `${dark}33` }}>
            <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: azul }}>◆ Para LUMI</p>
            <h3 className="font-black uppercase tracking-tight text-xl mt-1 mb-3" style={{ color: dark }}>
              Notas
            </h3>

            <div className="flex gap-1.5">
              <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') sendNote(); }}
                placeholder="Anotar..."
                className="flex-1 px-3 py-2 rounded-lg text-xs outline-none transition-all duration-200 min-w-0"
                style={{ background: `${dark}03`, border: `1.5px solid ${dark}15`, color: dark }} />
              <button onClick={sendNote} className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: rosa, color: 'white', boxShadow: `0 4px 12px ${rosa}40` }}>
                <Send size={13} />
              </button>
            </div>

            {notes.length > 0 && (
              <div className="mt-3 space-y-1.5 overflow-y-auto" style={{ maxHeight: 180 }}>
                <AnimatePresence initial={false}>
                  {notes.slice(0, 4).map((n) => (
                    <motion.div key={n.id} layout
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                      className="flex items-start gap-2 p-2 rounded-lg group" style={{ background: `${dark}03` }}>
                      <Sparkles size={10} className="mt-0.5 shrink-0" style={{ color: rosa }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] leading-snug truncate" style={{ color: dark }}>{n.text}</p>
                        <p className="text-[8px] font-black uppercase tracking-[0.15em] mt-0.5" style={{ color: grey }}>{relTime(n.ts)}</p>
                      </div>
                      <button onClick={() => removeNote(n.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={9} style={{ color: grey }} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>

        {/* HEALTH CHART */}
        <motion.div variants={item} className="rounded-2xl p-5 border-2" style={{ background: 'white', borderColor: `${dark}33` }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: rosa }}>✦ Salud cardíaca · 24h</p>
              <h3 className="font-black uppercase tracking-tight text-2xl mt-1" style={{ color: dark }}>
                Ritmo a lo largo del día
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>Promedio</p>
                <p className="text-xl font-black tracking-tight" style={{ color: dark }}>72 <span className="text-xs" style={{ color: grey }}>bpm</span></p>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ background: '#22C55E10' }}>
                <TrendingUp size={11} style={{ color: '#22C55E' }} />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: '#22C55E' }}>Estable</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={healthData}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={rosa} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={rosa} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={`${dark}06`} />
              <XAxis dataKey="hora" tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
              <YAxis domain={[55, 95]} tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="ritmoCardiaco" stroke={rosa} strokeWidth={2.5} fill="url(#grad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* BOTTOM MOSAIC */}
        <div className="grid grid-cols-12 gap-4">
          {/* Activity bars */}
          <motion.div variants={item} className="col-span-12 lg:col-span-7 rounded-2xl p-5 border-2" style={{ background: 'white', borderColor: `${dark}33` }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: azul }}>◆ Actividad horaria</p>
                <h3 className="font-black uppercase tracking-tight text-xl mt-1" style={{ color: dark }}>Hoy</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm" style={{ background: azul }} /><span className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color: grey }}>Interacciones</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm" style={{ background: '#22C55E' }} /><span className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color: grey }}>Movimiento</span></div>
              </div>
            </div>
            <div className="flex items-end gap-2 h-32">
              {hours.map((h, i) => (
                <div key={h.h} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-0.5 items-end justify-center" style={{ height: 100 }}>
                    <motion.div initial={{ height: 0 }} animate={{ height: h.interactions * 10 }}
                      transition={{ delay: i * 0.03, duration: 0.5 }}
                      className="w-2 rounded-t-sm" style={{ background: azul }} />
                    <motion.div initial={{ height: 0 }} animate={{ height: h.motion * 10 }}
                      transition={{ delay: i * 0.03 + 0.1, duration: 0.5 }}
                      className="w-2 rounded-t-sm" style={{ background: '#22C55E' }} />
                  </div>
                  <span className="text-[8px] font-black" style={{ color: '#a3a3a3' }}>{h.h.split(':')[0]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent activity */}
          <motion.div variants={item} className="col-span-12 lg:col-span-5 rounded-2xl p-5 border-2" style={{ background: 'white', borderColor: `${dark}33` }}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: rosa }}>✦ Bitácora</p>
                <h3 className="font-black uppercase tracking-tight text-xl mt-1" style={{ color: dark }}>Reciente</h3>
              </div>
            </div>
            <div className="space-y-3 relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-px" style={{ background: `${dark}15` }} />
              {activities.map((a) => (
                <div key={a.id} className="relative flex items-start gap-3 pl-1">
                  <div className="relative w-7 h-7 rounded-lg flex items-center justify-center shrink-0 z-10" style={{ background: `${a.color}15`, border: `1.5px solid ${a.color}40` }}>
                    <a.Icon size={12} style={{ color: a.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold" style={{ color: dark }}>{a.text}</p>
                    <p className="text-[9px] mt-0.5 font-black uppercase tracking-[0.15em]" style={{ color: grey }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ALERTS + REMINDERS */}
        <div className="grid grid-cols-12 gap-4">
          {/* Last alerts */}
          <motion.div variants={item} className="col-span-12 lg:col-span-5 rounded-2xl p-5 border-2" style={{ background: 'white', borderColor: `${dark}33` }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell size={14} style={{ color: rosa }} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: dark }}>Últimas alertas</h3>
              </div>
              <Link to="/app/alertas" className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: rosa }}>Ver todas →</Link>
            </div>
            <div className="space-y-2.5">
              {lastAlerts.map((a) => {
                const leida = readAlerts[a.id] ?? a.leida;
                return (
                  <button key={a.id} onClick={() => markAlertRead(a.id)}
                    className="w-full text-left flex items-start gap-3 p-3 rounded-xl border-l-[3px] transition-all duration-200 hover:shadow-sm"
                    style={{
                      background: leida ? `${dark}02` : `${sevColor[a.gravedad]}05`,
                      borderLeftColor: leida ? `${dark}15` : sevColor[a.gravedad],
                      opacity: leida ? 0.6 : 1,
                    }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${sevColor[a.gravedad]}12` }}>
                      <AlertTriangle size={14} style={{ color: sevColor[a.gravedad] }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black uppercase tracking-tight truncate" style={{ color: dark }}>{a.titulo}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: grey }}>{relTime(a.timestamp)}</p>
                    </div>
                    <span className="shrink-0 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em]"
                      style={{ background: `${sevColor[a.gravedad]}12`, color: sevColor[a.gravedad] }}>{sevLabel[a.gravedad]}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Reminders */}
          <motion.div variants={item} className="col-span-12 lg:col-span-7 rounded-2xl p-5 border-2" style={{ background: 'white', borderColor: `${dark}33` }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: azul }}>◆ Próximos eventos</p>
                <h3 className="font-black uppercase tracking-tight text-xl mt-1" style={{ color: dark }}>Recordatorios</h3>
              </div>
              <Link to="/app/calendario" className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: rosa }}>Ver todos →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {recordatorios.slice(0, 6).map((r) => {
                const icons: Record<string, React.ReactNode> = {
                  medicacion: <Pill size={14} style={{ color: rosa }} />,
                  ejercicio: <Dumbbell size={14} style={{ color: azul }} />,
                  comida: <UtensilsCrossed size={14} style={{ color: '#F59E0B' }} />,
                  cita: <Clock size={14} style={{ color: azul }} />,
                  otro: <Clock size={14} style={{ color: grey }} />,
                };
                return (
                  <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:shadow-sm"
                    style={{ background: `${dark}02`, border: `1px solid ${dark}10` }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${rosa}08` }}>
                      {icons[r.tipo] || icons.otro}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black uppercase tracking-tight truncate" style={{ color: dark }}>{r.titulo}</p>
                      <p className="text-[10px] font-black uppercase tracking-[0.15em]" style={{ color: grey }}>{r.hora}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link to="/app/cuidado" className="flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300"
            style={{ background: dark, color: 'white', boxShadow: `0 8px 24px ${dark}25` }}>
            <Plus size={14} strokeWidth={3} /> Configurar cuidado
          </Link>
          <Link to="/app/familia" className="flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] border-2 border-dashed transition-all duration-300"
            style={{ borderColor: `${dark}33`, color: dark }}>
            Invitar familia →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
