import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Check, Clock, Trash2, UserPlus, X, Mail, Phone, Activity,
} from 'lucide-react';
import { miembrosFamiliares } from '../data/mockData';
import type { MiembroFamiliar } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

type FiltroEstado = 'todos' | 'activos' | 'inactivos';
type Rol = MiembroFamiliar['rol'];

const rosa = '#FD4282';
const azul = '#3F50B3';
const dark = '#0a0a12';
const grey = '#8a8a8a';

const ctn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } } };

const colorRol: Record<Rol, string> = {
  admin: rosa,
  cuidador: azul,
  familiar: '#A855F7',
  medico: '#22C55E',
};

const labelRol: Record<Rol, string> = {
  admin: 'Administrador',
  cuidador: 'Cuidador',
  familiar: 'Familiar',
  medico: 'Médico',
};

const todosLosPermisos = [
  { clave: 'ver_dashboard', etiqueta: 'Panel', short: 'Panel' },
  { clave: 'ver_alertas', etiqueta: 'Alertas', short: 'Alertas' },
  { clave: 'editar_rutinas', etiqueta: 'Editar rutinas', short: 'Rutinas' },
  { clave: 'ver_calendario', etiqueta: 'Calendario', short: 'Calendar' },
  { clave: 'editar_recordatorios', etiqueta: 'Recordatorios', short: 'Records' },
  { clave: 'ver_salud', etiqueta: 'Datos salud', short: 'Salud' },
  { clave: 'configurar_dispositivo', etiqueta: 'Dispositivo', short: 'Device' },
  { clave: 'gestionar_familia', etiqueta: 'Familia', short: 'Familia' },
];

function relTime(ts?: string): string {
  if (!ts) return 'Sin registro';
  const d = Math.floor((Date.now() - new Date(ts).getTime()) / 60000);
  if (d < 1) return 'Ahora mismo';
  if (d < 60) return `Hace ${d} min`;
  const h = Math.floor(d / 60);
  if (h < 24) return `Hace ${h}h`;
  const days = Math.floor(h / 24);
  if (days === 1) return 'Hace 1 día';
  return `Hace ${days} días`;
}

function iniciales(nombre: string, apellido: string): string {
  return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
}

const filtros: { valor: FiltroEstado; etiqueta: string }[] = [
  { valor: 'todos', etiqueta: 'Todos' },
  { valor: 'activos', etiqueta: 'Activos' },
  { valor: 'inactivos', etiqueta: 'Inactivos' },
];

const actividadesRecientes = [
  { usuario: 'Demo Emprendimiento', iniciales: 'DE', accion: 'editó los recordatorios', tiempo: 'Hace 2 horas', color: rosa },
  { usuario: 'Carlos González', iniciales: 'CG', accion: 'vio el panel principal', tiempo: 'Hace 4 horas', color: azul },
  { usuario: 'Ana López', iniciales: 'AL', accion: 'modificó la rutina matutina', tiempo: 'Hace 1 día', color: '#A855F7' },
  { usuario: 'Dr. Roberto Ramírez', iniciales: 'RR', accion: 'revisó los datos de salud', tiempo: 'Hace 2 días', color: '#22C55E' },
];

function hasPermiso(m: MiembroFamiliar, clave: string): boolean {
  return m.permisos.includes('todo') || m.permisos.includes(clave);
}

export default function FamilyManagement() {
  const [miembros, setMiembros] = useLocalStorage<MiembroFamiliar[]>('familia:miembros', miembrosFamiliares);
  const [filtro, setFiltro] = useLocalStorage<FiltroEstado>('familia:filtro', 'todos');
  const [showInvite, setShowInvite] = useState(false);
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [permisosTemp, setPermisosTemp] = useState<string[]>([]);
  const [draft, setDraft] = useState<{
    nombre: string; apellido: string; email: string; telefono: string; rol: Rol;
  }>({ nombre: '', apellido: '', email: '', telefono: '', rol: 'familiar' });

  const filtrados = useMemo(() => {
    if (filtro === 'activos') return miembros.filter((m) => m.activo);
    if (filtro === 'inactivos') return miembros.filter((m) => !m.activo);
    return miembros;
  }, [miembros, filtro]);

  const stats = {
    total: miembros.length,
    activos: miembros.filter((m) => m.activo).length,
    admins: miembros.filter((m) => m.rol === 'admin').length,
    medicos: miembros.filter((m) => m.rol === 'medico').length,
    cuidadores: miembros.filter((m) => m.rol === 'cuidador').length,
  };

  const rolesCount = (['admin', 'cuidador', 'familiar', 'medico'] as Rol[])
    .map((r) => ({ rol: r, count: miembros.filter((m) => m.rol === r).length, color: colorRol[r] }))
    .filter((r) => r.count > 0);
  const totalRoles = rolesCount.reduce((s, r) => s + r.count, 0) || 1;
  let cum = 0;
  const donut = rolesCount.map((r) => {
    const pct = r.count / totalRoles;
    const offset = cum;
    cum += pct;
    return { ...r, pct, offsetPct: offset };
  });

  const openPermisos = (id: string) => {
    if (editingMember === id) {
      setEditingMember(null);
      return;
    }
    const m = miembros.find((x) => x.id === id);
    if (!m) return;
    setEditingMember(id);
    setPermisosTemp(m.permisos.includes('todo') ? todosLosPermisos.map((p) => p.clave) : [...m.permisos]);
  };

  const togglePermiso = (clave: string) =>
    setPermisosTemp((prev) => prev.includes(clave) ? prev.filter((p) => p !== clave) : [...prev, clave]);

  const guardarPermisos = () => {
    if (!editingMember) return;
    setMiembros((prev) => prev.map((m) => m.id === editingMember ? { ...m, permisos: [...permisosTemp] } : m));
    setEditingMember(null);
  };

  const eliminar = (id: string) => setMiembros((prev) => prev.filter((m) => m.id !== id));
  const toggleActivo = (id: string) => setMiembros((prev) => prev.map((m) => m.id === id ? { ...m, activo: !m.activo } : m));

  const invitar = () => {
    if (!draft.nombre.trim() || !draft.email.trim()) return;
    const nuevo: MiembroFamiliar = {
      id: `f-${Date.now()}`,
      nombre: draft.nombre.trim(), apellido: draft.apellido.trim(),
      email: draft.email.trim(),
      telefono: draft.telefono.trim() || undefined,
      rol: draft.rol,
      permisos: ['ver_dashboard', 'ver_alertas'],
      activo: true, ultimoAcceso: undefined,
    };
    setMiembros((prev) => [...prev, nuevo]);
    setDraft({ nombre: '', apellido: '', email: '', telefono: '', rol: 'familiar' });
    setShowInvite(false);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 pointer-events-none flex items-start justify-center overflow-hidden" style={{ height: '50vh' }}>
        <span className="whitespace-nowrap select-none" style={{
          fontSize: 'clamp(140px, 24vw, 420px)', fontWeight: 900, lineHeight: 0.85,
          letterSpacing: '-0.05em', color: `${dark}05`, textTransform: 'uppercase', marginTop: '-20px',
        }}>
          Familia
        </span>
      </div>

      <span className="absolute pointer-events-none select-none top-[12%] right-[6%] text-2xl" style={{ color: `${rosa}30` }}>✦</span>
      <span className="absolute pointer-events-none select-none top-[8%] left-[5%] text-xl" style={{ color: `${azul}25` }}>◆</span>

      <motion.div variants={ctn} initial="hidden" animate="show" className="relative z-10 w-full pb-12 space-y-5">
        {/* HEADER */}
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: rosa }}>
              ✦ Equipo de cuidado · {stats.total} miembros
            </p>
            <h1 className="font-black uppercase tracking-tight" style={{
              fontSize: 'clamp(40px, 7vw, 80px)', lineHeight: 0.9, letterSpacing: '-0.04em', color: dark,
            }}>
              Gestión
              <span className="italic font-light" style={{ color: rosa }}> familiar</span>
            </h1>
          </div>

          <button onClick={() => setShowInvite(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.18em] shrink-0 self-start transition-all"
            style={{ background: rosa, color: 'white', boxShadow: `0 6px 20px ${rosa}40` }}>
            <UserPlus size={13} /> Invitar miembro
          </button>
        </motion.div>

        {/* TOP MOSAIC */}
        <div className="grid grid-cols-12 gap-4">
          <motion.div variants={item} className="col-span-12 lg:col-span-5 rounded-2xl border-2 p-6 relative overflow-hidden"
            style={{ background: dark, borderColor: `${dark}33` }}>
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none" style={{ background: `${rosa}25`, filter: 'blur(80px)' }} />
            <div className="relative">
              <p className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: rosa }}>✦ Equipo activo</p>
              <p className="font-black tracking-tight text-white mt-2" style={{ fontSize: 'clamp(64px, 10vw, 100px)', lineHeight: 0.85, letterSpacing: '-0.05em' }}>
                {stats.activos}
              </p>
              <p className="text-sm font-black uppercase tracking-tight" style={{ color: 'rgba(255,255,255,0.6)' }}>
                de {stats.total} miembros
              </p>

              <div className="mt-6 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <p className="text-[9px] font-black uppercase tracking-[0.25em] mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>Equipo en línea</p>
                <div className="flex items-center -space-x-2">
                  {miembros.filter((m) => m.activo).slice(0, 5).map((m) => (
                    <div key={m.id} className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[10px] font-black tracking-wider"
                      style={{ background: colorRol[m.rol], border: `2.5px solid ${dark}` }}>
                      {iniciales(m.nombre, m.apellido)}
                    </div>
                  ))}
                  {miembros.filter((m) => m.activo).length > 5 && (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black"
                      style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: `2.5px solid ${dark}` }}>
                      +{miembros.filter((m) => m.activo).length - 5}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="col-span-12 md:col-span-6 lg:col-span-4 rounded-2xl border-2 p-5"
            style={{ background: 'white', borderColor: `${dark}33` }}>
            <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: azul }}>◆ Por rol</p>
            <h3 className="font-black uppercase tracking-tight text-xl mt-1 mb-3" style={{ color: dark }}>
              Distribución
            </h3>

            <div className="flex items-center gap-4">
              <div className="relative w-32 h-32 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke={`${dark}08`} strokeWidth="14" />
                  {donut.map((s) => {
                    const C = 2 * Math.PI * 40;
                    return (
                      <circle key={s.rol}
                        cx="50" cy="50" r="40" fill="none" stroke={s.color} strokeWidth="14"
                        strokeDasharray={`${s.pct * C} ${C}`}
                        strokeDashoffset={-s.offsetPct * C}
                        style={{ transition: 'all 0.7s ease' }} />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black tracking-tight" style={{ color: dark }}>{stats.total}</span>
                  <span className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>total</span>
                </div>
              </div>

              <div className="flex-1 space-y-1.5">
                {donut.map((s) => (
                  <div key={s.rol} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-sm" style={{ background: s.color }} />
                      <span className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color: dark }}>
                        {labelRol[s.rol]}
                      </span>
                    </div>
                    <span className="text-[10px] font-black tracking-tight" style={{ color: dark }}>{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3 grid grid-cols-2 gap-3 content-start">
            {[
              { label: 'Admins', value: stats.admins, color: rosa, Icon: Shield },
              { label: 'Médicos', value: stats.medicos, color: '#22C55E', Icon: Activity },
              { label: 'Cuidadores', value: stats.cuidadores, color: azul, Icon: UserPlus },
              { label: 'Inactivos', value: stats.total - stats.activos, color: grey, Icon: Clock },
            ].map((k) => (
              <motion.div key={k.label} variants={item} className="rounded-2xl border-2 p-3"
                style={{ background: 'white', borderColor: `${dark}33` }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${k.color}15` }}>
                    <k.Icon size={11} style={{ color: k.color }} />
                  </div>
                </div>
                <p className="text-2xl font-black tracking-tight" style={{ color: dark, letterSpacing: '-0.04em' }}>{k.value}</p>
                <p className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>{k.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PERMISSION MATRIX */}
        <motion.div variants={item} className="rounded-2xl border-2 p-5 overflow-x-auto"
          style={{ background: 'white', borderColor: `${dark}33` }}>
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: rosa }}>✦ Permisos</p>
              <h3 className="font-black uppercase tracking-tight text-xl mt-1" style={{ color: dark }}>Matriz de acceso</h3>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>
              {todosLosPermisos.length} permisos
            </span>
          </div>

          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr style={{ borderBottom: `2px solid ${dark}1A` }}>
                <th className="text-[9px] font-black uppercase tracking-[0.2em] py-3 pr-3" style={{ color: grey }}>
                  Miembro
                </th>
                {todosLosPermisos.map((p) => (
                  <th key={p.clave} className="text-[8px] font-black uppercase tracking-[0.15em] py-3 px-1 text-center"
                    style={{ color: grey, minWidth: 70 }}>
                    {p.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {miembros.map((m) => (
                <tr key={m.id} style={{ borderBottom: `1px solid ${dark}10`, opacity: m.activo ? 1 : 0.4 }}>
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-black tracking-wider shrink-0"
                        style={{ background: colorRol[m.rol] }}>
                        {iniciales(m.nombre, m.apellido)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-black uppercase tracking-tight truncate" style={{ color: dark }}>
                          {m.nombre} {m.apellido.charAt(0)}.
                        </p>
                        <p className="text-[8px] font-black uppercase tracking-[0.15em]" style={{ color: colorRol[m.rol] }}>
                          {labelRol[m.rol]}
                        </p>
                      </div>
                    </div>
                  </td>
                  {todosLosPermisos.map((p) => {
                    const has = hasPermiso(m, p.clave);
                    return (
                      <td key={p.clave} className="text-center py-3 px-1">
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-md"
                          style={{
                            background: has ? `${colorRol[m.rol]}20` : `${dark}05`,
                            border: `1.5px solid ${has ? colorRol[m.rol] : `${dark}10`}`,
                          }}>
                          {has && <Check size={11} style={{ color: colorRol[m.rol] }} strokeWidth={3} />}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* FILTERS */}
        <motion.div variants={item} className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
          {filtros.map((f) => {
            const active = filtro === f.valor;
            return (
              <button key={f.valor} onClick={() => setFiltro(f.valor)}
                className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.18em] whitespace-nowrap transition-all"
                style={{
                  background: active ? dark : 'white',
                  color: active ? 'white' : dark,
                  border: active ? 'none' : `1.5px solid ${dark}33`,
                  boxShadow: active ? `0 6px 18px ${dark}30` : 'none',
                }}>
                {f.etiqueta}
              </button>
            );
          })}
        </motion.div>

        {/* MEMBERS GRID + ACTIVITY SIDEBAR */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AnimatePresence>
              {filtrados.map((m) => {
                const color = colorRol[m.rol];
                const expanded = editingMember === m.id;
                return (
                  <motion.div key={m.id} layout
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="rounded-2xl border-2 overflow-hidden flex flex-col"
                    style={{ background: 'white', borderColor: `${dark}33`, opacity: m.activo ? 1 : 0.6 }}>

                    <div className="h-1.5" style={{ background: color }} />

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white text-sm font-black tracking-wider"
                          style={{ background: color, boxShadow: `0 4px 14px ${color}40` }}>
                          {iniciales(m.nombre, m.apellido)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5 rounded"
                              style={{ background: `${color}10`, color }}>
                              {labelRol[m.rol]}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: m.activo ? '#22C55E' : `${dark}25` }} />
                          </div>
                          <p className="font-black uppercase tracking-tight text-sm" style={{ color: dark, lineHeight: 1.1 }}>
                            {m.nombre} {m.apellido}
                          </p>
                          <p className="text-[10px] truncate" style={{ color: grey }}>{m.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.15em] mt-auto pt-3"
                        style={{ borderTop: `1px solid ${dark}15`, color: grey }}>
                        <span><Clock size={9} className="inline -mt-0.5 mr-0.5" />{relTime(m.ultimoAcceso)}</span>
                        <span>{m.permisos.includes('todo') ? todosLosPermisos.length : m.permisos.length} permisos</span>
                      </div>

                      <div className="flex items-center gap-1.5 mt-3">
                        <button onClick={() => openPermisos(m.id)}
                          className="flex-1 text-[9px] font-black uppercase tracking-[0.18em] px-2 py-1.5 rounded-full transition-all"
                          style={{ background: expanded ? color : `${dark}05`, color: expanded ? 'white' : dark }}>
                          <Shield size={10} className="inline mr-1" />Permisos
                        </button>
                        <button onClick={() => toggleActivo(m.id)}
                          className="text-[9px] font-black uppercase tracking-[0.18em] px-2 py-1.5 rounded-full"
                          style={{ background: `${dark}05`, color: dark }}>
                          {m.activo ? 'Pausar' : 'Activar'}
                        </button>
                        {m.rol !== 'admin' && (
                          <button onClick={() => eliminar(m.id)}
                            className="w-7 h-7 rounded-full flex items-center justify-center"
                            style={{ background: '#EF444410', color: '#EF4444' }}>
                            <Trash2 size={10} />
                          </button>
                        )}
                      </div>

                      <AnimatePresence>
                        {expanded && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${dark}15` }}>
                              <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: rosa }}>
                                {permisosTemp.length} de {todosLosPermisos.length}
                              </p>
                              <div className="grid grid-cols-2 gap-1.5 mb-3">
                                {todosLosPermisos.map((p) => {
                                  const checked = permisosTemp.includes(p.clave);
                                  return (
                                    <button key={p.clave} onClick={() => togglePermiso(p.clave)}
                                      className="flex items-center gap-1.5 p-1.5 rounded-lg transition-all text-left"
                                      style={{
                                        background: checked ? `${color}10` : 'transparent',
                                        border: `1.5px solid ${checked ? `${color}40` : `${dark}10`}`,
                                      }}>
                                      <div className="w-3.5 h-3.5 rounded flex items-center justify-center shrink-0"
                                        style={{
                                          background: checked ? color : 'transparent',
                                          border: `1.5px solid ${checked ? color : `${dark}25`}`,
                                        }}>
                                        {checked && <Check size={9} className="text-white" strokeWidth={3} />}
                                      </div>
                                      <span className="text-[9px] font-bold" style={{ color: dark }}>{p.short}</span>
                                    </button>
                                  );
                                })}
                              </div>
                              <button onClick={guardarPermisos}
                                className="w-full py-2 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] text-white"
                                style={{ background: color, boxShadow: `0 4px 12px ${color}40` }}>
                                Guardar
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <motion.div variants={item} className="col-span-12 lg:col-span-4 rounded-2xl border-2 p-5 self-start lg:sticky lg:top-24"
            style={{ background: 'white', borderColor: `${dark}33` }}>
            <div className="flex items-center gap-2 mb-4">
              <Activity size={14} style={{ color: azul }} />
              <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: dark }}>Bitácora reciente</p>
            </div>
            <div className="space-y-3 relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-px" style={{ background: `${dark}15` }} />
              {actividadesRecientes.map((a, i) => (
                <div key={i} className="relative flex items-start gap-3 pl-1">
                  <div className="relative w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 text-white text-[9px] font-black tracking-wider"
                    style={{ background: a.color, boxShadow: `0 2px 8px ${a.color}40` }}>
                    {a.iniciales}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] leading-snug" style={{ color: dark }}>
                      <span className="font-black uppercase tracking-tight">{a.usuario.split(' ')[0]}</span>
                      <span style={{ color: grey }}> {a.accion}</span>
                    </p>
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] mt-0.5" style={{ color: grey }}>{a.tiempo}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* INVITE MODAL */}
      <AnimatePresence>
        {showInvite && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            style={{ background: 'rgba(10,10,18,0.4)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowInvite(false)}>
            <motion.div onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
              transition={{ ease: 'easeOut' as const, duration: 0.3 }}
              className="w-full max-w-lg rounded-2xl border-2 p-6 space-y-4"
              style={{ background: 'white', borderColor: `${dark}33`, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: rosa }}>✦ Nuevo miembro</p>
                  <h2 className="font-black uppercase tracking-tight mt-1" style={{
                    fontSize: 28, lineHeight: 1, color: dark, letterSpacing: '-0.04em',
                  }}>
                    Invitar al equipo
                  </h2>
                </div>
                <button onClick={() => setShowInvite(false)} className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: `${dark}05` }}>
                  <X size={14} style={{ color: dark }} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={draft.nombre} onChange={(e) => setDraft({ ...draft, nombre: e.target.value })}
                  placeholder="Nombre" className="px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: `${dark}03`, border: `1.5px solid ${dark}15`, color: dark }} autoFocus />
                <input type="text" value={draft.apellido} onChange={(e) => setDraft({ ...draft, apellido: e.target.value })}
                  placeholder="Apellido" className="px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: `${dark}03`, border: `1.5px solid ${dark}15`, color: dark }} />
              </div>

              <div className="relative">
                <Mail size={13} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: grey }} />
                <input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                  placeholder="Email" className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: `${dark}03`, border: `1.5px solid ${dark}15`, color: dark }} />
              </div>

              <div className="relative">
                <Phone size={13} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: grey }} />
                <input type="tel" value={draft.telefono} onChange={(e) => setDraft({ ...draft, telefono: e.target.value })}
                  placeholder="Teléfono (opcional)" className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: `${dark}03`, border: `1.5px solid ${dark}15`, color: dark }} />
              </div>

              <div>
                <label className="text-[9px] font-black uppercase tracking-[0.2em] block mb-2" style={{ color: grey }}>Rol</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['familiar', 'cuidador', 'medico', 'admin'] as Rol[]).map((r) => (
                    <button key={r} onClick={() => setDraft({ ...draft, rol: r })}
                      className="py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] transition-all"
                      style={{
                        background: draft.rol === r ? colorRol[r] : `${dark}03`,
                        color: draft.rol === r ? 'white' : dark,
                        boxShadow: draft.rol === r ? `0 4px 14px ${colorRol[r]}40` : 'none',
                      }}>
                      {labelRol[r]}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={invitar}
                className="w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white mt-2"
                style={{ background: rosa, boxShadow: `0 4px 16px ${rosa}40` }}>
                Enviar invitación
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
