import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import {
  ChevronLeft, ChevronRight, Check, Clock,
  Pill, Calendar as CalendarIcon, Dumbbell, Brain, CircleDot,
} from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { eventosCalendario } from '../data/mockData';

type Vista = 'mensual' | 'semanal';

const diasSemanaCortos = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];

const colorTipo: Record<string, string> = {
  medicacion: 'bg-rosa',
  cita: 'bg-azul',
  ejercicio: 'bg-gris-400',
  terapia: 'bg-gris-600',
  otro: 'bg-gris-300',
};

const colorTipoBorder: Record<string, string> = {
  medicacion: 'border-l-rosa',
  cita: 'border-l-azul',
  ejercicio: 'border-l-gris-400',
  terapia: 'border-l-gris-600',
  otro: 'border-l-gris-300',
};

const colorTipoBadge: Record<string, string> = {
  medicacion: 'bg-rosa-light text-rosa',
  cita: 'bg-azul-light text-azul',
  ejercicio: 'bg-gris-100 text-gris-600',
  terapia: 'bg-gris-100 text-gris-700',
  otro: 'bg-gris-100 text-gris-500',
};

const etiquetaTipo: Record<string, string> = {
  medicacion: 'Medicacion',
  cita: 'Cita',
  ejercicio: 'Ejercicio',
  terapia: 'Terapia',
  otro: 'Otro',
};

const iconoTipo: Record<string, React.ReactNode> = {
  medicacion: <Pill className="w-3.5 h-3.5" />,
  cita: <CalendarIcon className="w-3.5 h-3.5" />,
  ejercicio: <Dumbbell className="w-3.5 h-3.5" />,
  terapia: <Brain className="w-3.5 h-3.5" />,
  otro: <CircleDot className="w-3.5 h-3.5" />,
};

function eventosDelDia(fecha: Date) {
  const fechaStr = format(fecha, 'yyyy-MM-dd');
  return eventosCalendario.filter((e) => e.fecha === fechaStr);
}

function horaAMinutos(hora: string): number {
  const [h, m] = hora.split(':').map(Number);
  return h * 60 + m;
}

/* ------------------------------------------------
   VISTA MENSUAL
   ------------------------------------------------ */
function VistaMensual({
  mesActual,
  diaSeleccionado,
  onSelectDia,
}: {
  mesActual: Date;
  diaSeleccionado: Date;
  onSelectDia: (d: Date) => void;
}) {
  const inicioMes = startOfMonth(mesActual);
  const finMes = endOfMonth(mesActual);
  const inicioGrid = startOfWeek(inicioMes, { weekStartsOn: 1 });
  const finGrid = endOfWeek(finMes, { weekStartsOn: 1 });
  const dias = eachDayOfInterval({ start: inicioGrid, end: finGrid });

  return (
    <div>
      {/* Day name headers */}
      <div className="grid grid-cols-7 mb-3">
        {diasSemanaCortos.map((d) => (
          <div key={d} className="text-center text-xs font-sans font-semibold text-gris-400 uppercase tracking-wider py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {dias.map((dia) => {
          const esMesActual = dia.getMonth() === mesActual.getMonth();
          const esHoy = isToday(dia);
          const seleccionado = isSameDay(dia, diaSeleccionado);
          const eventos = eventosDelDia(dia);

          return (
            <motion.button
              key={dia.toISOString()}
              onClick={() => onSelectDia(dia)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className={clsx(
                'relative p-1.5 sm:p-2 rounded-xl text-sm transition-all duration-200 min-h-[52px] sm:min-h-[68px] flex flex-col items-center',
                !esMesActual && 'opacity-30',
                seleccionado && !esHoy && 'ring-2 ring-rosa bg-rosa-light',
              )}
            >
              <span
                className={clsx(
                  'w-8 h-8 flex items-center justify-center rounded-full text-sm font-sans font-bold transition-all',
                  esHoy && 'bg-rosa text-white',
                  seleccionado && !esHoy && 'bg-rosa-muted text-rosa',
                  !esHoy && !seleccionado && esMesActual && 'text-gris-700 hover:text-rosa',
                )}
              >
                {format(dia, 'd')}
              </span>
              {/* Event dots */}
              {eventos.length > 0 && (
                <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                  {eventos.slice(0, 3).map((ev) => (
                    <span
                      key={ev.id}
                      className={clsx('w-1.5 h-1.5 rounded-full', colorTipo[ev.tipo])}
                    />
                  ))}
                  {eventos.length > 3 && (
                    <span className="text-[8px] text-gris-400 font-bold leading-none ml-0.5">
                      +{eventos.length - 3}
                    </span>
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

/* ------------------------------------------------
   VISTA SEMANAL
   ------------------------------------------------ */
function VistaSemanal({
  semanaActual,
  diaSeleccionado,
  onSelectDia,
}: {
  semanaActual: Date;
  diaSeleccionado: Date;
  onSelectDia: (d: Date) => void;
}) {
  const inicioSemana = startOfWeek(semanaActual, { weekStartsOn: 1 });
  const finSemana = endOfWeek(semanaActual, { weekStartsOn: 1 });
  const dias = eachDayOfInterval({ start: inicioSemana, end: finSemana });
  const horas = Array.from({ length: 16 }, (_, i) => i + 7); // 7:00 to 22:00

  return (
    <div className="overflow-x-auto -mx-2">
      {/* Day headers */}
      <div className="grid grid-cols-[56px_repeat(7,1fr)] gap-0 mb-1">
        <div /> {/* Corner */}
        {dias.map((dia) => {
          const esHoy = isToday(dia);
          const seleccionado = isSameDay(dia, diaSeleccionado);

          return (
            <button
              key={dia.toISOString()}
              onClick={() => onSelectDia(dia)}
              className={clsx(
                'text-center py-2 rounded-xl transition-all mx-0.5',
                seleccionado && 'bg-rosa-light',
                esHoy && !seleccionado && 'bg-gris-100',
              )}
            >
              <div className="text-[10px] font-sans font-bold text-gris-400 uppercase tracking-wider">
                {format(dia, 'EEE', { locale: es }).replace(/^\w/, (c) => c.toUpperCase())}
              </div>
              <div
                className={clsx(
                  'w-9 h-9 mx-auto rounded-full flex items-center justify-center text-sm font-sans font-bold mt-0.5',
                  esHoy && 'bg-rosa text-white',
                  seleccionado && !esHoy && 'bg-rosa-muted text-rosa',
                  !esHoy && !seleccionado && 'text-gris-700',
                )}
              >
                {format(dia, 'd')}
              </div>
            </button>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="grid grid-cols-[56px_repeat(7,1fr)] gap-0 border-t border-gris-200">
        {horas.map((hora) => (
          <div key={hora} className="contents">
            {/* Hour label */}
            <div className="text-xs font-sans font-semibold text-gris-300 text-right pr-3 py-3 border-b border-gris-100">
              {hora.toString().padStart(2, '0')}:00
            </div>
            {/* Day cells */}
            {dias.map((dia) => {
              const fechaStr = format(dia, 'yyyy-MM-dd');
              const eventosHora = eventosCalendario.filter((ev) => {
                if (ev.fecha !== fechaStr) return false;
                const minInicio = horaAMinutos(ev.horaInicio);
                return minInicio >= hora * 60 && minInicio < (hora + 1) * 60;
              });

              return (
                <div
                  key={`${hora}-${dia.toISOString()}`}
                  className="relative border-b border-l border-gris-100 min-h-[48px] mx-0.5"
                >
                  {eventosHora.map((ev) => (
                    <button
                      key={ev.id}
                      onClick={() => onSelectDia(dia)}
                      className={clsx(
                        'absolute inset-x-0.5 top-0.5 rounded-lg px-1.5 py-1 text-[10px] leading-tight text-white font-sans font-bold truncate',
                        colorTipo[ev.tipo],
                      )}
                      title={ev.titulo}
                    >
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

/* ================================================
   MAIN: Calendar
   ================================================ */
export default function Calendar() {
  const [vista, setVista] = useState<Vista>('mensual');
  const [mesActual, setMesActual] = useState(new Date(2026, 2, 1));
  const [semanaActual, setSemanaActual] = useState(new Date(2026, 2, 23));
  const [diaSeleccionado, setDiaSeleccionado] = useState(new Date(2026, 2, 23));
  const [completados, setCompletados] = useState<Record<string, boolean>>(
    Object.fromEntries(eventosCalendario.map((e) => [e.id, e.completado])),
  );

  const eventosDiaSeleccionado = useMemo(
    () => eventosDelDia(diaSeleccionado),
    [diaSeleccionado],
  );

  function navegarAnterior() {
    if (vista === 'mensual') {
      setMesActual((m) => subMonths(m, 1));
    } else {
      setSemanaActual((s) => subWeeks(s, 1));
    }
  }

  function navegarSiguiente() {
    if (vista === 'mensual') {
      setMesActual((m) => addMonths(m, 1));
    } else {
      setSemanaActual((s) => addWeeks(s, 1));
    }
  }

  const mesNombre = format(mesActual, 'MMMM', { locale: es }).replace(/^\w/, (c) => c.toUpperCase());
  const anio = format(mesActual, 'yyyy');

  return (
    <div className="min-h-screen bg-gris-50">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={navegarAnterior}
              className="w-10 h-10 rounded-full bg-white shadow-sm border border-gris-200 flex items-center justify-center text-gris-500 hover:text-rosa transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div>
              <h1 className="font-sans text-4xl font-bold text-gris-800 leading-none">
                {mesNombre}
              </h1>
              <p className="font-sans text-lg text-gris-400 mt-0.5">{anio}</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={navegarSiguiente}
              className="w-10 h-10 rounded-full bg-white shadow-sm border border-gris-200 flex items-center justify-center text-gris-500 hover:text-rosa transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* View toggle pills */}
          <div className="flex bg-white rounded-full shadow-sm border border-gris-200 p-1 self-start sm:self-auto">
            {(['semanal', 'mensual'] as Vista[]).map((v) => (
              <button
                key={v}
                onClick={() => setVista(v)}
                className={clsx(
                  'px-5 py-2 rounded-full text-sm font-sans font-bold transition-all duration-200',
                  vista === v
                    ? 'bg-rosa text-white'
                    : 'bg-white text-gris-500 hover:text-rosa',
                )}
              >
                {v === 'semanal' ? 'Semana' : 'Mes'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Calendar grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gris-100 p-4 sm:p-6 mb-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${vista}-${mesActual.toISOString()}-${semanaActual.toISOString()}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2, ease: 'easeOut' as const }}
            >
              {vista === 'mensual' ? (
                <VistaMensual
                  mesActual={mesActual}
                  diaSeleccionado={diaSeleccionado}
                  onSelectDia={setDiaSeleccionado}
                />
              ) : (
                <VistaSemanal
                  semanaActual={semanaActual}
                  diaSeleccionado={diaSeleccionado}
                  onSelectDia={setDiaSeleccionado}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Selected day events */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 rounded-full bg-rosa" />
            <div>
              <h3 className="font-sans text-xl font-bold text-gris-800">
                Eventos del dia
              </h3>
              <p className="text-sm text-gris-400 font-sans">
                {format(diaSeleccionado, "EEEE d 'de' MMMM", { locale: es }).replace(/^\w/, (c) => c.toUpperCase())}
              </p>
            </div>
          </div>

          {eventosDiaSeleccionado.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-sm border border-gris-100 p-10 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gris-100 flex items-center justify-center mb-4">
                <CalendarIcon className="w-8 h-8 text-gris-300" />
              </div>
              <p className="font-sans text-lg font-bold text-gris-300">
                No hay eventos programados
              </p>
              <p className="text-sm text-gris-300 mt-1">
                Dia libre para descansar
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {eventosDiaSeleccionado.map((evento, idx) => (
                <motion.div
                  key={evento.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, ease: 'easeOut' as const }}
                  className={clsx(
                    'bg-white rounded-2xl shadow-sm border border-gris-100 p-4 sm:p-5 flex items-start gap-4 border-l-4',
                    colorTipoBorder[evento.tipo],
                  )}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() =>
                      setCompletados((prev) => ({
                        ...prev,
                        [evento.id]: !prev[evento.id],
                      }))
                    }
                    className={clsx(
                      'w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200',
                      completados[evento.id]
                        ? 'bg-rosa border-rosa text-white'
                        : 'border-gris-300 hover:border-rosa',
                    )}
                    aria-label={completados[evento.id] ? 'Marcar como pendiente' : 'Marcar como completado'}
                  >
                    {completados[evento.id] && <Check className="w-3.5 h-3.5" />}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Time */}
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3.5 h-3.5 text-gris-400" />
                      <span className="text-sm font-sans font-bold text-azul">
                        {evento.horaInicio}
                        {evento.horaFin && ` - ${evento.horaFin}`}
                      </span>
                    </div>

                    {/* Title */}
                    <h4
                      className={clsx(
                        'font-sans font-bold text-gris-800 text-base',
                        completados[evento.id] && 'line-through text-gris-300',
                      )}
                    >
                      {evento.titulo}
                    </h4>

                    {/* Badges */}
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <span
                        className={clsx(
                          'text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 font-sans',
                          colorTipoBadge[evento.tipo],
                        )}
                      >
                        {iconoTipo[evento.tipo]}
                        {etiquetaTipo[evento.tipo]}
                      </span>
                      {completados[evento.id] && (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-exito/10 text-exito font-sans">
                          Completado
                        </span>
                      )}
                    </div>

                    {evento.notas && (
                      <p className="text-sm text-gris-400 mt-2 italic">
                        {evento.notas}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
