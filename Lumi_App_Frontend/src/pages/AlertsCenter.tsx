import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Heart, Battery, MapPin, Settings, AlertTriangle,
  Pill, Check, Radio, ShieldCheck, Zap, Clock, Trash2, BellOff,
  TrendingUp, Activity,
} from 'lucide-react';
import { alertas as alertasMock } from '../data/mockData';
import type { Alerta } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

type FiltroGravedad = 'todas' | 'criticas' | 'pendientes' | 'leidas';

const rosa = '#FD4282';
const azul = '#3F50B3';
const dark = '#0a0a12';
const grey = '#8a8a8a';

const sevColor: Record<string, string> = {
  critica: '#EF4444',
  alta: '#EF4444',
  media: '#F59E0B',
  baja: azul,
  info: grey,
};

const sevLabel: Record<string, string> = {
  critica: 'Crítica',
  alta: 'Alta',
  media: 'Media',
  baja: 'Baja',
  info: 'Info',
};

const tipoColor: Record<string, string> = {
  salud: rosa,
  medicacion: '#F59E0B',
  bateria: '#22C55E',
  zona: azul,
  caida: '#EF4444',
  sistema: grey,
};

const tipoLabel: Record<string, string> = {
  salud: 'Salud',
  medicacion: 'Medicación',
  bateria: 'Batería',
  zona: 'Ubicación',
  caida: 'Caídas',
  sistema: 'Sistema',
};

const iconosTipo: Record<string, React.ElementType> = {
  caida: AlertTriangle,
  salud: Heart,
  bateria: Battery,
  zona: MapPin,
  medicacion: Pill,
  sistema: Settings,
};

function relTime(ts: string): string {
  const d = Math.floor((Date.now() - new Date(ts).getTime()) / 60000);
  if (d < 1) return 'Ahora mismo';
  if (d < 60) return `Hace ${d} min`;
  const h = Math.floor(d / 60);
  if (h < 24) return `Hace ${h}h`;
  const days = Math.floor(h / 24);
  if (days === 1) return 'Hace 1 día';
  return `Hace ${days} días`;
}

const filtros: { valor: FiltroGravedad; etiqueta: string; accent: string }[] = [
  { valor: 'todas', etiqueta: 'Todas', accent: dark },
  { valor: 'pendientes', etiqueta: 'Pendientes', accent: rosa },
  { valor: 'criticas', etiqueta: 'Críticas', accent: '#EF4444' },
  { valor: 'leidas', etiqueta: 'Leídas', accent: grey },
];

const ctn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } } };

export default function AlertsCenter() {
  const [filtroActivo, setFiltroActivo] = useLocalStorage<FiltroGravedad>('alertas:filtro', 'todas');
  const [alertasState, setAlertasState] = useLocalStorage<Alerta[]>('alertas:lista', alertasMock);
  const [silenciadas, setSilenciadas] = useLocalStorage<Record<string, boolean>>('alertas:silenciadas', {});

  const conteo = useMemo(() => ({
    todas: alertasState.length,
    pendientes: alertasState.filter((a) => !a.leida).length,
    criticas: alertasState.filter((a) => a.gravedad === 'critica' || a.gravedad === 'alta').length,
    leidas: alertasState.filter((a) => a.leida).length,
  }), [alertasState]);

  const filtradas = useMemo(() => {
    switch (filtroActivo) {
      case 'pendientes': return alertasState.filter((a) => !a.leida);
      case 'criticas': return alertasState.filter((a) => a.gravedad === 'critica' || a.gravedad === 'alta');
      case 'leidas': return alertasState.filter((a) => a.leida);
      default: return alertasState;
    }
  }, [alertasState, filtroActivo]);

  // 24h hourly wave
  const wave = useMemo(() => {
    const baseline = [0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 2, 1, 3, 2, 1, 2, 1, 0, 1, 0, 0, 0];
    const today = new Date().toISOString().split('T')[0];
    return Array.from({ length: 24 }, (_, i) => {
      const liveCount = alertasState.filter((a) => {
        if (!a.timestamp.startsWith(today)) return false;
        return new Date(a.timestamp).getHours() === i;
      }).length;
      return Math.max(baseline[i], liveCount);
    });
  }, [alertasState]);

  const waveMax = Math.max(...wave, 1);
  const wavePoints = wave.map((v, i) => `${(i / (wave.length - 1)) * 100},${100 - (v / waveMax) * 90}`).join(' ');
  const waveArea = `0,100 ${wavePoints} 100,100`;

  // 14-day heatmap
  const heatmap = useMemo(() => {
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dStr = d.toISOString().split('T')[0];
      const live = alertasState.filter((a) => a.timestamp.startsWith(dStr)).length;
      const baseline = Math.floor(Math.abs(Math.sin(i * 0.7) * 4));
      days.push({
        date: dStr,
        count: Math.max(live, baseline),
        label: d.getDate(),
        weekday: d.getDay(),
      });
    }
    return days;
  }, [alertasState]);
  const heatmapMax = Math.max(...heatmap.map((d) => d.count), 1);

  // By type breakdown
  const byType = useMemo(() => {
    const types = Object.keys(tipoLabel);
    return types
      .map((t) => ({ type: t, count: alertasState.filter((a) => a.tipo === t).length }))
      .filter((t) => t.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [alertasState]);
  const typeMax = Math.max(...byType.map((t) => t.count), 1);

  // Severity donut
  const bySeverity = useMemo(() => {
    return (['critica', 'alta', 'media', 'baja', 'info'] as const)
      .map((s) => ({ sev: s, count: alertasState.filter((a) => a.gravedad === s).length, color: sevColor[s] }))
      .filter((s) => s.count > 0);
  }, [alertasState]);
  const sevTotal = bySeverity.reduce((acc, s) => acc + s.count, 0) || 1;

  let donutCum = 0;
  const donutSegments = bySeverity.map((s) => {
    const pct = s.count / sevTotal;
    const offset = donutCum;
    donutCum += pct;
    return { ...s, pct, offsetPct: offset };
  });

  const marcarLeida = (id: string) =>
    setAlertasState((prev) => prev.map((a) => (a.id === id ? { ...a, leida: true } : a)));
  const marcarTodas = () =>
    setAlertasState((prev) => prev.map((a) => ({ ...a, leida: true })));
  const eliminar = (id: string) =>
    setAlertasState((prev) => prev.filter((a) => a.id !== id));
  const toggleSilenciar = (id: string) =>
    setSilenciadas((p) => ({ ...p, [id]: !p[id] }));

  const lastEvent = alertasState[0];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 pointer-events-none flex items-start justify-center overflow-hidden" style={{ height: '50vh' }}>
        <span className="whitespace-nowrap select-none" style={{
          fontSize: 'clamp(140px, 24vw, 420px)', fontWeight: 900, lineHeight: 0.85,
          letterSpacing: '-0.05em', color: `${dark}05`, textTransform: 'uppercase', marginTop: '-20px',
        }}>
          Alertas
        </span>
      </div>

      <span className="absolute pointer-events-none select-none top-[12%] right-[6%] text-2xl" style={{ color: `${rosa}30` }}>✦</span>
      <span className="absolute pointer-events-none select-none top-[8%] left-[5%] text-xl" style={{ color: `${azul}25` }}>◆</span>

      <motion.div variants={ctn} initial="hidden" animate="show" className="relative z-10 w-full pb-12 space-y-5">

        {/* HEADER */}
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-2">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: rosa }}>
              ✦ Centro de alertas · {new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'short' })}
            </p>
            <h1 className="font-black uppercase tracking-tight" style={{
              fontSize: 'clamp(40px, 7vw, 80px)', lineHeight: 0.9, letterSpacing: '-0.04em', color: dark,
            }}>
              Vigilando
              <span className="italic font-light" style={{ color: rosa }}> 24/7</span>
            </h1>
          </div>

          <button onClick={marcarTodas}
            className="px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.18em] transition-all"
            style={{ background: dark, color: 'white', boxShadow: `0 6px 20px ${dark}30` }}>
            <Check size={12} className="inline mr-2" /> Marcar todas leídas
          </button>
        </motion.div>

        {/* TOP MOSAIC: hero + 24h wave */}
        <div className="grid grid-cols-12 gap-4">
          <motion.div variants={item} className="col-span-12 lg:col-span-5 rounded-2xl border-2 p-6 relative overflow-hidden"
            style={{ background: dark, borderColor: `${dark}33` }}>
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none" style={{ background: `${rosa}20`, filter: 'blur(80px)' }} />

            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: rosa, boxShadow: `0 0 10px ${rosa}`, animation: 'pulse-soft 1.4s ease-in-out infinite' }} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: rosa }}>● En vivo</span>
              </div>

              <div className="flex items-baseline gap-3">
                <p className="font-black tracking-tight text-white" style={{ fontSize: 'clamp(80px, 14vw, 140px)', lineHeight: 0.85, letterSpacing: '-0.05em' }}>
                  {conteo.pendientes}
                </p>
                <p className="text-2xl font-black uppercase tracking-tight" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  pendientes
                </p>
              </div>

              <div className="mt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <span>de {conteo.todas} totales</span>
                <span style={{ color: rosa }}>· {conteo.criticas} críticas</span>
              </div>

              {lastEvent && (
                <div className="mt-6 pt-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <p className="text-[9px] font-black uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.4)' }}>Último evento</p>
                  <p className="text-sm font-black uppercase tracking-tight text-white mt-1.5">{lastEvent.titulo}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{relTime(lastEvent.timestamp)}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* 24H WAVE */}
          <motion.div variants={item} className="col-span-12 lg:col-span-7 rounded-2xl border-2 p-5 relative overflow-hidden"
            style={{ background: 'white', borderColor: `${dark}33` }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: azul }}>◆ Pulse · últimas 24h</p>
                <h3 className="font-black uppercase tracking-tight text-2xl mt-1" style={{ color: dark }}>
                  Onda de eventos
                </h3>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: `${rosa}10` }}>
                <TrendingUp size={11} style={{ color: rosa }} />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: rosa }}>
                  Pico 14h
                </span>
              </div>
            </div>

            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full" style={{ height: 140 }}>
              <defs>
                <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={rosa} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={rosa} stopOpacity="0" />
                </linearGradient>
              </defs>

              {[25, 50, 75].map((y) => (
                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke={`${dark}10`} strokeWidth="0.2" strokeDasharray="0.5,0.5" />
              ))}

              <polygon points={waveArea} fill="url(#waveGrad)" />
              <polyline points={wavePoints} fill="none" stroke={rosa} strokeWidth="0.7" strokeLinejoin="round" />

              {wave.map((v, i) => v > 0 && (
                <circle key={i}
                  cx={(i / (wave.length - 1)) * 100}
                  cy={100 - (v / waveMax) * 90}
                  r="0.8" fill={rosa} stroke="white" strokeWidth="0.3" />
              ))}
            </svg>

            <div className="grid grid-cols-12 mt-2 gap-0">
              {[0, 4, 8, 12, 16, 20, 24].map((h) => (
                <span key={h} className="text-[8px] font-black uppercase tracking-[0.15em] text-center"
                  style={{ color: grey, gridColumn: `span 2` }}>
                  {h}h
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* KPI ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Pendientes', value: conteo.pendientes, color: rosa, Icon: Bell },
            { label: 'Críticas', value: conteo.criticas, color: '#EF4444', Icon: AlertTriangle },
            { label: 'Resueltas', value: conteo.leidas, color: '#22C55E', Icon: ShieldCheck },
            { label: 'Total', value: conteo.todas, color: azul, Icon: Radio },
          ].map((k) => (
            <motion.div key={k.label} variants={item} className="rounded-2xl p-4 border-2" style={{ background: 'white', borderColor: `${dark}33` }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${k.color}15`, border: `1.5px solid ${k.color}30` }}>
                  <k.Icon size={15} style={{ color: k.color }} />
                </div>
                {k.label === 'Pendientes' && k.value > 0 && (
                  <span className="w-2 h-2 rounded-full" style={{ background: k.color, animation: 'pulse-soft 2s ease-in-out infinite', boxShadow: `0 0 8px ${k.color}80` }} />
                )}
              </div>
              <p className="text-4xl font-black tracking-tight" style={{ color: dark, letterSpacing: '-0.04em' }}>{k.value}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mt-1" style={{ color: grey }}>{k.label}</p>
            </motion.div>
          ))}
        </div>

        {/* MID MOSAIC: heatmap + types + donut */}
        <div className="grid grid-cols-12 gap-4">
          {/* HEATMAP */}
          <motion.div variants={item} className="col-span-12 md:col-span-6 lg:col-span-5 rounded-2xl border-2 p-5"
            style={{ background: 'white', borderColor: `${dark}33` }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: rosa }}>✦ Densidad</p>
                <h3 className="font-black uppercase tracking-tight text-xl mt-1" style={{ color: dark }}>14 días</h3>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[8px] font-black uppercase tracking-[0.15em]" style={{ color: grey }}>menos</span>
                {[0.1, 0.3, 0.55, 0.8, 1].map((a) => (
                  <span key={a} className="w-2 h-2 rounded-sm" style={{ background: `${rosa}${Math.floor(a * 255).toString(16).padStart(2, '0')}` }} />
                ))}
                <span className="text-[8px] font-black uppercase tracking-[0.15em]" style={{ color: grey }}>más</span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {heatmap.map((d) => {
                const intensity = d.count / heatmapMax;
                const a = intensity === 0 ? 0.06 : Math.max(0.15, intensity);
                const bg = intensity === 0
                  ? `${dark}08`
                  : `${rosa}${Math.floor(a * 255).toString(16).padStart(2, '0')}`;
                return (
                  <div key={d.date} className="relative group aspect-square rounded-md flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                    style={{ background: bg, border: intensity > 0 ? `1px solid ${rosa}40` : `1px solid ${dark}10` }}>
                    <span className="text-[9px] font-black" style={{ color: intensity > 0.4 ? 'white' : grey }}>
                      {d.label}
                    </span>
                    {d.count > 0 && (
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 hidden group-hover:block z-10 pointer-events-none">
                        <div className="px-2 py-1 rounded text-[9px] font-black uppercase tracking-[0.15em] whitespace-nowrap"
                          style={{ background: dark, color: 'white' }}>
                          {d.count} alerta{d.count !== 1 ? 's' : ''}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>
              <Activity size={11} />
              <span>{heatmap.reduce((s, d) => s + d.count, 0)} eventos en 14d</span>
            </div>
          </motion.div>

          {/* TYPE BREAKDOWN */}
          <motion.div variants={item} className="col-span-12 md:col-span-6 lg:col-span-4 rounded-2xl border-2 p-5"
            style={{ background: 'white', borderColor: `${dark}33` }}>
            <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: azul }}>◆ Por categoría</p>
            <h3 className="font-black uppercase tracking-tight text-xl mt-1 mb-4" style={{ color: dark }}>
              Distribución
            </h3>

            <div className="space-y-3">
              {byType.length === 0 ? (
                <p className="text-xs" style={{ color: grey }}>Sin datos</p>
              ) : byType.map((t) => {
                const pct = (t.count / typeMax) * 100;
                const Icon = iconosTipo[t.type] || Bell;
                const color = tipoColor[t.type] || grey;
                return (
                  <div key={t.type}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <Icon size={11} style={{ color }} />
                        <span className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: dark }}>
                          {tipoLabel[t.type]}
                        </span>
                      </div>
                      <span className="text-[10px] font-black tracking-tight" style={{ color: dark }}>
                        {t.count}
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: `${dark}08` }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: 'easeOut' as const }}
                        className="h-full rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}40` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* SEVERITY DONUT */}
          <motion.div variants={item} className="col-span-12 lg:col-span-3 rounded-2xl border-2 p-5"
            style={{ background: 'white', borderColor: `${dark}33` }}>
            <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: rosa }}>✦ Severidad</p>
            <h3 className="font-black uppercase tracking-tight text-xl mt-1 mb-3" style={{ color: dark }}>
              Reparto
            </h3>

            <div className="relative w-full aspect-square max-w-[180px] mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke={`${dark}08`} strokeWidth="14" />
                {donutSegments.map((s) => {
                  const C = 2 * Math.PI * 40;
                  return (
                    <circle key={s.sev}
                      cx="50" cy="50" r="40" fill="none" stroke={s.color} strokeWidth="14"
                      strokeDasharray={`${s.pct * C} ${C}`}
                      strokeDashoffset={-s.offsetPct * C}
                      style={{ transition: 'all 0.7s ease' }} />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black tracking-tight" style={{ color: dark }}>{sevTotal}</span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>total</span>
              </div>
            </div>

            <div className="mt-4 space-y-1.5">
              {donutSegments.map((s) => (
                <div key={s.sev} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-sm" style={{ background: s.color }} />
                    <span className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color: dark }}>
                      {sevLabel[s.sev]}
                    </span>
                  </div>
                  <span className="text-[10px] font-black tracking-tight" style={{ color: dark }}>{s.count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* SYSTEM PULSE */}
        <motion.div variants={item} className="rounded-2xl border-2 p-5 relative overflow-hidden"
          style={{ background: dark, borderColor: `${dark}33` }}>
          <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: `#22C55E25`, filter: 'blur(80px)' }} />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="absolute inset-0 rounded-full" style={{ background: '#22C55E', animation: 'pulse-ring 2s ease-out infinite', opacity: 0 }} />
                <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `#22C55E20`, border: `2px solid #22C55E40` }}>
                  <Zap size={20} style={{ color: '#22C55E' }} />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: '#22C55E' }}>◉ Sistema operativo</p>
                <h3 className="font-black uppercase tracking-tight text-2xl text-white mt-1">
                  Todo bajo
                  <span className="italic font-light" style={{ color: '#22C55E' }}> control</span>
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'CPU', value: '32%' },
                { label: 'Latencia', value: '24ms' },
                { label: 'Uptime', value: '99.8%' },
              ].map((m) => (
                <div key={m.label}>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.4)' }}>{m.label}</p>
                  <p className="text-xl font-black tracking-tight text-white">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FILTER + FEED */}
        <motion.div variants={item} className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-3">
            <div className="lg:sticky lg:top-24 rounded-2xl border-2 p-4 space-y-2"
              style={{ background: 'white', borderColor: `${dark}33` }}>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-2" style={{ color: grey }}>Filtros</p>
              {filtros.map((f) => {
                const active = filtroActivo === f.valor;
                return (
                  <button key={f.valor} onClick={() => setFiltroActivo(f.valor)}
                    className="w-full text-left flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.18em] transition-all"
                    style={{
                      background: active ? f.accent : 'transparent',
                      color: active ? 'white' : dark,
                      border: active ? 'none' : `1.5px solid ${dark}15`,
                      boxShadow: active ? `0 4px 14px ${f.accent}40` : 'none',
                    }}>
                    <span>{f.etiqueta}</span>
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full"
                      style={{ background: active ? 'rgba(255,255,255,0.25)' : `${dark}08`, color: active ? 'white' : grey }}>
                      {conteo[f.valor]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <AnimatePresence>
                {filtradas.length === 0 ? (
                  <div className="col-span-full rounded-2xl border-2 p-12 text-center" style={{ background: 'white', borderColor: `${dark}33` }}>
                    <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-3" style={{ background: `${dark}05` }}>
                      <ShieldCheck size={24} style={{ color: '#22C55E' }} />
                    </div>
                    <p className="font-black uppercase tracking-tight text-lg" style={{ color: dark }}>
                      Sin alertas
                    </p>
                    <p className="text-xs mt-1" style={{ color: grey }}>No hay alertas en este filtro</p>
                  </div>
                ) : (
                  filtradas.map((alerta) => {
                    const color = sevColor[alerta.gravedad];
                    const Icon = iconosTipo[alerta.tipo] || Bell;
                    const muted = silenciadas[alerta.id];
                    const date = new Date(alerta.timestamp);
                    return (
                      <motion.div key={alerta.id} layout
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="rounded-2xl border-2 overflow-hidden group transition-all duration-200 hover:shadow-lg flex"
                        style={{
                          background: 'white',
                          borderColor: `${dark}33`,
                          opacity: muted ? 0.5 : 1,
                        }}>
                        <div className="w-1.5 shrink-0" style={{ background: color }} />

                        <div className="flex-1 p-4 flex gap-3">
                          <div className="shrink-0 text-center pr-3 border-r" style={{ borderColor: `${dark}15` }}>
                            <p className="text-2xl font-black tracking-tight" style={{ color: dark, lineHeight: 1, letterSpacing: '-0.04em' }}>
                              {date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }).split(':')[0]}
                            </p>
                            <p className="text-[10px] font-black tracking-tight" style={{ color: dark, lineHeight: 1 }}>
                              :{date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }).split(':')[1]}
                            </p>
                            <p className="text-[8px] font-black uppercase tracking-[0.15em] mt-1" style={{ color: grey }}>
                              {date.getDate()}/{(date.getMonth() + 1).toString().padStart(2, '0')}
                            </p>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                              <div className="w-6 h-6 rounded-md flex items-center justify-center"
                                style={{ background: `${color}15`, color }}>
                                <Icon size={11} />
                              </div>
                              <span className="text-[8px] font-black uppercase tracking-[0.18em] px-1.5 py-0.5 rounded"
                                style={{ background: `${color}10`, color }}>
                                {sevLabel[alerta.gravedad]}
                              </span>
                              {!alerta.leida && (
                                <span className="text-[8px] font-black uppercase tracking-[0.18em] px-1.5 py-0.5 rounded"
                                  style={{ background: rosa, color: 'white' }}>
                                  Nuevo
                                </span>
                              )}
                              <span className="text-[9px] font-bold uppercase tracking-[0.15em] ml-auto" style={{ color: grey }}>
                                <Clock size={9} className="inline mr-0.5 -mt-0.5" />{relTime(alerta.timestamp)}
                              </span>
                            </div>
                            <h4 className="font-black uppercase tracking-tight text-sm" style={{ color: dark, lineHeight: 1.1 }}>
                              {alerta.titulo}
                            </h4>
                            <p className="text-[11px] mt-1 leading-snug line-clamp-2" style={{ color: grey }}>
                              {alerta.descripcion}
                            </p>

                            <div className="mt-3 flex items-center gap-1.5">
                              {!alerta.leida && (
                                <button onClick={() => marcarLeida(alerta.id)}
                                  className="text-[9px] font-black uppercase tracking-[0.18em] px-2.5 py-1.5 rounded-full transition-all"
                                  style={{ background: `${color}10`, color }}>
                                  <Check size={10} className="inline mr-1" /> Leída
                                </button>
                              )}
                              <button onClick={() => toggleSilenciar(alerta.id)}
                                className="text-[9px] font-black uppercase tracking-[0.18em] px-2.5 py-1.5 rounded-full transition-all"
                                style={{ background: muted ? `${rosa}10` : `${dark}05`, color: muted ? rosa : grey }}>
                                <BellOff size={10} className="inline mr-1" /> {muted ? 'Activar' : 'Silenciar'}
                              </button>
                              <button onClick={() => eliminar(alerta.id)}
                                className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-full flex items-center justify-center"
                                style={{ background: '#EF444410', color: '#EF4444' }}>
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
