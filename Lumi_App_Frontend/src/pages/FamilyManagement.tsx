import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import {
  Shield,
  Check,
  Clock,
  Trash2,
  ChevronDown,
  ChevronUp,
  UserPlus,
} from 'lucide-react';
import { miembrosFamiliares } from '../data/mockData';
import type { MiembroFamiliar } from '../types';

type FiltroEstado = 'todos' | 'activos' | 'inactivos';

const coloresAvatar: Record<string, string> = {
  admin: 'bg-rosa',
  cuidador: 'bg-azul',
  familiar: 'bg-gris-500',
  medico: 'bg-exito',
};

const coloresRolBadge: Record<string, string> = {
  admin: 'bg-rosa-light text-rosa',
  cuidador: 'bg-azul-light text-azul',
  familiar: 'bg-gris-200 text-gris-600',
  medico: 'bg-exito/10 text-exito',
};

const etiquetasRol: Record<string, string> = {
  admin: 'Administrador',
  cuidador: 'Cuidador',
  familiar: 'Familiar',
  medico: 'M\u00e9dico',
};

const todosLosPermisos = [
  { clave: 'ver_dashboard', etiqueta: 'Ver panel principal' },
  { clave: 'ver_alertas', etiqueta: 'Ver alertas' },
  { clave: 'editar_rutinas', etiqueta: 'Editar rutinas' },
  { clave: 'ver_calendario', etiqueta: 'Ver calendario' },
  { clave: 'editar_recordatorios', etiqueta: 'Editar recordatorios' },
  { clave: 'ver_salud', etiqueta: 'Ver datos de salud' },
  { clave: 'configurar_dispositivo', etiqueta: 'Configurar dispositivo' },
  { clave: 'gestionar_familia', etiqueta: 'Gestionar familia' },
];

const coloresPuntoActividad: string[] = [
  'bg-rosa',
  'bg-azul',
  'bg-rosa',
  'bg-exito',
];

const actividadesRecientes = [
  {
    usuario: 'Mar\u00eda Gonz\u00e1lez',
    iniciales: 'MG',
    accion: 'edit\u00f3 los recordatorios',
    tiempo: 'Hace 2 horas',
  },
  {
    usuario: 'Carlos Gonz\u00e1lez',
    iniciales: 'CG',
    accion: 'vio el panel principal',
    tiempo: 'Hace 4 horas',
  },
  {
    usuario: 'Ana L\u00f3pez',
    iniciales: 'AL',
    accion: 'modific\u00f3 la rutina matutina',
    tiempo: 'Hace 1 d\u00eda',
  },
  {
    usuario: 'Dr. Roberto Ram\u00edrez',
    iniciales: 'RR',
    accion: 'revis\u00f3 los datos de salud',
    tiempo: 'Hace 2 d\u00edas',
  },
];

function tiempoRelativo(timestamp?: string): string {
  if (!timestamp) return 'Sin registro';
  const ahora = new Date();
  const fecha = new Date(timestamp);
  const diffMs = ahora.getTime() - fecha.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHoras = Math.floor(diffMin / 60);
  const diffDias = Math.floor(diffHoras / 24);

  if (diffMin < 1) return 'Ahora mismo';
  if (diffMin < 60) return `Hace ${diffMin} min`;
  if (diffHoras < 24) return `Hace ${diffHoras}h`;
  if (diffDias === 1) return 'Hace 1 d\u00eda';
  return `Hace ${diffDias} d\u00edas`;
}

function obtenerIniciales(nombre: string, apellido: string): string {
  return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
}

export default function FamilyManagement() {
  const [miembros, setMiembros] = useState<MiembroFamiliar[]>(
    () => structuredClone(miembrosFamiliares)
  );
  const [filtro, setFiltro] = useState<FiltroEstado>('todos');
  const [expandidoId, setExpandidoId] = useState<string | null>(null);
  const [permisosTemp, setPermisosTemp] = useState<string[]>([]);

  const miembrosFiltrados =
    filtro === 'todos'
      ? miembros
      : filtro === 'activos'
        ? miembros.filter((m) => m.activo)
        : miembros.filter((m) => !m.activo);

  const totalMiembros = miembros.length;

  function abrirPermisos(miembro: MiembroFamiliar) {
    if (expandidoId === miembro.id) {
      setExpandidoId(null);
      return;
    }
    setExpandidoId(miembro.id);
    setPermisosTemp(
      miembro.permisos.includes('todo')
        ? todosLosPermisos.map((p) => p.clave)
        : [...miembro.permisos]
    );
  }

  function togglePermiso(clave: string) {
    setPermisosTemp((prev) =>
      prev.includes(clave) ? prev.filter((p) => p !== clave) : [...prev, clave]
    );
  }

  function guardarPermisos() {
    if (!expandidoId) return;
    setMiembros((prev) =>
      prev.map((m) =>
        m.id === expandidoId ? { ...m, permisos: [...permisosTemp] } : m
      )
    );
    setExpandidoId(null);
  }

  function eliminarMiembro(id: string) {
    setMiembros((prev) => prev.filter((m) => m.id !== id));
  }

  const filtrosEstado: { valor: FiltroEstado; etiqueta: string }[] = [
    { valor: 'todos', etiqueta: 'Todos' },
    { valor: 'activos', etiqueta: 'Activos' },
    { valor: 'inactivos', etiqueta: 'Inactivos' },
  ];

  return (
    <div className="min-h-screen bg-gris-50 px-4 py-8 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-3xl font-bold text-negro">
              Tu familia
            </h1>
            <span className="rounded-full bg-rosa-light px-3.5 py-1.5 text-xs font-semibold text-rosa">
              {totalMiembros} miembros
            </span>
          </div>
          <p className="mt-2 text-sm text-gris-500">
            Administra los miembros y permisos de acceso al sistema Lumi.
          </p>
        </motion.div>

        {/* Barra de acciones */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: 'easeOut' as const }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <button className="inline-flex items-center gap-2 rounded-xl bg-rosa px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rosa-hover">
            <UserPlus className="h-4 w-4" />
            Invitar miembro
          </button>

          <div className="flex gap-2">
            {filtrosEstado.map((f) => (
              <button
                key={f.valor}
                onClick={() => setFiltro(f.valor)}
                className={clsx(
                  'rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200',
                  filtro === f.valor
                    ? 'bg-rosa text-white'
                    : 'bg-white text-gris-500 shadow-sm hover:bg-gris-100'
                )}
              >
                {f.etiqueta}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tarjetas de miembros */}
        <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {miembrosFiltrados.map((miembro, idx) => {
              const estaExpandido = expandidoId === miembro.id;
              const esAdmin = miembro.rol === 'admin';

              return (
                <motion.div
                  key={miembro.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05, ease: 'easeOut' as const }}
                  className="rounded-2xl border border-gris-100 bg-white p-5 shadow-sm"
                >
                  {/* Cabecera */}
                  <div className="mb-4 flex items-start gap-4">
                    {/* Avatar */}
                    <div
                      className={clsx(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white',
                        coloresAvatar[miembro.rol]
                      )}
                    >
                      {obtenerIniciales(miembro.nombre, miembro.apellido)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-base font-semibold text-negro">
                          {miembro.nombre} {miembro.apellido}
                        </h3>
                        <span
                          className={clsx(
                            'h-2.5 w-2.5 shrink-0 rounded-full',
                            miembro.activo ? 'bg-exito' : 'bg-gris-300'
                          )}
                          title={miembro.activo ? 'Activo' : 'Inactivo'}
                        />
                      </div>
                      <p className="mt-0.5 truncate text-xs text-gris-400">
                        {miembro.email}
                      </p>
                    </div>
                  </div>

                  {/* Badge de rol */}
                  <div className="mb-3">
                    <span
                      className={clsx(
                        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold',
                        coloresRolBadge[miembro.rol]
                      )}
                    >
                      <Shield className="h-3 w-3" />
                      {etiquetasRol[miembro.rol]}
                    </span>
                  </div>

                  {/* Ultimo acceso */}
                  <div className="mb-4 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-gris-400" />
                    <span className="text-xs text-gris-400">
                      \u00daltimo acceso: {tiempoRelativo(miembro.ultimoAcceso)}
                    </span>
                  </div>

                  {/* Boton de permisos */}
                  <button
                    onClick={() => abrirPermisos(miembro)}
                    className="flex w-full items-center justify-between rounded-xl border border-gris-200 px-4 py-2.5 text-xs font-semibold text-gris-600 transition-colors hover:border-rosa/30 hover:bg-rosa-light"
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="h-3.5 w-3.5 text-rosa" />
                      Permisos
                    </span>
                    {estaExpandido ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>

                  {/* Seccion expandible de permisos */}
                  <AnimatePresence>
                    {estaExpandido && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' as const }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 space-y-2">
                          {todosLosPermisos.map((permiso) => {
                            const activo = permisosTemp.includes(permiso.clave);
                            return (
                              <label
                                key={permiso.clave}
                                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-gris-50"
                              >
                                <div
                                  className={clsx(
                                    'flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors',
                                    activo
                                      ? 'border-rosa bg-rosa'
                                      : 'border-gris-300 bg-white'
                                  )}
                                >
                                  {activo && (
                                    <Check className="h-3 w-3 text-white" />
                                  )}
                                </div>
                                <input
                                  type="checkbox"
                                  checked={activo}
                                  onChange={() => togglePermiso(permiso.clave)}
                                  className="sr-only"
                                />
                                <span className="text-sm text-gris-700">
                                  {permiso.etiqueta}
                                </span>
                              </label>
                            );
                          })}

                          <button
                            onClick={guardarPermisos}
                            className="mt-3 w-full rounded-xl bg-rosa px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rosa-hover"
                          >
                            Guardar
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Boton eliminar (solo no-admin) */}
                  {!esAdmin && (
                    <button
                      onClick={() => eliminarMiembro(miembro.id)}
                      className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-peligro transition-colors hover:bg-peligro/5"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Eliminar
                    </button>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Actividad reciente */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ease: 'easeOut' as const }}
          className="rounded-2xl bg-negro p-6"
        >
          <h2 className="mb-6 text-lg font-bold text-white">
            Actividad reciente
          </h2>

          {/* Linea de tiempo */}
          <div className="relative">
            {/* Linea vertical */}
            <div className="absolute bottom-2 left-[15px] top-2 w-0.5 bg-gris-700" />

            <div className="space-y-5">
              {actividadesRecientes.map((act, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.35 + idx * 0.08,
                    ease: 'easeOut' as const,
                  }}
                  className="flex items-start gap-4"
                >
                  {/* Punto de color solido */}
                  <div className="relative z-10 mt-1.5 flex shrink-0 items-center justify-center">
                    <div
                      className={clsx(
                        'h-[10px] w-[10px] rounded-full ring-3 ring-negro',
                        coloresPuntoActividad[idx] || 'bg-gris-500'
                      )}
                    />
                  </div>

                  {/* Avatar + contenido */}
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gris-800 text-[11px] font-bold text-gris-300">
                      {act.iniciales}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gris-300">
                        <span className="font-semibold text-white">
                          {act.usuario}
                        </span>{' '}
                        {act.accion}
                      </p>
                    </div>
                    <span className="shrink-0 text-[11px] text-gris-500">
                      {act.tiempo}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
