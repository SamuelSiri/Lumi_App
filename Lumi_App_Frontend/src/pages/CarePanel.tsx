import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Plus, Check, Play,
  AlertTriangle, Heart, Battery, Navigation,
  Shield, Info, Zap, Mic, MapPin, Camera,
  User, RotateCw, Pill, ClipboardList,
} from 'lucide-react';
import { rutinas, recordatorios, alertas } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import LeafletMap from '../components/ui/LeafletMap';

type TabKey = 'rutinas' | 'medicacion' | 'camara' | 'historial' | 'voz' | 'zonas';

const rosa = '#FD4282';
const azul = '#3F50B3';
const dark = '#0a0a12';
const grey = '#8a8a8a';

const ctn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } };

const pillTabs: { key: TabKey; label: string; Icon: React.ElementType; accent: string }[] = [
  { key: 'rutinas', label: 'Rutinas', Icon: RotateCw, accent: rosa },
  { key: 'medicacion', label: 'Medicación', Icon: Pill, accent: rosa },
  { key: 'camara', label: 'Cámara', Icon: Camera, accent: azul },
  { key: 'historial', label: 'Historial', Icon: ClipboardList, accent: azul },
  { key: 'voz', label: 'Voz', Icon: Mic, accent: rosa },
  { key: 'zonas', label: 'Zonas', Icon: MapPin, accent: azul },
];

function SectionLabel({ num, title, accent = rosa }: { num: string; title: string; accent?: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: accent }}>
        {num}
      </span>
      <span className="h-px flex-1 max-w-[40px]" style={{ background: `${dark}15` }} />
      <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: dark }}>
        {title}
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   RUTINAS
   ════════════════════════════════════════════════════════════ */
function TabRutinas() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activas, setActivas] = useLocalStorage<Record<string, boolean>>(
    'rutinas:activas',
    Object.fromEntries(rutinas.map((r) => [r.id, r.activa])),
  );
  const [checkedSteps, setCheckedSteps] = useLocalStorage<Record<string, boolean>>(
    'rutinas:pasos',
    Object.fromEntries(rutinas.flatMap((r) => r.pasos.map((p) => [p.id, p.completado]))),
  );

  const toggleStep = (id: string) => setCheckedSteps((p) => ({ ...p, [id]: !p[id] }));

  // Global progress
  const allSteps = rutinas.flatMap((r) => r.pasos);
  const globalCompleted = allSteps.filter((p) => checkedSteps[p.id]).length;
  const globalTotal = allSteps.length;
  const globalPct = globalTotal > 0 ? Math.round((globalCompleted / globalTotal) * 100) : 0;
  const activasCount = Object.values(activas).filter(Boolean).length;

  // Mock weekly heatmap (7 days × 4 routines)
  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const weekHeat = Array.from({ length: 7 }, (_, d) =>
    Array.from({ length: rutinas.length }, (_, r) => {
      // Today is partial, past days are mostly complete
      if (d === 6) return r === 0 ? 1 : r === 1 ? 0.6 : 0;
      return Math.random() > 0.2 ? 1 : Math.random() > 0.5 ? 0.6 : 0.3;
    }),
  );

  // Time-of-day strip
  const horasRutinas = rutinas.map((r) => {
    const [h] = r.horario.split(':').map(Number);
    return { id: r.id, name: r.nombre, hour: h, activa: activas[r.id] };
  });

  return (
    <motion.div variants={ctn} initial="hidden" animate="show" className="space-y-5">
      {/* HERO MOSAIC: progress ring + weekly heatmap + time strip */}
      <div className="grid grid-cols-12 gap-4">
        {/* Hero progress dark */}
        <motion.div variants={item} className="col-span-12 lg:col-span-4 rounded-2xl border-2 p-6 relative overflow-hidden"
          style={{ background: dark, borderColor: `${dark}33` }}>
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: `${rosa}25`, filter: 'blur(80px)' }} />

          <div className="relative">
            <p className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: rosa }}>✦ Hoy</p>
            <p className="font-black tracking-tight text-white mt-2" style={{ fontSize: 'clamp(56px, 9vw, 92px)', lineHeight: 0.85, letterSpacing: '-0.05em' }}>
              {globalPct}<span className="text-2xl ml-1" style={{ color: 'rgba(255,255,255,0.5)' }}>%</span>
            </p>
            <p className="text-sm font-black uppercase tracking-tight" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {globalCompleted} de {globalTotal} pasos
            </p>

            {/* Linear progress */}
            <div className="mt-4 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${globalPct}%` }}
                transition={{ duration: 0.8 }} className="h-full rounded-full"
                style={{ background: globalPct === 100 ? '#22C55E' : rosa, boxShadow: `0 0 10px ${globalPct === 100 ? '#22C55E' : rosa}` }} />
            </div>

            <div className="mt-5 pt-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.4)' }}>Activas</p>
                  <p className="text-xl font-black mt-0.5" style={{ color: '#22C55E' }}>{activasCount}</p>
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.4)' }}>Total</p>
                  <p className="text-xl font-black mt-0.5 text-white">{rutinas.length}</p>
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.4)' }}>Racha</p>
                  <p className="text-xl font-black mt-0.5" style={{ color: rosa }}>5d</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* WEEKLY HEATMAP */}
        <motion.div variants={item} className="col-span-12 md:col-span-7 lg:col-span-5 rounded-2xl border-2 p-5"
          style={{ background: 'white', borderColor: `${dark}33` }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: azul }}>◆ Semana</p>
              <h3 className="font-black uppercase tracking-tight text-xl mt-1" style={{ color: dark }}>Cumplimiento</h3>
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>7d × {rutinas.length} rutinas</span>
          </div>

          <div className="grid gap-1.5" style={{ gridTemplateColumns: `auto repeat(${rutinas.length}, 1fr)` }}>
            <div />
            {rutinas.map((r) => (
              <div key={r.id} className="text-center">
                <span className="text-[8px] font-black uppercase tracking-[0.15em]" style={{ color: grey }}>
                  {r.nombre.split(' ').pop()?.slice(0, 4)}
                </span>
              </div>
            ))}

            {weekDays.map((day, di) => (
              <div key={di} className="contents">
                <div className="flex items-center justify-end pr-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color: di === 6 ? rosa : grey }}>
                    {day}
                  </span>
                </div>
                {weekHeat[di].map((v, ri) => (
                  <div key={ri} className="aspect-square rounded-md transition-all hover:scale-110"
                    style={{
                      background: v === 0
                        ? `${dark}05`
                        : v === 1
                          ? '#22C55E'
                          : `${rosa}${Math.floor(v * 255).toString(16).padStart(2, '0')}`,
                      border: `1px solid ${v === 0 ? `${dark}10` : v === 1 ? '#22C55E' : `${rosa}60`}`,
                      boxShadow: v === 1 ? `0 0 6px #22C55E40` : 'none',
                    }} />
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* TIME-OF-DAY STRIP */}
        <motion.div variants={item} className="col-span-12 md:col-span-5 lg:col-span-3 rounded-2xl border-2 p-5"
          style={{ background: 'white', borderColor: `${dark}33` }}>
          <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: rosa }}>✦ Día</p>
          <h3 className="font-black uppercase tracking-tight text-xl mt-1 mb-4" style={{ color: dark }}>Línea de tiempo</h3>

          <div className="relative h-20 rounded-xl overflow-hidden" style={{ background: `${dark}05` }}>
            {/* Hour ticks */}
            {[0, 6, 12, 18, 24].map((h) => (
              <div key={h} className="absolute top-0 bottom-0 flex flex-col items-center"
                style={{ left: `${(h / 24) * 100}%`, transform: 'translateX(-50%)' }}>
                <div className="w-px h-2" style={{ background: `${dark}20` }} />
                <span className="text-[7px] font-black uppercase tracking-[0.1em] mt-0.5" style={{ color: grey }}>
                  {h}h
                </span>
              </div>
            ))}

            {/* Routine markers */}
            {horasRutinas.map((r, i) => (
              <div key={r.id} className="absolute top-1/2 -translate-y-1/2 z-10"
                style={{ left: `${(r.hour / 24) * 100}%`, transform: 'translate(-50%, -50%)' }}>
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full"
                    style={{
                      background: r.activa ? rosa : `${dark}25`,
                      boxShadow: r.activa ? `0 0 8px ${rosa}` : 'none',
                    }} />
                </div>
                <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[7px] font-black uppercase tracking-[0.1em] whitespace-nowrap"
                  style={{ color: r.activa ? dark : grey, marginTop: i % 2 ? 4 : 0 }}>
                  {r.hour}h
                </span>
              </div>
            ))}

            {/* Now indicator */}
            <div className="absolute top-0 bottom-0" style={{ left: `${(new Date().getHours() / 24) * 100}%` }}>
              <div className="w-px h-full" style={{ background: rosa }} />
            </div>
          </div>

          <p className="text-[9px] font-black uppercase tracking-[0.2em] mt-4" style={{ color: grey }}>
            <span style={{ color: rosa }}>● {activasCount} activas</span> · <span style={{ color: '#22C55E' }}>● Hoy</span>
          </p>
        </motion.div>
      </div>

      <SectionLabel num="01" title="Rutinas activas" accent={rosa} />

      {rutinas.map((rutina) => {
        const completados = rutina.pasos.filter((p) => checkedSteps[p.id]).length;
        const total = rutina.pasos.length;
        const pct = total > 0 ? Math.round((completados / total) * 100) : 0;
        const expanded = expandedId === rutina.id;
        const activa = activas[rutina.id];

        return (
          <motion.div
            key={rutina.id}
            variants={item}
            layout
            className="rounded-2xl border overflow-hidden transition-all duration-300"
            style={{
              background: 'white',
              borderColor: `${dark}33`,
              boxShadow: activa ? `0 4px 20px ${rosa}10` : '0 1px 3px rgba(0,0,0,0.03)',
            }}
          >
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: activa ? rosa : `${dark}25`,
                        boxShadow: activa ? `0 0 10px ${rosa}80` : 'none',
                        animation: activa ? 'pulse-soft 2s ease-in-out infinite' : 'none',
                      }}
                    />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: activa ? rosa : grey }}>
                      {activa ? 'Activa' : 'Pausada'}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: grey }}>
                      · {rutina.horario}
                    </span>
                  </div>
                  <h3 className="font-black uppercase tracking-tight text-xl" style={{ color: dark, lineHeight: 1 }}>
                    {rutina.nombre}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: grey }}>
                    {rutina.descripcion}
                  </p>
                </div>
                <button
                  onClick={() => setActivas((p) => ({ ...p, [rutina.id]: !p[rutina.id] }))}
                  className="relative h-7 w-12 shrink-0 rounded-full transition-all duration-300"
                  style={{
                    background: activa ? rosa : `${dark}10`,
                    boxShadow: activa ? `0 0 18px ${rosa}50` : 'none',
                  }}
                  aria-label={activa ? 'Pausar' : 'Activar'}
                >
                  <motion.span layout className="block w-5 h-5 rounded-full bg-white shadow mt-1" style={{ marginLeft: activa ? 26 : 4 }} />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: `${dark}33` }}>
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.7, ease: 'easeOut' as const }}
                    style={{
                      background: pct === 100 ? '#22C55E' : rosa,
                      boxShadow: pct > 0 ? `0 0 10px ${pct === 100 ? '#22C55E' : rosa}50` : 'none',
                    }}
                  />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.1em]" style={{ color: dark }}>
                  {completados}/{total} · {pct}%
                </span>
              </div>

              <button
                onClick={() => setExpandedId(expanded ? null : rutina.id)}
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-200"
                style={{ color: azul }}
              >
                {expanded ? 'Ocultar pasos' : 'Ver pasos'}
                <ChevronDown size={12} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease' }} />
              </button>
            </div>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' as const }}
                  className="overflow-hidden"
                  style={{ borderTop: `1px solid ${dark}33`, background: `${dark}02` }}
                >
                  <ul className="p-5 space-y-3">
                    {rutina.pasos.map((paso, i) => {
                      const checked = checkedSteps[paso.id];
                      return (
                        <li key={paso.id} className="flex items-center gap-3">
                          <span className="text-[9px] font-black uppercase tracking-[0.15em] w-6" style={{ color: grey }}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <button
                            onClick={() => toggleStep(paso.id)}
                            className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all duration-200"
                            style={{
                              background: checked ? '#22C55E' : 'transparent',
                              border: `2px solid ${checked ? '#22C55E' : `${dark}18`}`,
                              boxShadow: checked ? `0 0 8px #22C55E60` : 'none',
                            }}
                          >
                            {checked && <Check size={11} className="text-white" strokeWidth={3} />}
                          </button>
                          <span
                            className="text-xs flex-1 transition-all duration-200"
                            style={{
                              color: checked ? grey : dark,
                              textDecoration: checked ? 'line-through' : 'none',
                            }}
                          >
                            {paso.accion}
                          </span>
                          {paso.duracion && (
                            <span
                              className="text-[9px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded-full"
                              style={{ background: `${azul}10`, color: azul }}
                            >
                              {paso.duracion}m
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      <motion.button
        variants={item}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300"
        style={{ background: dark, color: 'white', boxShadow: `0 8px 24px ${dark}25` }}
      >
        <Plus size={14} strokeWidth={3} /> Nueva rutina
      </motion.button>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   MEDICACIÓN
   ════════════════════════════════════════════════════════════ */
function TabMedicacion() {
  const medicaciones = recordatorios.filter((r) => r.tipo === 'medicacion');
  const [tomadosMap, setTomadosMap] = useLocalStorage<Record<string, boolean>>(
    'medicaciones:tomados',
    Object.fromEntries(medicaciones.map((m) => [m.id, m.completado])),
  );
  const toggleTomado = (id: string) => setTomadosMap((p) => ({ ...p, [id]: !p[id] }));
  const tomados = medicaciones.filter((m) => tomadosMap[m.id]).length;
  const total = medicaciones.length;
  const pct = total > 0 ? Math.round((tomados / total) * 100) : 0;

  // Weekly adherence (mock + today live)
  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const weeklyAdherence = [95, 100, 88, 100, 92, 75, pct];

  // By time of day
  const tiempos = medicaciones.map((m) => {
    const h = parseInt(m.hora.split(':')[0]);
    const slot = h < 11 ? 'morning' : h < 17 ? 'afternoon' : 'evening';
    return slot;
  });
  const tiempoCount = {
    morning: tiempos.filter((s) => s === 'morning').length,
    afternoon: tiempos.filter((s) => s === 'afternoon').length,
    evening: tiempos.filter((s) => s === 'evening').length,
  };

  return (
    <motion.div variants={ctn} initial="hidden" animate="show" className="space-y-5">
      {/* HERO MOSAIC: ring + weekly bar + tipos */}
      <div className="grid grid-cols-12 gap-4">
        <motion.div variants={item} className="col-span-12 lg:col-span-5 rounded-2xl border-2 p-6 relative overflow-hidden flex items-center gap-5"
          style={{ background: dark, borderColor: `${dark}33` }}>
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: `${rosa}25`, filter: 'blur(80px)' }} />

          <div className="relative w-32 h-32 shrink-0">
            <svg width={128} height={128} className="rotate-[-90deg]">
              <circle cx={64} cy={64} r={54} fill="none" stroke={`rgba(255,255,255,0.1)`} strokeWidth={10} />
              <circle cx={64} cy={64} r={54} fill="none"
                stroke={pct === 100 ? '#22C55E' : rosa} strokeWidth={10} strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 54}
                strokeDashoffset={2 * Math.PI * 54 - (2 * Math.PI * 54 * pct) / 100}
                style={{ transition: 'stroke-dashoffset 1s ease', filter: `drop-shadow(0 0 6px ${pct === 100 ? '#22C55E' : rosa})` }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black tracking-tight text-white" style={{ letterSpacing: '-0.04em' }}>{pct}%</span>
              <span className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.5)' }}>adherencia</span>
            </div>
          </div>

          <div className="relative flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: pct === 100 ? '#22C55E' : rosa }}>
              ✦ {pct === 100 ? 'Completado' : 'Hoy'}
            </p>
            <p className="font-black tracking-tight text-white mt-2" style={{ fontSize: 32, lineHeight: 1, letterSpacing: '-0.04em' }}>
              {tomados}<span className="text-base ml-1" style={{ color: 'rgba(255,255,255,0.5)' }}>/ {total}</span>
            </p>
            <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {total - tomados === 0 ? 'Todos los medicamentos tomados' : `Faltan ${total - tomados} por tomar`}
            </p>
          </div>
        </motion.div>

        {/* WEEKLY BARS */}
        <motion.div variants={item} className="col-span-12 md:col-span-6 lg:col-span-4 rounded-2xl border-2 p-5"
          style={{ background: 'white', borderColor: `${dark}33` }}>
          <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: azul }}>◆ Adherencia semanal</p>
          <h3 className="font-black uppercase tracking-tight text-xl mt-1 mb-4" style={{ color: dark }}>
            7 días
          </h3>

          <div className="flex items-end gap-1.5 h-24">
            {weeklyAdherence.map((v, i) => {
              const isToday = i === 6;
              const color = v >= 90 ? '#22C55E' : v >= 70 ? '#F59E0B' : '#EF4444';
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col justify-end relative" style={{ height: 80 }}>
                    <motion.div initial={{ height: 0 }} animate={{ height: `${v * 0.8}%` }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className="w-full rounded-t-md relative"
                      style={{
                        background: color,
                        boxShadow: isToday ? `0 0 12px ${color}` : 'none',
                        opacity: isToday ? 1 : 0.7,
                      }}>
                      {isToday && (
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-[0.15em]" style={{ color }}>
                          {v}%
                        </span>
                      )}
                    </motion.div>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.1em]" style={{ color: isToday ? rosa : grey }}>
                    {weekDays[i]}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-[9px] font-black uppercase tracking-[0.2em] mt-3 pt-3" style={{ color: grey, borderTop: `1px solid ${dark}10` }}>
            Promedio: <span style={{ color: dark }}>{Math.round(weeklyAdherence.reduce((s, v) => s + v, 0) / 7)}%</span>
          </p>
        </motion.div>

        {/* TIPOS */}
        <motion.div variants={item} className="col-span-12 md:col-span-6 lg:col-span-3 rounded-2xl border-2 p-5"
          style={{ background: 'white', borderColor: `${dark}33` }}>
          <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: rosa }}>✦ Por momento</p>
          <h3 className="font-black uppercase tracking-tight text-xl mt-1 mb-4" style={{ color: dark }}>
            Reparto
          </h3>

          <div className="space-y-2.5">
            {[
              { key: 'morning', label: 'Mañana', count: tiempoCount.morning, emoji: '☀', color: '#F59E0B' },
              { key: 'afternoon', label: 'Tarde', count: tiempoCount.afternoon, emoji: '⌖', color: rosa },
              { key: 'evening', label: 'Noche', count: tiempoCount.evening, emoji: '◐', color: azul },
            ].map((t) => (
              <div key={t.key} className="flex items-center gap-2 p-2 rounded-lg"
                style={{ background: `${t.color}10`, border: `1.5px solid ${t.color}30` }}>
                <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-sm font-black"
                  style={{ background: t.color }}>
                  {t.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: dark }}>{t.label}</p>
                </div>
                <p className="text-2xl font-black tracking-tight" style={{ color: dark, letterSpacing: '-0.04em' }}>{t.count}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <SectionLabel num="02" title="Línea de tiempo · Hoy" accent={rosa} />

      {/* Timeline */}
      <motion.div variants={item} className="relative pl-8">
        <div className="absolute left-[15px] top-3 bottom-3 w-px" style={{ background: `${dark}10` }} />

        <div className="space-y-4">
          {medicaciones.map((med) => {
            const tomado = tomadosMap[med.id];
            const color = tomado ? '#22C55E' : rosa;
            return (
              <motion.div key={med.id} variants={item} className="relative flex items-start gap-4">
                <div className="absolute -left-8 top-3 z-10">
                  <div
                    className="w-3.5 h-3.5 rounded-full border-[3px] border-white"
                    style={{
                      background: color,
                      boxShadow: `0 0 12px ${color}80`,
                      animation: !tomado ? 'pulse-soft 2.2s ease-in-out infinite' : 'none',
                    }}
                  />
                </div>
                <div className="w-14 shrink-0 pt-1">
                  <span className="font-black uppercase tracking-tight text-base" style={{ color: dark }}>
                    {med.hora}
                  </span>
                </div>
                <button
                  onClick={() => toggleTomado(med.id)}
                  className="flex-1 text-left rounded-2xl p-4 border transition-all duration-200 hover:shadow-md"
                  style={{
                    background: 'white',
                    borderColor: `${dark}33`,
                    boxShadow: !tomado ? `0 2px 12px ${rosa}10` : 'none',
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-black uppercase tracking-tight text-sm" style={{ color: dark }}>
                      {med.titulo}
                    </h4>
                    <span
                      className="text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full"
                      style={{
                        background: tomado ? `#22C55E12` : `${rosa}10`,
                        color: tomado ? '#22C55E' : rosa,
                      }}
                    >
                      {tomado ? '✓ Tomado' : 'Marcar tomado'}
                    </span>
                  </div>
                  {med.descripcion && (
                    <p className="text-xs" style={{ color: grey }}>
                      {med.descripcion}
                    </p>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   CÁMARA
   ════════════════════════════════════════════════════════════ */
function TabCamara() {
  const camaras = [
    { nombre: 'Sala', activa: true },
    { nombre: 'Cocina', activa: true },
    { nombre: 'Habitación', activa: true },
    { nombre: 'Jardín', activa: false },
  ];

  return (
    <motion.div variants={ctn} initial="hidden" animate="show" className="space-y-6">
      <SectionLabel num="03" title="Cámaras en vivo" accent={azul} />

      <motion.div
        variants={item}
        className="relative rounded-2xl aspect-video flex items-center justify-center overflow-hidden"
        style={{ background: dark }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Scan lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px)',
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />

        {/* Center play */}
        <div className="relative flex flex-col items-center gap-4 z-10">
          <div className="relative">
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: rosa, animation: 'pulse-ring 2s ease-out infinite', opacity: 0 }}
            />
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="relative w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: rosa, boxShadow: `0 0 40px ${rosa}60` }}
            >
              <Play size={28} className="text-white ml-1" fill="white" />
            </motion.button>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
            Toca para reproducir
          </span>
        </div>

        {/* Live badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full px-3 py-1.5 z-10" style={{ background: rosa, boxShadow: `0 0 20px ${rosa}50` }}>
          <span className="w-1.5 h-1.5 rounded-full bg-white" style={{ animation: 'pulse-soft 1.4s ease-in-out infinite' }} />
          <span className="text-white text-[10px] font-black uppercase tracking-[0.25em]">En vivo</span>
        </div>

        {/* Room label */}
        <div className="absolute bottom-4 right-4 rounded-full px-3 py-1.5 z-10 flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Camera size={11} className="text-white/70" />
          <span className="text-white/90 text-[10px] font-bold uppercase tracking-[0.2em]">Sala principal</span>
        </div>

        {/* Timestamp */}
        <div className="absolute top-4 right-4 z-10 text-right">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">REC · 14:23:08</p>
        </div>
      </motion.div>

      {/* Thumbnails */}
      <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {camaras.map((cam) => (
          <motion.button
            key={cam.nombre}
            whileHover={{ y: -3 }}
            className="rounded-2xl p-3 text-left group transition-all duration-300"
            style={{ background: dark, boxShadow: `0 4px 12px ${dark}20` }}
          >
            <div
              className="rounded-xl aspect-square flex items-center justify-center mb-3 relative overflow-hidden"
              style={{ background: cam.activa ? `${azul}25` : `${dark}80` }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                  backgroundSize: '12px 12px',
                }}
              />
              <Camera size={20} className="relative" style={{ color: cam.activa ? azul : '#666' }} />
              {cam.activa && (
                <span
                  className="absolute top-2 right-2 w-2 h-2 rounded-full"
                  style={{ background: '#22C55E', boxShadow: '0 0 8px #22C55E80' }}
                />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white">
                {cam.nombre}
              </span>
              <span
                className="text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full"
                style={{
                  background: cam.activa ? `#22C55E20` : 'rgba(255,255,255,0.05)',
                  color: cam.activa ? '#22C55E' : '#666',
                }}
              >
                {cam.activa ? 'On' : 'Off'}
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        variants={item}
        className="flex items-center justify-center gap-2.5 rounded-2xl py-3.5 px-4 border"
        style={{ background: `${azul}06`, borderColor: `${azul}15` }}
      >
        <Shield size={14} style={{ color: azul }} />
        <p className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: azul }}>
          Procesamiento local · Privacidad protegida
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   HISTORIAL
   ════════════════════════════════════════════════════════════ */
function TabHistorial() {
  const iconoPorTipo: Record<string, React.ReactNode> = {
    salud: <Heart size={14} />,
    medicacion: <Pill size={14} />,
    bateria: <Battery size={14} />,
    zona: <Navigation size={14} />,
    caida: <AlertTriangle size={14} />,
    sistema: <Zap size={14} />,
  };

  const sevColor: Record<string, string> = {
    critica: '#EF4444',
    alta: rosa,
    media: azul,
    baja: '#F59E0B',
    info: grey,
  };

  const sevLabel: Record<string, string> = {
    critica: 'Crítica',
    alta: 'Alta',
    media: 'Media',
    baja: 'Baja',
    info: 'Info',
  };

  const hoy = new Date('2026-03-23');
  const ayer = new Date('2026-03-22');

  function etiquetaFecha(ts: string): string {
    const d = new Date(ts);
    if (d.toDateString() === hoy.toDateString()) return 'Hoy';
    if (d.toDateString() === ayer.toDateString()) return 'Ayer';
    return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  const grupos: Record<string, typeof alertas> = {};
  alertas.forEach((a) => {
    const label = etiquetaFecha(a.timestamp);
    if (!grupos[label]) grupos[label] = [];
    grupos[label].push(a);
  });

  return (
    <motion.div variants={ctn} initial="hidden" animate="show" className="space-y-8">
      <SectionLabel num="04" title="Historial completo" accent={azul} />

      {Object.entries(grupos).map(([fecha, items], gi) => (
        <motion.div key={fecha} variants={item} className="space-y-3">
          <div className="flex items-baseline gap-3 mb-4">
            <h3
              className="font-black uppercase tracking-tight"
              style={{ fontSize: 32, lineHeight: 1, color: dark, letterSpacing: '-0.04em' }}
            >
              {fecha}
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: grey }}>
              · {String(gi + 1).padStart(2, '0')} / {items.length} eventos
            </span>
          </div>

          <div className="space-y-2.5">
            {items.map((alerta) => {
              const hora = new Date(alerta.timestamp).toLocaleTimeString('es-MX', {
                hour: '2-digit',
                minute: '2-digit',
              });
              const color = sevColor[alerta.gravedad];

              return (
                <motion.div
                  key={alerta.id}
                  variants={item}
                  className="rounded-2xl p-4 flex gap-4 border-l-[3px] border transition-all duration-200 hover:shadow-md"
                  style={{
                    background: 'white',
                    borderColor: `${dark}33`,
                    borderLeftColor: color,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}10`, color }}
                  >
                    {iconoPorTipo[alerta.tipo] ?? <Info size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: dark }}>
                        {hora}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full" style={{ background: `${color}10`, color }}>
                        {sevLabel[alerta.gravedad]}
                      </span>
                    </div>
                    <h4 className="font-black uppercase tracking-tight text-sm" style={{ color: dark }}>
                      {alerta.titulo}
                    </h4>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: grey }}>
                      {alerta.descripcion}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   VOZ
   ════════════════════════════════════════════════════════════ */
function TabVoz() {
  const conversaciones = [
    {
      usuario: '¿Cómo te sientes hoy, Lumi?',
      lumi: 'Me siento muy bien. Hoy detecté que abuelita Rosa durmió 7 horas completas. Excelente descanso.',
    },
    {
      usuario: 'Recuérdame su medicina de las 12',
      lumi: 'Claro, ya tengo configurado el recordatorio de Losartán 50mg para las 12:00. Te notificaré cuando sea la hora.',
    },
    {
      usuario: 'Cuéntale algo bonito a abuelita',
      lumi: 'Las mariposas monarca viajan miles de kilómetros y siempre encuentran el camino a casa. Igual que el cariño de tu familia.',
    },
  ];

  // Mock waveform 24 bars
  const waveform = Array.from({ length: 32 }, (_, i) => 0.3 + Math.abs(Math.sin(i * 0.7)) * 0.7);

  // Stats
  const stats = [
    { label: 'Conversaciones', value: '12', sub: 'hoy', color: rosa },
    { label: 'Palabras', value: '847', sub: 'en total', color: azul },
    { label: 'Tono', value: 'Cálido', sub: 'positivo', color: '#22C55E' },
  ];

  const sugerencias = [
    'Cuéntame un cuento',
    '¿Cómo está el clima?',
    'Toca música relajante',
    'Recuérdame tomar agua',
    'Llama a Carlos',
  ];

  return (
    <motion.div variants={ctn} initial="hidden" animate="show" className="space-y-5">
      {/* HERO MOSAIC: stats + waveform card + sugerencias */}
      <div className="grid grid-cols-12 gap-4">
        {/* Stats column */}
        <div className="col-span-12 lg:col-span-3 grid grid-cols-3 lg:grid-cols-1 gap-3">
          {stats.map((s) => (
            <motion.div key={s.label} variants={item} className="rounded-2xl border-2 p-4"
              style={{ background: 'white', borderColor: `${dark}33` }}>
              <p className="text-[9px] font-black uppercase tracking-[0.25em]" style={{ color: s.color }}>
                ● {s.label}
              </p>
              <p className="text-3xl font-black tracking-tight mt-1" style={{ color: dark, letterSpacing: '-0.04em' }}>
                {s.value}
              </p>
              <p className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Mic + waveform centerpiece */}
        <motion.div variants={item} className="col-span-12 lg:col-span-9 rounded-2xl border-2 p-6 relative overflow-hidden"
          style={{ background: dark, borderColor: `${dark}33` }}>
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none" style={{ background: `${rosa}25`, filter: 'blur(100px)' }} />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none" style={{ background: `${azul}25`, filter: 'blur(100px)' }} />

          <div className="relative grid grid-cols-12 gap-6 items-center">
            {/* Mic */}
            <div className="col-span-12 sm:col-span-4 flex flex-col items-center text-center">
              <div className="relative mb-4">
                {[0, 1, 2].map((i) => (
                  <span key={i}
                    className="absolute inset-0 rounded-full"
                    style={{ background: rosa, animation: `pulse-ring 2.4s ease-out ${i * 0.8}s infinite`, opacity: 0 }} />
                ))}
                <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                  className="relative w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: rosa, boxShadow: `0 0 50px ${rosa}80` }}>
                  <Mic size={28} className="text-white" />
                </motion.button>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: rosa }}>✦ Habla con</p>
              <h3 className="font-black uppercase tracking-tight text-white mt-1" style={{ fontSize: 32, lineHeight: 1, letterSpacing: '-0.04em' }}>
                LUMI
              </h3>
            </div>

            {/* Waveform */}
            <div className="col-span-12 sm:col-span-8">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                ◆ Onda de voz · grabación reciente
              </p>
              <div className="flex items-center gap-1 h-20">
                {waveform.map((v, i) => (
                  <motion.div key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: i * 0.02, duration: 0.4 }}
                    className="flex-1 rounded-full origin-center"
                    style={{
                      height: `${v * 100}%`,
                      background: i < 16 ? rosa : `rgba(255,255,255,0.15)`,
                      boxShadow: i < 16 ? `0 0 4px ${rosa}80` : 'none',
                    }} />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.4)' }}>00:14</span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.4)' }}>00:32</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SUGGESTIONS */}
      <motion.div variants={item} className="rounded-2xl border-2 p-5"
        style={{ background: 'white', borderColor: `${dark}33` }}>
        <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: azul }}>◆ Sugerencias rápidas</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {sugerencias.map((s) => (
            <button key={s}
              className="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.18em] transition-all"
              style={{ background: `${rosa}08`, color: rosa, border: `1.5px solid ${rosa}25` }}
              onMouseEnter={(e) => { e.currentTarget.style.background = rosa; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = `${rosa}08`; e.currentTarget.style.color = rosa; }}>
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      <SectionLabel num="05" title="Conversaciones recientes" accent={rosa} />

      {/* Chat */}
      <motion.div variants={item}>
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-5" style={{ color: grey }}>
          ◆ Conversaciones recientes
        </p>

        <div className="space-y-5">
          {conversaciones.map((conv, idx) => (
            <motion.div key={idx} variants={item} className="space-y-2.5">
              <div className="flex justify-end">
                <div className="flex items-end gap-2 max-w-[85%]">
                  <div
                    className="rounded-2xl rounded-br-sm px-4 py-3 border"
                    style={{ background: 'white', borderColor: `${dark}33` }}
                  >
                    <p className="text-sm" style={{ color: dark }}>
                      {conv.usuario}
                    </p>
                  </div>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${dark}08` }}
                  >
                    <User size={13} style={{ color: grey }} />
                  </div>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="flex items-end gap-2 max-w-[85%]">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] font-black"
                    style={{ background: rosa, boxShadow: `0 4px 12px ${rosa}30` }}
                  >
                    L
                  </div>
                  <div
                    className="rounded-2xl rounded-bl-sm px-4 py-3"
                    style={{ background: `${rosa}10`, border: `1px solid ${rosa}25` }}
                  >
                    <p className="text-sm leading-relaxed" style={{ color: dark }}>
                      {conv.lumi}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   ZONAS
   ════════════════════════════════════════════════════════════ */
type Zona = { id: string; nombre: string; radio: number; activa: boolean };

function TabZonas() {
  const [zonas, setZonas] = useLocalStorage<Zona[]>('zonas', [
    { id: 'z1', nombre: 'Hogar', radio: 50, activa: true },
    { id: 'z2', nombre: 'Parque cercano', radio: 200, activa: true },
    { id: 'z3', nombre: 'Casa de Carlos', radio: 75, activa: false },
  ]);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRadius, setNewRadius] = useState(100);

  const toggleZona = (id: string) =>
    setZonas((prev) => prev.map((z) => (z.id === id ? { ...z, activa: !z.activa } : z)));

  const removeZona = (id: string) =>
    setZonas((prev) => prev.filter((z) => z.id !== id));

  const addZona = () => {
    const nombre = newName.trim();
    if (!nombre) return;
    setZonas((p) => [
      ...p,
      { id: `z${Date.now()}`, nombre, radio: newRadius, activa: true },
    ]);
    setNewName('');
    setNewRadius(100);
    setAdding(false);
  };

  const activasCount = zonas.filter((z) => z.activa).length;

  return (
    <motion.div variants={ctn} initial="hidden" animate="show" className="space-y-6">
      <SectionLabel num="06" title="Zonas seguras" accent={azul} />

      {/* Map — Leaflet with real OSM tiles */}
      <motion.div
        variants={item}
        className="relative rounded-2xl aspect-[16/10] overflow-hidden border-2"
        style={{ borderColor: `${dark}33` }}
      >
        <LeafletMap
          center={[19.4326, -99.1332]}
          zoom={16}
          pinColor={rosa}
          zones={zonas.map((z) => ({ ...z, lat: 19.4326, lng: -99.1332 }))}
          className="absolute inset-0"
        />

        {/* Top-left pill */}
        <div className="absolute top-4 left-4 z-[500] rounded-full px-3 py-1.5 flex items-center gap-2 pointer-events-none"
          style={{ background: 'white', border: `1px solid ${dark}33`, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <MapPin size={11} style={{ color: rosa }} />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: dark }}>Ubicación actual</span>
        </div>

        {/* Top-right pill */}
        <div className="absolute top-4 right-4 z-[500] rounded-full px-3 py-1.5 flex items-center gap-2 pointer-events-none"
          style={{ background: 'white', border: `1px solid ${dark}33`, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: dark }}>
            {activasCount} zonas activas
          </span>
        </div>
      </motion.div>

      {/* Zone list */}
      <div className="space-y-2.5">
        {zonas.map((zona) => (
          <motion.div
            key={zona.id}
            variants={item}
            layout
            className="rounded-2xl border p-4 flex items-center gap-4 transition-all duration-300"
            style={{
              background: 'white',
              borderColor: `${dark}33`,
              boxShadow: zona.activa ? `0 2px 12px ${rosa}08` : 'none',
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: zona.activa ? `${rosa}10` : `${dark}05`,
                color: zona.activa ? rosa : grey,
              }}
            >
              <MapPin size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: zona.activa ? rosa : `${dark}25` }} />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: zona.activa ? rosa : grey }}>
                  {zona.activa ? 'Monitoreando' : 'Inactiva'}
                </span>
              </div>
              <h4 className="font-black uppercase tracking-tight text-base" style={{ color: dark }}>
                {zona.nombre}
              </h4>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: grey }}>
                Radio · {zona.radio}m
              </p>
            </div>
            <button
              onClick={() => removeZona(zona.id)}
              className="text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-full transition-colors"
              style={{ color: grey }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#EF4444'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = grey; }}
            >
              Eliminar
            </button>
            <button
              onClick={() => toggleZona(zona.id)}
              className="relative h-7 w-12 shrink-0 rounded-full transition-all duration-300"
              style={{
                background: zona.activa ? rosa : `${dark}10`,
                boxShadow: zona.activa ? `0 0 18px ${rosa}50` : 'none',
              }}
            >
              <motion.span layout className="block w-5 h-5 rounded-full bg-white shadow mt-1" style={{ marginLeft: zona.activa ? 26 : 4 }} />
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border p-5 space-y-4" style={{ background: 'white', borderColor: `${dark}33` }}>
              <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: rosa }}>✦ Nueva zona</p>
              <input
                autoFocus
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nombre de la zona"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ background: `${dark}03`, border: `1.5px solid ${dark}08`, color: dark }}
                onFocus={(e) => { e.currentTarget.style.borderColor = rosa; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = `${dark}08`; }}
              />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: grey }}>Radio</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.1em]" style={{ color: dark }}>{newRadius} m</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={newRadius}
                  onChange={(e) => setNewRadius(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: rosa }}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addZona}
                  className="flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white"
                  style={{ background: rosa, boxShadow: `0 4px 16px ${rosa}40` }}
                >
                  Crear
                </button>
                <button
                  onClick={() => { setAdding(false); setNewName(''); }}
                  className="px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]"
                  style={{ background: `${dark}05`, color: dark }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!adding && (
        <motion.button
          variants={item}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setAdding(true)}
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 border-2 border-dashed"
          style={{ borderColor: `${dark}15`, color: dark }}
        >
          <Plus size={14} strokeWidth={3} /> Agregar zona
        </motion.button>
      )}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN
   ════════════════════════════════════════════════════════════ */
export default function CarePanel() {
  const [activeTab, setActiveTab] = useState<TabKey>('rutinas');

  const contenido: Record<TabKey, React.ReactNode> = {
    rutinas: <TabRutinas />,
    medicacion: <TabMedicacion />,
    camara: <TabCamara />,
    historial: <TabHistorial />,
    voz: <TabVoz />,
    zonas: <TabZonas />,
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Bleeding background text */}
      <div className="absolute inset-x-0 top-0 pointer-events-none flex items-start justify-center overflow-hidden" style={{ height: '50vh' }}>
        <span
          className="whitespace-nowrap select-none"
          style={{
            fontSize: 'clamp(140px, 24vw, 420px)',
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: '-0.05em',
            color: `${dark}05`,
            textTransform: 'uppercase',
            marginTop: '-20px',
          }}
        >
          Panel
        </span>
      </div>

      {/* Decorative symbols */}
      <span className="absolute pointer-events-none select-none top-[15%] right-[8%] text-2xl" style={{ color: `${rosa}30` }}>✦</span>
      <span className="absolute pointer-events-none select-none top-[8%] left-[6%] text-xl" style={{ color: `${azul}25` }}>◆</span>

      <motion.div variants={ctn} initial="hidden" animate="show" className="relative z-10 w-full pb-12">
        {/* Header */}
        <motion.div variants={item} className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: rosa }}>
              ✦ Centro de cuidado · 2026
            </p>
            <h1
              className="font-black uppercase tracking-tight"
              style={{
                fontSize: 'clamp(40px, 7vw, 80px)',
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                color: dark,
              }}
            >
              Todo lo que LUMI
              <br />
              hace por
              <span className="italic font-light" style={{ color: rosa }}>
                {' '}tu familia
              </span>
            </h1>
            <p className="mt-4 text-sm max-w-md leading-relaxed" style={{ color: grey }}>
              Rutinas, medicación, cámaras, voz y zonas seguras — un panel unificado para acompañar a tu ser querido cada día.
            </p>
          </div>

          {/* Status card */}
          <motion.div
            variants={item}
            className="rounded-2xl px-5 py-4 border flex items-center gap-4 shrink-0"
            style={{ background: 'white', borderColor: `${dark}33` }}
          >
            <div className="relative">
              <span className="w-2.5 h-2.5 rounded-full block" style={{ background: '#22C55E', boxShadow: `0 0 12px #22C55E80`, animation: 'pulse-soft 2s ease-in-out infinite' }} />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em]" style={{ color: '#22C55E' }}>
                Sistema operativo
              </p>
              <p className="text-xs mt-0.5" style={{ color: grey }}>
                6 módulos · sincronizado
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Cinematic pill nav */}
        <motion.div variants={item} className="overflow-x-auto -mx-4 px-4 mb-10">
          <div
            className="inline-flex gap-1 p-1.5 rounded-full"
            style={{ background: dark, boxShadow: `0 8px 28px ${dark}25` }}
          >
            {pillTabs.map((tab) => {
              const active = activeTab === tab.key;
              const TabIcon = tab.Icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.18em] whitespace-nowrap transition-all duration-300"
                  style={{
                    background: active ? tab.accent : 'transparent',
                    color: active ? 'white' : 'rgba(255,255,255,0.55)',
                    boxShadow: active ? `0 0 24px ${tab.accent}60` : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                  }}
                >
                  <TabIcon size={13} strokeWidth={2.5} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' as const }}
          >
            {contenido[activeTab]}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
