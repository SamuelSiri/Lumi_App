import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Check, Clock,
  Pill, Calendar as CalendarIcon, Dumbbell, Brain, CircleDot,
  Plus, Trash2, X, TrendingUp, Sparkles,
} from 'lucide-react';
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval,
  startOfWeek, endOfWeek, isSameDay, isToday, isSameMonth,
  addMonths, subMonths, addWeeks, subWeeks, addDays, parseISO,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { eventosCalendario } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { EventoCalendario } from '../types';

type Vista = 'mensual' | 'semanal' | 'agenda';
type TipoEvento = EventoCalendario['tipo'];
type Prioridad = EventoCalendario['prioridad'];

const rosa = '#FD4282';
const azul = '#3F50B3';
const dark = '#0a0a12';
const grey = '#8a8a8a';

const tipoColor: Record<TipoEvento, string> = {
  medicacion: rosa,
  cita: azul,
  ejercicio: '#22C55E',
  terapia: '#A855F7',
  otro: grey,
};

const tipoLabel: Record<TipoEvento, string> = {
  medicacion: 'Medicación',
  cita: 'Cita',
  ejercicio: 'Ejercicio',
  terapia: 'Terapia',
  otro: 'Otro',
};

const tipoIcon: Record<TipoEvento, React.ReactNode> = {
  medicacion: <Pill size={11} />,
  cita: <CalendarIcon size={11} />,
  ejercicio: <Dumbbell size={11} />,
  terapia: <Brain size={11} />,
  otro: <CircleDot size={11} />,
};

const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

function horaAMin(h: string) {
  const [hh, mm] = h.split(':').map(Number);
  return hh * 60 + mm;
}

const ctn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } } };

export default function Calendar() {
  const [vista, setVista] = useState<Vista>('mensual');
  const [mesActual, setMesActual] = useState(new Date(2026, 2, 1));
  const [semanaActual, setSemanaActual] = useState(new Date(2026, 2, 23));
  const [diaSeleccionado, setDiaSeleccionado] = useState(new Date(2026, 2, 23));

  const [eventos, setEventos] = useLocalStorage<EventoCalendario[]>('calendario:eventos', eventosCalendario);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [draft, setDraft] = useState<{
    titulo: string; horaInicio: string; horaFin: string;
    tipo: TipoEvento; prioridad: Prioridad; notas: string;
  }>({ titulo: '', horaInicio: '08:00', horaFin: '', tipo: 'cita', prioridad: 'media', notas: '' });

  const eventosDelDia = (fecha: Date) => {
    const fStr = format(fecha, 'yyyy-MM-dd');
    return eventos.filter((e) => e.fecha === fStr).sort((a, b) => horaAMin(a.horaInicio) - horaAMin(b.horaInicio));
  };

  const eventosDiaSeleccionado = useMemo(() => eventosDelDia(diaSeleccionado), [diaSeleccionado, eventos]);

  const proximos = useMemo(() => {
    const today = new Date(2026, 2, 23);
    const limit = addDays(today, 7);
    return eventos
      .filter((e) => {
        const d = parseISO(e.fecha);
        return d >= today && d <= limit && !e.completado;
      })
      .sort((a, b) => {
        const cmp = a.fecha.localeCompare(b.fecha);
        return cmp !== 0 ? cmp : horaAMin(a.horaInicio) - horaAMin(b.horaInicio);
      });
  }, [eventos]);

  const stats = useMemo(() => {
    const total = eventos.length;
    const completados = eventos.filter((e) => e.completado).length;
    const altaPrioridad = eventos.filter((e) => e.prioridad === 'alta' && !e.completado).length;
    return { total, completados, altaPrioridad };
  }, [eventos]);

  const monthDays = useMemo(() => {
    const start = startOfMonth(mesActual);
    const end = endOfMonth(mesActual);
    return eachDayOfInterval({ start, end }).map((d) => ({
      date: d,
      count: eventosDelDia(d).length,
    }));
  }, [mesActual, eventos]);
  const monthMax = Math.max(...monthDays.map((d) => d.count), 1);

  const byType = useMemo(() => {
    const types: TipoEvento[] = ['medicacion', 'cita', 'ejercicio', 'terapia', 'otro'];
    return types
      .map((t) => ({ type: t, count: eventos.filter((e) => e.tipo === t).length }))
      .filter((t) => t.count > 0);
  }, [eventos]);
  const typeMax = Math.max(...byType.map((t) => t.count), 1);

  const navegarAnterior = () => {
    if (vista === 'mensual') setMesActual((m) => subMonths(m, 1));
    else if (vista === 'semanal') setSemanaActual((s) => subWeeks(s, 1));
    else setDiaSeleccionado((d) => addDays(d, -1));
  };
  const navegarSiguiente = () => {
    if (vista === 'mensual') setMesActual((m) => addMonths(m, 1));
    else if (vista === 'semanal') setSemanaActual((s) => addWeeks(s, 1));
    else setDiaSeleccionado((d) => addDays(d, 1));
  };

  const openNew = () => {
    setEditId(null);
    setDraft({ titulo: '', horaInicio: '08:00', horaFin: '', tipo: 'cita', prioridad: 'media', notas: '' });
    setShowForm(true);
  };
  const openEdit = (ev: EventoCalendario) => {
    setEditId(ev.id);
    setDraft({
      titulo: ev.titulo, horaInicio: ev.horaInicio, horaFin: ev.horaFin || '',
      tipo: ev.tipo, prioridad: ev.prioridad, notas: ev.notas || '',
    });
    setShowForm(true);
  };
  const saveDraft = () => {
    if (!draft.titulo.trim()) return;
    const fecha = format(diaSeleccionado, 'yyyy-MM-dd');
    if (editId) {
      setEventos((prev) => prev.map((e) =>
        e.id === editId ? { ...e, ...draft, horaFin: draft.horaFin || undefined, notas: draft.notas || undefined, fecha } : e,
      ));
    } else {
      const nuevo: EventoCalendario = {
        id: `ev-${Date.now()}`,
        titulo: draft.titulo.trim(), fecha,
        horaInicio: draft.horaInicio, horaFin: draft.horaFin || undefined,
        tipo: draft.tipo, prioridad: draft.prioridad,
        notas: draft.notas || undefined, completado: false,
      };
      setEventos((prev) => [...prev, nuevo]);
    }
    setShowForm(false);
    setEditId(null);
  };
  const removeEvent = (id: string) => setEventos((prev) => prev.filter((e) => e.id !== id));
  const toggleCompletado = (id: string) =>
    setEventos((prev) => prev.map((e) => (e.id === id ? { ...e, completado: !e.completado } : e)));

  const mesNombre = format(mesActual, 'MMMM', { locale: es }).replace(/^\w/, (c) => c.toUpperCase());
  const anio = format(mesActual, 'yyyy');

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 pointer-events-none flex items-start justify-center overflow-hidden" style={{ height: '50vh' }}>
        <span className="whitespace-nowrap select-none" style={{
          fontSize: 'clamp(140px, 24vw, 420px)', fontWeight: 900, lineHeight: 0.85,
          letterSpacing: '-0.05em', color: `${dark}05`, textTransform: 'uppercase', marginTop: '-20px',
        }}>
          Agenda
        </span>
      </div>

      <span className="absolute pointer-events-none select-none top-[12%] right-[6%] text-2xl" style={{ color: `${rosa}30` }}>✦</span>
      <span className="absolute pointer-events-none select-none top-[8%] left-[5%] text-xl" style={{ color: `${azul}25` }}>◆</span>

      <motion.div variants={ctn} initial="hidden" animate="show" className="relative z-10 w-full pb-12 space-y-5">

        {/* HEADER */}
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: rosa }}>
              ✦ Calendario · {anio}
            </p>
            <h1 className="font-black uppercase tracking-tight" style={{
              fontSize: 'clamp(40px, 7vw, 80px)', lineHeight: 0.9, letterSpacing: '-0.04em', color: dark,
            }}>
              {mesNombre}
              <span className="italic font-light" style={{ color: rosa }}> {anio}</span>
            </h1>
          </div>

          <button onClick={openNew}
            className="flex items-center gap-2 px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.18em] shrink-0 self-start transition-all"
            style={{ background: rosa, color: 'white', boxShadow: `0 6px 20px ${rosa}40` }}>
            <Plus size={13} strokeWidth={3} /> Nuevo evento
          </button>
        </motion.div>

        {/* TOP MOSAIC: hero stat + mini heatmap + 2 stats */}
        <div className="grid grid-cols-12 gap-4">
          <motion.div variants={item} className="col-span-12 md:col-span-6 lg:col-span-4 rounded-2xl border-2 p-6 relative overflow-hidden"
            style={{ background: dark, borderColor: `${dark}33` }}>
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: `${rosa}25`, filter: 'blur(80px)' }} />
            <div className="relative">
              <p className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: rosa }}>✦ Próximos 7 días</p>
              <p className="font-black tracking-tight text-white mt-2" style={{ fontSize: 'clamp(64px, 10vw, 100px)', lineHeight: 0.85, letterSpacing: '-0.05em' }}>
                {proximos.length}
              </p>
              <p className="text-sm font-black uppercase tracking-tight" style={{ color: 'rgba(255,255,255,0.6)' }}>
                eventos pendientes
              </p>

              <div className="mt-5 pt-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <p className="text-[9px] font-black uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.4)' }}>Siguiente evento</p>
                {proximos[0] ? (
                  <>
                    <p className="text-sm font-black uppercase tracking-tight text-white mt-1.5">{proximos[0].titulo}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {format(parseISO(proximos[0].fecha), "d 'de' MMM", { locale: es })} · {proximos[0].horaInicio}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-white/60 mt-1.5">Nada pendiente</p>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="col-span-12 md:col-span-6 lg:col-span-5 rounded-2xl border-2 p-5"
            style={{ background: 'white', borderColor: `${dark}33` }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: azul }}>◆ Densidad mensual</p>
                <h3 className="font-black uppercase tracking-tight text-xl mt-1" style={{ color: dark }}>{mesNombre}</h3>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[8px] font-black uppercase tracking-[0.15em]" style={{ color: grey }}>0</span>
                {[0.15, 0.4, 0.7, 1].map((a, i) => (
                  <span key={i} className="w-2.5 h-2.5 rounded-sm" style={{ background: `${rosa}${Math.floor(a * 255).toString(16).padStart(2, '0')}` }} />
                ))}
                <span className="text-[8px] font-black uppercase tracking-[0.15em]" style={{ color: grey }}>+</span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {diasSemana.map((d) => (
                <div key={d} className="text-center text-[8px] font-black uppercase tracking-[0.15em] pb-1" style={{ color: grey }}>
                  {d.slice(0, 1)}
                </div>
              ))}
              {Array.from({ length: monthDays[0].date.getDay() === 0 ? 6 : monthDays[0].date.getDay() - 1 }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {monthDays.map((d) => {
                const intensity = d.count / monthMax;
                const a = intensity === 0 ? 0.05 : Math.max(0.15, intensity);
                const bg = intensity === 0 ? `${dark}06` : `${rosa}${Math.floor(a * 255).toString(16).padStart(2, '0')}`;
                const isSel = isSameDay(d.date, diaSeleccionado);
                const hoy = isToday(d.date);
                return (
                  <button key={d.date.toISOString()} onClick={() => setDiaSeleccionado(d.date)}
                    className="relative aspect-square rounded-sm flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      background: bg,
                      border: isSel ? `2px solid ${rosa}` : intensity > 0 ? `1px solid ${rosa}40` : `1px solid ${dark}10`,
                      boxShadow: hoy ? `0 0 8px ${rosa}80` : 'none',
                    }}>
                    <span className="text-[8px] font-black" style={{ color: intensity > 0.5 ? 'white' : dark }}>
                      {format(d.date, 'd')}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <div className="col-span-12 lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3">
            <motion.div variants={item} className="rounded-2xl border-2 p-4" style={{ background: 'white', borderColor: `${dark}33` }}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-[9px] font-black uppercase tracking-[0.25em]" style={{ color: '#22C55E' }}>● Completados</p>
                <Check size={14} style={{ color: '#22C55E' }} />
              </div>
              <p className="text-3xl font-black tracking-tight" style={{ color: dark, letterSpacing: '-0.04em' }}>{stats.completados}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>de {stats.total}</p>
            </motion.div>

            <motion.div variants={item} className="rounded-2xl border-2 p-4" style={{ background: 'white', borderColor: `${dark}33` }}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-[9px] font-black uppercase tracking-[0.25em]" style={{ color: '#EF4444' }}>● Alta prioridad</p>
                <Sparkles size={14} style={{ color: '#EF4444' }} />
              </div>
              <p className="text-3xl font-black tracking-tight" style={{ color: dark, letterSpacing: '-0.04em' }}>{stats.altaPrioridad}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>pendientes</p>
            </motion.div>
          </div>
        </div>

        {/* TYPE BREAKDOWN */}
        <motion.div variants={item} className="rounded-2xl border-2 p-5" style={{ background: 'white', borderColor: `${dark}33` }}>
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: rosa }}>✦ Por categoría</p>
              <h3 className="font-black uppercase tracking-tight text-xl mt-1" style={{ color: dark }}>Distribución total</h3>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>{eventos.length} eventos</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {byType.map((t) => {
              const pct = (t.count / typeMax) * 100;
              const color = tipoColor[t.type];
              return (
                <div key={t.type} className="rounded-xl p-3" style={{ background: `${color}08`, border: `1.5px solid ${color}25` }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: color, color: 'white' }}>
                      {tipoIcon[t.type]}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: dark }}>
                      {tipoLabel[t.type]}
                    </span>
                  </div>
                  <p className="text-2xl font-black tracking-tight" style={{ color: dark, letterSpacing: '-0.04em' }}>{t.count}</p>
                  <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: `${color}15` }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' as const }}
                      className="h-full rounded-full" style={{ background: color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* VIEW TOGGLE + NAV */}
        <motion.div variants={item} className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button onClick={navegarAnterior} className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'white', border: `1px solid ${dark}33` }}>
              <ChevronLeft size={18} style={{ color: dark }} />
            </button>
            <button onClick={navegarSiguiente} className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'white', border: `1px solid ${dark}33` }}>
              <ChevronRight size={18} style={{ color: dark }} />
            </button>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] ml-2" style={{ color: dark }}>
              {vista === 'mensual' ? mesNombre : vista === 'semanal' ? `Sem · ${format(startOfWeek(semanaActual, { weekStartsOn: 1 }), 'd MMM', { locale: es })}` : format(diaSeleccionado, "d 'de' MMM", { locale: es })}
            </span>
          </div>

          <div className="flex rounded-full p-1" style={{ background: dark }}>
            {(['agenda', 'semanal', 'mensual'] as Vista[]).map((v) => {
              const active = vista === v;
              return (
                <button key={v} onClick={() => setVista(v)}
                  className="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.18em] transition-all duration-300"
                  style={{
                    background: active ? rosa : 'transparent',
                    color: active ? 'white' : 'rgba(255,255,255,0.55)',
                    boxShadow: active ? `0 0 16px ${rosa}50` : 'none',
                  }}>
                  {v === 'semanal' ? 'Semana' : v === 'mensual' ? 'Mes' : 'Agenda'}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* MAIN VIEW */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${vista}-${mesActual.toISOString()}-${semanaActual.toISOString()}`}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {vista === 'mensual' && (
              <div className="rounded-2xl border-2 p-5 sm:p-6" style={{ background: 'white', borderColor: `${dark}33` }}>
                <VistaMensual mesActual={mesActual} diaSeleccionado={diaSeleccionado}
                  onSelectDia={setDiaSeleccionado} eventosDelDia={eventosDelDia} />
              </div>
            )}
            {vista === 'semanal' && (
              <div className="rounded-2xl border-2 p-5 sm:p-6" style={{ background: 'white', borderColor: `${dark}33` }}>
                <VistaSemanal semanaActual={semanaActual} diaSeleccionado={diaSeleccionado}
                  onSelectDia={setDiaSeleccionado} eventos={eventos} />
              </div>
            )}
            {vista === 'agenda' && (
              <VistaAgenda eventos={proximos} onSelect={setDiaSeleccionado} onEdit={openEdit} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* SELECTED DAY EVENTS + UPCOMING SIDEBAR */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8 space-y-3">
            <div className="flex items-baseline gap-3 mb-2">
              <h3 className="font-black uppercase tracking-tight" style={{
                fontSize: 32, lineHeight: 1, letterSpacing: '-0.04em', color: dark,
              }}>
                {format(diaSeleccionado, 'd')} <span className="italic font-light" style={{ color: rosa }}>
                  {format(diaSeleccionado, 'MMM', { locale: es })}
                </span>
              </h3>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>
                · {format(diaSeleccionado, 'EEEE', { locale: es })} · {eventosDiaSeleccionado.length} eventos
              </span>
            </div>

            {eventosDiaSeleccionado.length === 0 ? (
              <div className="rounded-2xl border-2 p-10 text-center" style={{ background: 'white', borderColor: `${dark}33` }}>
                <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4" style={{ background: `${dark}05` }}>
                  <CalendarIcon size={24} style={{ color: grey }} />
                </div>
                <p className="font-black uppercase tracking-tight text-lg" style={{ color: dark }}>Día libre</p>
                <p className="text-xs mt-1" style={{ color: grey }}>No hay eventos programados</p>
                <button onClick={openNew}
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                  style={{ background: rosa, color: 'white', boxShadow: `0 4px 16px ${rosa}40` }}>
                  <Plus size={12} strokeWidth={3} /> Agregar evento
                </button>
              </div>
            ) : (
              <AnimatePresence>
                {eventosDiaSeleccionado.map((ev) => {
                  const color = tipoColor[ev.tipo];
                  return (
                    <motion.div key={ev.id} layout
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="rounded-2xl border-l-[3px] border-2 flex items-start gap-4 group transition-all duration-200 hover:shadow-md p-4"
                      style={{ background: 'white', borderColor: `${dark}33`, borderLeftColor: color }}>
                      <button onClick={() => toggleCompletado(ev.id)}
                        className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all"
                        style={{
                          background: ev.completado ? '#22C55E' : 'transparent',
                          border: `2px solid ${ev.completado ? '#22C55E' : `${dark}33`}`,
                          boxShadow: ev.completado ? `0 0 8px #22C55E60` : 'none',
                        }}>
                        {ev.completado && <Check size={13} className="text-white" strokeWidth={3} />}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock size={11} style={{ color: grey }} />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: dark }}>
                            {ev.horaInicio}{ev.horaFin && ` — ${ev.horaFin}`}
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-full inline-flex items-center gap-1"
                            style={{ background: `${color}10`, color }}>
                            {tipoIcon[ev.tipo]} {tipoLabel[ev.tipo]}
                          </span>
                        </div>
                        <h4 className="font-black uppercase tracking-tight text-base"
                          style={{ color: ev.completado ? grey : dark, textDecoration: ev.completado ? 'line-through' : 'none' }}>
                          {ev.titulo}
                        </h4>
                        {ev.notas && <p className="text-xs mt-1 italic" style={{ color: grey }}>{ev.notas}</p>}
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(ev)}
                          className="text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-full"
                          style={{ background: `${dark}05`, color: dark }}>Editar</button>
                        <button onClick={() => removeEvent(ev.id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center"
                          style={{ background: '#EF444410', color: '#EF4444' }}>
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>

          <motion.div variants={item} className="col-span-12 lg:col-span-4 rounded-2xl border-2 p-5 lg:sticky lg:top-24 self-start"
            style={{ background: 'white', borderColor: `${dark}33` }}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={14} style={{ color: rosa }} />
              <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: dark }}>Próximos 7 días</p>
            </div>

            {proximos.length === 0 ? (
              <p className="text-xs" style={{ color: grey }}>Nada pendiente esta semana 🎉</p>
            ) : (
              <div className="space-y-2.5 relative">
                <div className="absolute left-[19px] top-2 bottom-2 w-px" style={{ background: `${dark}15` }} />
                {proximos.slice(0, 6).map((ev) => {
                  const color = tipoColor[ev.tipo];
                  const fecha = parseISO(ev.fecha);
                  return (
                    <button key={ev.id} onClick={() => setDiaSeleccionado(fecha)}
                      className="w-full text-left flex items-start gap-3 group">
                      <div className="relative w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0 z-10 leading-none"
                        style={{ background: 'white', border: `2px solid ${color}40`, color }}>
                        <span className="text-[8px] font-black uppercase tracking-[0.1em]">{format(fecha, 'MMM', { locale: es }).slice(0, 3)}</span>
                        <span className="text-sm font-black tracking-tight">{format(fecha, 'd')}</span>
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className="text-[9px] font-black uppercase tracking-[0.18em] px-1.5 py-0.5 rounded"
                            style={{ background: `${color}10`, color }}>
                            {ev.horaInicio}
                          </span>
                          {ev.prioridad === 'alta' && (
                            <span className="text-[8px] font-black uppercase tracking-[0.18em] px-1.5 py-0.5 rounded"
                              style={{ background: '#EF444410', color: '#EF4444' }}>
                              Alta
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-black uppercase tracking-tight truncate" style={{ color: dark }}>{ev.titulo}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Form modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            style={{ background: 'rgba(10,10,18,0.4)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowForm(false)}>
            <motion.div onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
              transition={{ ease: 'easeOut' as const, duration: 0.3 }}
              className="w-full max-w-lg rounded-2xl border-2 p-6 space-y-4"
              style={{ background: 'white', borderColor: `${dark}33`, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: rosa }}>
                    ✦ {editId ? 'Editar evento' : 'Nuevo evento'}
                  </p>
                  <h2 className="font-black uppercase tracking-tight mt-1" style={{
                    fontSize: 28, lineHeight: 1, color: dark, letterSpacing: '-0.04em',
                  }}>
                    {format(diaSeleccionado, "d 'de' MMMM", { locale: es })}
                  </h2>
                </div>
                <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: `${dark}05` }}>
                  <X size={14} style={{ color: dark }} />
                </button>
              </div>

              <input autoFocus type="text" value={draft.titulo}
                onChange={(e) => setDraft({ ...draft, titulo: e.target.value })}
                placeholder="Título del evento"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: `${dark}03`, border: `1.5px solid ${dark}15`, color: dark }} />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] block mb-1.5" style={{ color: grey }}>Inicio</label>
                  <input type="time" value={draft.horaInicio}
                    onChange={(e) => setDraft({ ...draft, horaInicio: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: `${dark}03`, border: `1.5px solid ${dark}15`, color: dark }} />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] block mb-1.5" style={{ color: grey }}>Fin (opcional)</label>
                  <input type="time" value={draft.horaFin}
                    onChange={(e) => setDraft({ ...draft, horaFin: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: `${dark}03`, border: `1.5px solid ${dark}15`, color: dark }} />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black uppercase tracking-[0.2em] block mb-1.5" style={{ color: grey }}>Tipo</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {(Object.keys(tipoLabel) as TipoEvento[]).map((t) => (
                    <button key={t} onClick={() => setDraft({ ...draft, tipo: t })}
                      className="flex flex-col items-center gap-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] transition-all"
                      style={{
                        background: draft.tipo === t ? tipoColor[t] : `${dark}03`,
                        color: draft.tipo === t ? 'white' : dark,
                        boxShadow: draft.tipo === t ? `0 4px 14px ${tipoColor[t]}40` : 'none',
                      }}>
                      {tipoIcon[t]}
                      {tipoLabel[t]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black uppercase tracking-[0.2em] block mb-1.5" style={{ color: grey }}>Prioridad</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['baja', 'media', 'alta'] as Prioridad[]).map((p) => {
                    const colors = { baja: azul, media: '#F59E0B', alta: '#EF4444' };
                    return (
                      <button key={p} onClick={() => setDraft({ ...draft, prioridad: p })}
                        className="py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] transition-all"
                        style={{
                          background: draft.prioridad === p ? colors[p] : `${dark}03`,
                          color: draft.prioridad === p ? 'white' : dark,
                        }}>
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              <textarea value={draft.notas} onChange={(e) => setDraft({ ...draft, notas: e.target.value })}
                placeholder="Notas (opcional)" rows={2}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ background: `${dark}03`, border: `1.5px solid ${dark}15`, color: dark }} />

              <div className="flex gap-2 pt-2">
                {editId && (
                  <button onClick={() => { removeEvent(editId); setShowForm(false); }}
                    className="px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]"
                    style={{ background: '#EF444410', color: '#EF4444' }}>
                    <Trash2 size={12} />
                  </button>
                )}
                <button onClick={saveDraft}
                  className="flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white"
                  style={{ background: rosa, boxShadow: `0 4px 16px ${rosa}40` }}>
                  {editId ? 'Guardar cambios' : 'Crear evento'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── VISTA AGENDA ─── */
function VistaAgenda({ eventos, onSelect, onEdit }: {
  eventos: EventoCalendario[];
  onSelect: (d: Date) => void; onEdit: (ev: EventoCalendario) => void;
}) {
  const grouped = useMemo(() => {
    const m: Record<string, EventoCalendario[]> = {};
    eventos.forEach((e) => {
      if (!m[e.fecha]) m[e.fecha] = [];
      m[e.fecha].push(e);
    });
    return m;
  }, [eventos]);

  const dates = Object.keys(grouped).sort();

  if (dates.length === 0) {
    return (
      <div className="rounded-2xl border-2 p-12 text-center" style={{ background: 'white', borderColor: `${dark}33` }}>
        <p className="font-black uppercase tracking-tight text-lg" style={{ color: dark }}>Agenda vacía</p>
        <p className="text-xs mt-1" style={{ color: grey }}>No hay eventos pendientes en los próximos días</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 p-5 sm:p-6" style={{ background: 'white', borderColor: `${dark}33` }}>
      <div className="space-y-6">
        {dates.map((fecha) => {
          const d = parseISO(fecha);
          const items = grouped[fecha];
          return (
            <div key={fecha} className="grid grid-cols-12 gap-4">
              <button onClick={() => onSelect(d)} className="col-span-12 sm:col-span-2 text-left">
                <p className="text-[9px] font-black uppercase tracking-[0.25em]" style={{ color: rosa }}>
                  {format(d, 'EEEE', { locale: es })}
                </p>
                <p className="font-black tracking-tight mt-1" style={{
                  fontSize: 36, lineHeight: 1, color: dark, letterSpacing: '-0.04em',
                }}>
                  {format(d, 'd')}
                </p>
                <p className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>
                  {format(d, 'MMM yyyy', { locale: es })}
                </p>
              </button>

              <div className="col-span-12 sm:col-span-10 space-y-2">
                {items.map((ev) => {
                  const color = tipoColor[ev.tipo];
                  return (
                    <button key={ev.id} onClick={() => onEdit(ev)}
                      className="w-full text-left flex items-start gap-3 p-3 rounded-xl border-l-[3px] transition-all hover:shadow-sm"
                      style={{ background: `${color}05`, borderLeftColor: color, border: `1px solid ${dark}15`, borderLeftWidth: 3 }}>
                      <div className="text-center w-12 shrink-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.15em]" style={{ color: dark }}>{ev.horaInicio}</p>
                        {ev.horaFin && <p className="text-[8px] font-bold" style={{ color: grey }}>↓ {ev.horaFin}</p>}
                      </div>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: color, color: 'white' }}>
                        {tipoIcon[ev.tipo]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black uppercase tracking-tight" style={{ color: dark }}>{ev.titulo}</p>
                        {ev.notas && <p className="text-[10px] mt-0.5 italic" style={{ color: grey }}>{ev.notas}</p>}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
                        style={{ background: `${color}10`, color }}>
                        {tipoLabel[ev.tipo]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── VISTA MENSUAL ─── */
function VistaMensual({
  mesActual, diaSeleccionado, onSelectDia, eventosDelDia,
}: {
  mesActual: Date; diaSeleccionado: Date; onSelectDia: (d: Date) => void;
  eventosDelDia: (d: Date) => EventoCalendario[];
}) {
  const inicio = startOfMonth(mesActual);
  const fin = endOfMonth(mesActual);
  const inicioGrid = startOfWeek(inicio, { weekStartsOn: 1 });
  const finGrid = endOfWeek(fin, { weekStartsOn: 1 });
  const dias = eachDayOfInterval({ start: inicioGrid, end: finGrid });

  return (
    <div>
      <div className="grid grid-cols-7 mb-2">
        {diasSemana.map((d) => (
          <div key={d} className="text-center text-[9px] font-black uppercase tracking-[0.25em] py-2" style={{ color: grey }}>
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {dias.map((dia) => {
          const inMonth = isSameMonth(dia, mesActual);
          const hoy = isToday(dia);
          const sel = isSameDay(dia, diaSeleccionado);
          const eventos = eventosDelDia(dia);
          return (
            <motion.button key={dia.toISOString()} onClick={() => onSelectDia(dia)}
              whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
              className="relative p-1.5 rounded-xl text-sm transition-all duration-200 min-h-[60px] flex flex-col items-center justify-start"
              style={{
                opacity: inMonth ? 1 : 0.3,
                background: sel ? `${rosa}08` : 'transparent',
                border: sel ? `1.5px solid ${rosa}40` : '1.5px solid transparent',
              }}>
              <span className="w-7 h-7 flex items-center justify-center rounded-full text-xs font-black"
                style={{
                  background: hoy ? rosa : 'transparent',
                  color: hoy ? 'white' : sel ? rosa : dark,
                  boxShadow: hoy ? `0 0 14px ${rosa}50` : 'none',
                }}>
                {format(dia, 'd')}
              </span>
              {eventos.length > 0 && (
                <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                  {eventos.slice(0, 3).map((ev) => (
                    <span key={ev.id} className="w-1.5 h-1.5 rounded-full" style={{ background: tipoColor[ev.tipo] }} />
                  ))}
                  {eventos.length > 3 && (
                    <span className="text-[8px] font-black ml-0.5" style={{ color: grey }}>+{eventos.length - 3}</span>
                  )}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── VISTA SEMANAL ─── */
function VistaSemanal({
  semanaActual, diaSeleccionado, onSelectDia, eventos,
}: {
  semanaActual: Date; diaSeleccionado: Date; onSelectDia: (d: Date) => void;
  eventos: EventoCalendario[];
}) {
  const inicio = startOfWeek(semanaActual, { weekStartsOn: 1 });
  const fin = endOfWeek(semanaActual, { weekStartsOn: 1 });
  const dias = eachDayOfInterval({ start: inicio, end: fin });
  const horas = Array.from({ length: 16 }, (_, i) => i + 7);

  return (
    <div className="overflow-x-auto -mx-2">
      <div className="grid grid-cols-[56px_repeat(7,1fr)] gap-0 mb-1">
        <div />
        {dias.map((dia) => {
          const hoy = isToday(dia);
          const sel = isSameDay(dia, diaSeleccionado);
          return (
            <button key={dia.toISOString()} onClick={() => onSelectDia(dia)}
              className="text-center py-2 rounded-xl mx-0.5 transition-all"
              style={{ background: sel ? `${rosa}08` : hoy ? `${dark}03` : 'transparent' }}>
              <div className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>
                {format(dia, 'EEE', { locale: es }).slice(0, 3)}
              </div>
              <div className="w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-black mt-0.5"
                style={{
                  background: hoy ? rosa : 'transparent',
                  color: hoy ? 'white' : sel ? rosa : dark,
                  boxShadow: hoy ? `0 0 12px ${rosa}50` : 'none',
                }}>
                {format(dia, 'd')}
              </div>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-[56px_repeat(7,1fr)] gap-0" style={{ borderTop: `1px solid ${dark}15` }}>
        {horas.map((hora) => (
          <div key={hora} className="contents">
            <div className="text-[9px] font-black uppercase tracking-[0.15em] text-right pr-3 py-3" style={{ color: grey, borderBottom: `1px solid ${dark}10` }}>
              {hora.toString().padStart(2, '0')}:00
            </div>
            {dias.map((dia) => {
              const fStr = format(dia, 'yyyy-MM-dd');
              const evHora = eventos.filter((ev) => {
                if (ev.fecha !== fStr) return false;
                const m = horaAMin(ev.horaInicio);
                return m >= hora * 60 && m < (hora + 1) * 60;
              });
              return (
                <div key={`${hora}-${dia.toISOString()}`} className="relative min-h-[48px] mx-0.5"
                  style={{ borderBottom: `1px solid ${dark}10`, borderLeft: `1px solid ${dark}10` }}>
                  {evHora.map((ev) => (
                    <button key={ev.id} onClick={() => onSelectDia(dia)}
                      className="absolute inset-x-0.5 top-0.5 rounded-md px-1.5 py-1 text-[9px] leading-tight font-black uppercase tracking-[0.05em] truncate text-white"
                      style={{ background: tipoColor[ev.tipo], boxShadow: `0 2px 6px ${tipoColor[ev.tipo]}40` }}
                      title={ev.titulo}>
                      {ev.titulo}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
