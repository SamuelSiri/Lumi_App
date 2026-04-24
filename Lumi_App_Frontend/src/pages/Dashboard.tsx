import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Heart, Battery, Wifi, Smile, Pill, Clock, AlertTriangle, Activity,
  Dumbbell, UtensilsCrossed, MapPin, MessageSquare, Send, Mic,
  Thermometer, Flame, Move, ShieldAlert, ChevronRight,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { dispositivoLumi, recordatorios, alertas, generarDatosSalud } from '../data/mockData';
import rosaIcon from '../assets/images/rosa_vivido_icon-removebg-preview.png';

const rosa = '#FD4282';
const azul = '#3F50B3';
const neon = '#39FF14';
const dark = '#0a0a12';

const ctn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } } };

function relTime(ts: string): string {
  const d = Math.floor((Date.now() - new Date(ts).getTime()) / 60000);
  if (d < 1) return 'Ahora';
  if (d < 60) return `Hace ${d} min`;
  const h = Math.floor(d / 60);
  if (h < 24) return `Hace ${h}h`;
  return `Hace ${Math.floor(h / 24)}d`;
}

const sevColor: Record<string, string> = { critica: '#EF4444', alta: '#EF4444', media: '#F59E0B', baja: azul, info: '#a3a3a3' };
const sevLabel: Record<string, string> = { critica: 'Crítica', alta: 'Alta', media: 'Media', baja: 'Baja', info: 'Info' };

function BatteryRing({ pct }: { pct: number }) {
  const r = 36, c = 2 * Math.PI * r;
  const color = pct > 50 ? '#22C55E' : pct > 20 ? '#F59E0B' : '#EF4444';
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg width={80} height={80} className="rotate-[-90deg]">
        <circle cx={40} cy={40} r={r} fill="none" stroke={`${dark}06`} strokeWidth={5} />
        <circle cx={40} cy={40} r={r} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (c * pct / 100)} style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-black" style={{ color }}>{pct}%</span>
        <span className="text-[9px] uppercase tracking-[0.1em]" style={{ color: '#8a8a8a' }}>{pct > 80 ? 'Cargada' : 'En uso'}</span>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl px-4 py-3 shadow-lg border" style={{ borderColor: `${dark}06` }}>
      <p className="text-sm font-bold" style={{ color: dark }}>{label}</p>
      <p className="text-lg font-black" style={{ color: rosa }}>{payload[0].value} bpm</p>
    </div>
  );
}

export default function Dashboard() {
  const healthData = useMemo(() => generarDatosSalud(), []);
  const lastAlerts = alertas.slice(0, 3);
  const [msg, setMsg] = useState('');

  const activities = [
    { id: 1, text: 'LUMI reprodujo música relajante', time: '14:10', Icon: Activity, color: azul },
    { id: 2, text: 'Monitoreo de ritmo cardíaco activado', time: '14:23', Icon: Heart, color: rosa },
    { id: 3, text: 'Recordatorio de Losartán enviado', time: '12:00', Icon: Pill, color: '#F59E0B' },
    { id: 4, text: 'Caminata matutina completada', time: '10:05', Icon: Dumbbell, color: '#22C55E' },
  ];

  const hours = Array.from({ length: 12 }, (_, i) => ({ h: `${7 + i}:00`, interactions: Math.floor(Math.random() * 8) + 1, motion: Math.floor(Math.random() * 6) + 1 }));

  return (
    <motion.div variants={ctn} initial="hidden" animate="show" className="mx-auto max-w-7xl space-y-6 pb-8">

      {/* ═══ HEADER ═══ */}
      <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight" style={{ color: dark }}>Hola, María</h1>
          <p className="mt-1 text-sm" style={{ color: '#8a8a8a' }}>Este es el resumen de hoy para LUMI</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-2xl px-4 py-2.5 border" style={{ background: 'white', borderColor: `${dark}06` }}>
            <p className="text-sm font-semibold" style={{ color: dark }}>
              {dispositivoLumi.estado === 'activo' ? 'Todo en orden. Monitoreando...' : 'En modo descanso'}
            </p>
          </div>
          <img src={rosaIcon} alt="LUMI" className="w-10 h-auto" style={{ animation: 'float 4s ease-in-out infinite' }} />
        </div>
      </motion.div>

      {/* ═══ STATUS CARD (wide) ═══ */}
      <motion.div variants={item} className="rounded-2xl p-5 border flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: 'white', borderColor: `${dark}06` }}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-4 h-4 rounded-full" style={{ background: '#22C55E', animation: 'pulse-soft 2s ease-in-out infinite' }} />
          </div>
          <div>
            <p className="text-lg font-black uppercase tracking-tight" style={{ color: dark }}>Conectada</p>
            <p className="text-xs" style={{ color: '#8a8a8a' }}>Última conexión: hace 2 min — WiFi fuerte</p>
          </div>
        </div>
        <BatteryRing pct={dispositivoLumi.bateria} />
      </motion.div>

      {/* ═══ ROW 1 — 4 stat cards ═══ */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { Icon: Heart, label: 'Ritmo cardíaco', value: `${dispositivoLumi.sensores.ritmoCardiaco}`, unit: 'bpm', status: 'Normal', statusColor: '#22C55E', bg: `${rosa}08`, iconColor: rosa },
          { Icon: Thermometer, label: 'Temperatura', value: `${dispositivoLumi.sensores.temperatura}`, unit: '°C', status: 'Normal', statusColor: '#22C55E', bg: `${azul}08`, iconColor: azul },
          { Icon: Wifi, label: 'Señal WiFi', value: `${dispositivoLumi.sensores.nivelSenal}`, unit: '%', status: 'Fuerte', statusColor: '#22C55E', bg: `${azul}08`, iconColor: azul },
          { Icon: Smile, label: 'Estado emocional', value: dispositivoLumi.estadoEmocional, unit: '', status: 'Desde 13:45', statusColor: '#8a8a8a', bg: `${rosa}08`, iconColor: rosa },
        ].map((s, i) => (
          <motion.div key={s.label} variants={item} className="rounded-2xl p-5 border transition-all duration-300 hover:shadow-md" style={{ background: 'white', borderColor: `${dark}06` }}>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                <s.Icon size={17} style={{ color: s.iconColor }} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: '#8a8a8a' }}>{s.label}</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black" style={{ color: dark }}>{s.value}</span>
              {s.unit && <span className="text-sm" style={{ color: '#8a8a8a' }}>{s.unit}</span>}
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: s.statusColor }} />
              <span className="text-[10px] font-semibold" style={{ color: s.statusColor }}>{s.status}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ═══ ROW 2 — Map + Alerts + Quick Message ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Map placeholder */}
        <motion.div variants={item} className="lg:col-span-5 rounded-2xl p-6 border relative overflow-hidden" style={{ background: '#1a1a2e', borderColor: `${dark}06`, minHeight: 280 }}>
          {/* Dot grid */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          {/* Glowing center dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 rounded-full relative" style={{ background: azul, boxShadow: `0 0 20px ${azul}60` }}>
              {[1,2,3].map(n => (<div key={n} className="absolute inset-0 rounded-full" style={{ border: `1px solid ${azul}`, animation: `pulse-soft ${1.5 + n * 0.5}s ease-in-out infinite`, transform: `scale(${1 + n * 0.8})`, opacity: 0.3 / n }} />))}
            </div>
          </div>
          {/* Road lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.08 }}>
            <line x1="20%" y1="0" x2="80%" y2="100%" stroke="white" strokeWidth="1" />
            <line x1="0" y1="40%" x2="100%" y2="60%" stroke="white" strokeWidth="1" />
            <line x1="60%" y1="0" x2="30%" y2="100%" stroke="white" strokeWidth="0.5" />
          </svg>
          {/* Content */}
          <div className="relative z-10 flex flex-col justify-end h-full">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={14} style={{ color: azul }} />
              <p className="text-xs font-bold" style={{ color: 'white' }}>Calle Principal #42, Santo Domingo</p>
            </div>
            <p className="text-[10px] mb-4" style={{ color: '#8a8a8a' }}>Actualizado hace 2 min</p>
            <button className="w-full py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-300" style={{ background: `${azul}20`, color: azul, border: `1px solid ${azul}30` }}>
              Ver mapa completo &rarr;
            </button>
          </div>
        </motion.div>

        {/* Alerts + Quick message */}
        <div className="lg:col-span-7 space-y-4">
          {/* Last alerts */}
          <motion.div variants={item} className="rounded-2xl p-5 border" style={{ background: 'white', borderColor: `${dark}06` }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black uppercase tracking-[0.06em]" style={{ color: dark }}>Últimas alertas</h3>
              <Link to="/app/alertas" className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: rosa }}>Ver todas &rarr;</Link>
            </div>
            <div className="space-y-3">
              {lastAlerts.map(a => (
                <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl border-l-[3px] transition-all duration-200 hover:shadow-sm" style={{ background: `${sevColor[a.gravedad]}05`, borderLeftColor: sevColor[a.gravedad] }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${sevColor[a.gravedad]}12` }}>
                    <AlertTriangle size={14} style={{ color: sevColor[a.gravedad] }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color: dark }}>{a.titulo}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: '#8a8a8a' }}>{relTime(a.timestamp)}</p>
                  </div>
                  <span className="shrink-0 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase" style={{ background: `${sevColor[a.gravedad]}12`, color: sevColor[a.gravedad] }}>{sevLabel[a.gravedad]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick message */}
          <motion.div variants={item} className="rounded-2xl p-5 border" style={{ background: 'white', borderColor: `${dark}06` }}>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: '#8a8a8a' }}>Enviar mensaje a LUMI</h3>
            <div className="flex gap-2">
              <input type="text" value={msg} onChange={e => setMsg(e.target.value)} placeholder="Escribe un mensaje..." className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200" style={{ background: `${dark}03`, border: `1.5px solid ${dark}08`, color: dark }} onFocus={e => { e.currentTarget.style.borderColor = rosa; }} onBlur={e => { e.currentTarget.style.borderColor = `${dark}08`; }} />
              <button className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200" style={{ background: `${dark}04` }}><Mic size={16} style={{ color: '#8a8a8a' }} /></button>
              <button className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200" style={{ background: rosa, color: 'white', boxShadow: `0 4px 12px ${rosa}25` }}><Send size={15} /></button>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {['Ya voy en camino', 'Todo está bien', 'Te quiero'].map(p => (
                <button key={p} onClick={() => setMsg(p)} className="px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all duration-200" style={{ background: `${dark}04`, color: '#737373' }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${rosa}10`; e.currentTarget.style.color = rosa; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${dark}04`; e.currentTarget.style.color = '#737373'; }}
                >{p}</button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══ HEALTH CHART ═══ */}
      <motion.div variants={item} className="rounded-2xl p-5 border" style={{ background: 'white', borderColor: `${dark}06` }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black uppercase tracking-[0.06em]" style={{ color: dark }}>Ritmo cardíaco — Hoy</h3>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: rosa }} />
            <span className="text-[10px] font-semibold" style={{ color: '#8a8a8a' }}>BPM</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={healthData}>
            <defs><linearGradient id="grad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={rosa} stopOpacity={0.15} /><stop offset="95%" stopColor={rosa} stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={`${dark}06`} />
            <XAxis dataKey="hora" tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
            <YAxis domain={[55, 95]} tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="ritmoCardiaco" stroke={rosa} strokeWidth={2} fill="url(#grad)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ═══ ACTIVITY CHART + RECENT ACTIVITY ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Activity bar chart */}
        <motion.div variants={item} className="lg:col-span-7 rounded-2xl p-5 border" style={{ background: 'white', borderColor: `${dark}06` }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black uppercase tracking-[0.06em]" style={{ color: dark }}>Actividad de hoy</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm" style={{ background: azul }} /><span className="text-[10px] font-semibold" style={{ color: '#8a8a8a' }}>Interacciones</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm" style={{ background: '#22C55E' }} /><span className="text-[10px] font-semibold" style={{ color: '#8a8a8a' }}>Movimiento</span></div>
            </div>
          </div>
          <div className="flex items-end gap-2 h-32">
            {hours.map((h, i) => (
              <div key={h.h} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-0.5 items-end justify-center" style={{ height: 100 }}>
                  <motion.div initial={{ height: 0 }} animate={{ height: h.interactions * 10 }} transition={{ delay: i * 0.03, duration: 0.5 }} className="w-2 rounded-t-sm" style={{ background: azul }} />
                  <motion.div initial={{ height: 0 }} animate={{ height: h.motion * 10 }} transition={{ delay: i * 0.03 + 0.1, duration: 0.5 }} className="w-2 rounded-t-sm" style={{ background: '#22C55E' }} />
                </div>
                <span className="text-[8px]" style={{ color: '#a3a3a3' }}>{h.h.split(':')[0]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent activity */}
        <motion.div variants={item} className="lg:col-span-5 rounded-2xl p-5 border" style={{ background: 'white', borderColor: `${dark}06` }}>
          <h3 className="text-sm font-black uppercase tracking-[0.06em] mb-4" style={{ color: dark }}>Actividad reciente</h3>
          <div className="space-y-4">
            {activities.map(a => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${a.color}10` }}>
                  <a.Icon size={14} style={{ color: a.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold" style={{ color: dark }}>{a.text}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: '#8a8a8a' }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ═══ REMINDERS ═══ */}
      <motion.div variants={item} className="rounded-2xl p-5 border" style={{ background: 'white', borderColor: `${dark}06` }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black uppercase tracking-[0.06em]" style={{ color: dark }}>Recordatorios de hoy</h3>
          <Link to="/app/cuidado" className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: rosa }}>Ver todos &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {recordatorios.slice(0, 6).map(r => {
            const icons: Record<string, React.ReactNode> = {
              medicacion: <Pill size={14} style={{ color: rosa }} />,
              ejercicio: <Dumbbell size={14} style={{ color: azul }} />,
              comida: <UtensilsCrossed size={14} style={{ color: '#F59E0B' }} />,
              cita: <Clock size={14} style={{ color: azul }} />,
              otro: <Clock size={14} style={{ color: '#8a8a8a' }} />,
            };
            return (
              <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:shadow-sm" style={{ background: `${dark}02`, border: `1px solid ${dark}04` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${rosa}08` }}>
                  {icons[r.tipo] || icons.otro}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate" style={{ color: dark }}>{r.titulo}</p>
                  <p className="text-[10px]" style={{ color: '#8a8a8a' }}>{r.hora}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
