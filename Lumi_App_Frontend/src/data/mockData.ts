import type {
  Usuario, DispositivoLumi, Recordatorio, Alerta, Rutina,
  EventoCalendario, MiembroFamiliar, ConfiguracionDispositivo,
  DatosSalud, Notificacion
} from '../types';

export const usuarioActual: Usuario = {
  id: '1',
  nombre: 'DEMO',
  apellido: 'EMPRENDIMIENTO',
  email: 'demo@emprendimiento.com',
  rol: 'admin',
  telefono: '+52 55 1234 5678',
};

export const dispositivoLumi: DispositivoLumi = {
  id: 'lumi-001',
  nombre: 'Lumi de Abuelita Rosa',
  bateria: 78,
  senal: 92,
  estado: 'activo',
  ultimaActividad: 'Hace 5 minutos',
  ubicacion: { lat: 19.4326, lng: -99.1332 },
  nivelEmocional: 'feliz',
  sensores: {
    temperatura: 36.5,
    movimiento: true,
    caida: false,
  },
};

export const recordatorios: Recordatorio[] = [
  {
    id: 'r1',
    titulo: 'Metformina 500mg',
    descripcion: 'Tomar con alimentos',
    hora: '08:00',
    tipo: 'medicacion',
    completado: true,
    recurrente: true,
  },
  {
    id: 'r2',
    titulo: 'Caminata matutina',
    descripcion: '20 minutos por el jardín',
    hora: '09:30',
    tipo: 'ejercicio',
    completado: true,
    recurrente: true,
  },
  {
    id: 'r3',
    titulo: 'Losartán 50mg',
    descripcion: 'Tomar en ayunas',
    hora: '12:00',
    tipo: 'medicacion',
    completado: false,
    recurrente: true,
  },
  {
    id: 'r4',
    titulo: 'Comida principal',
    descripcion: 'Dieta baja en sodio',
    hora: '14:00',
    tipo: 'comida',
    completado: false,
    recurrente: true,
  },
  {
    id: 'r5',
    titulo: 'Cita con Dr. Ramírez',
    descripcion: 'Consulta de seguimiento cardiológico',
    hora: '16:30',
    tipo: 'cita',
    completado: false,
    recurrente: false,
  },
  {
    id: 'r6',
    titulo: 'Enalapril 10mg',
    descripcion: 'Tomar antes de dormir',
    hora: '21:00',
    tipo: 'medicacion',
    completado: false,
    recurrente: true,
  },
];

export const alertas: Alerta[] = [
  {
    id: 'a1',
    titulo: 'Sin actividad detectada',
    descripcion: 'No se detectó movimiento durante 2 horas. Lumi inició modo de monitoreo discreto y envió un saludo cálido.',
    timestamp: '2026-03-23T14:23:00',
    gravedad: 'alta',
    leida: false,
    tipo: 'salud',
  },
  {
    id: 'a2',
    titulo: 'Medicación pendiente',
    descripcion: 'El recordatorio de Losartán 50mg de las 12:00 no fue confirmado. Lumi realizó 3 intentos de recordatorio.',
    timestamp: '2026-03-23T12:45:00',
    gravedad: 'media',
    leida: false,
    tipo: 'medicacion',
  },
  {
    id: 'a3',
    titulo: 'Batería al 20%',
    descripcion: 'La batería de Lumi está baja. Se recomienda conectar al cargador pronto.',
    timestamp: '2026-03-23T10:15:00',
    gravedad: 'baja',
    leida: true,
    tipo: 'bateria',
  },
  {
    id: 'a4',
    titulo: 'Salida de zona segura',
    descripcion: 'Abuelita Rosa salió de la zona segura configurada (hogar). Lumi la está acompañando.',
    timestamp: '2026-03-22T16:30:00',
    gravedad: 'media',
    leida: true,
    tipo: 'zona',
  },
  {
    id: 'a5',
    titulo: 'Caída detectada (falsa alarma)',
    descripcion: 'Se detectó un movimiento brusco a las 09:12. Abuelita Rosa confirmó que estaba bien.',
    timestamp: '2026-03-22T09:12:00',
    gravedad: 'info',
    leida: true,
    tipo: 'caida',
  },
  {
    id: 'a6',
    titulo: 'Actualización de sistema completada',
    descripcion: 'Lumi se actualizó a la versión 3.2.1 con mejoras en detección de emociones.',
    timestamp: '2026-03-21T03:00:00',
    gravedad: 'info',
    leida: true,
    tipo: 'sistema',
  },
];

export const rutinas: Rutina[] = [
  {
    id: 'rut1',
    nombre: 'Rutina matutina',
    descripcion: 'Actividades de la mañana para empezar bien el día',
    pasos: [
      { id: 'p1', orden: 1, accion: 'Saludo de buenos días', duracion: 2, completado: true },
      { id: 'p2', orden: 2, accion: 'Verificar signos vitales', duracion: 3, completado: true },
      { id: 'p3', orden: 3, accion: 'Recordatorio de medicación', duracion: 5, completado: true },
      { id: 'p4', orden: 4, accion: 'Ejercicios de estiramiento guiados', duracion: 15, completado: false },
      { id: 'p5', orden: 5, accion: 'Resumen de actividades del día', duracion: 3, completado: false },
    ],
    horario: '07:30',
    diasSemana: [1, 2, 3, 4, 5, 6, 0],
    activa: true,
  },
  {
    id: 'rut2',
    nombre: 'Hora de medicamentos',
    descripcion: 'Recordatorio y verificación de toma de medicamentos',
    pasos: [
      { id: 'p6', orden: 1, accion: 'Anuncio amable de medicación', duracion: 1, completado: false },
      { id: 'p7', orden: 2, accion: 'Mostrar medicamento en pantalla', duracion: 2, completado: false },
      { id: 'p8', orden: 3, accion: 'Confirmar toma de medicamento', duracion: 3, completado: false },
      { id: 'p9', orden: 4, accion: 'Registrar en historial', duracion: 1, completado: false },
    ],
    horario: '12:00',
    diasSemana: [1, 2, 3, 4, 5, 6, 0],
    activa: true,
  },
  {
    id: 'rut3',
    nombre: 'Rutina nocturna',
    descripcion: 'Preparación para el descanso nocturno',
    pasos: [
      { id: 'p10', orden: 1, accion: 'Recordatorio de medicación nocturna', duracion: 5, completado: false },
      { id: 'p11', orden: 2, accion: 'Resumen del día', duracion: 3, completado: false },
      { id: 'p12', orden: 3, accion: 'Música relajante', duracion: 10, completado: false },
      { id: 'p13', orden: 4, accion: 'Activar modo descanso', duracion: 1, completado: false },
    ],
    horario: '21:00',
    diasSemana: [1, 2, 3, 4, 5, 6, 0],
    activa: true,
  },
];

export const eventosCalendario: EventoCalendario[] = [
  {
    id: 'ev1', titulo: 'Metformina 500mg', fecha: '2026-03-23',
    horaInicio: '08:00', tipo: 'medicacion', prioridad: 'alta', completado: true,
  },
  {
    id: 'ev2', titulo: 'Caminata matutina', fecha: '2026-03-23',
    horaInicio: '09:30', horaFin: '10:00', tipo: 'ejercicio', prioridad: 'media', completado: true,
  },
  {
    id: 'ev3', titulo: 'Losartán 50mg', fecha: '2026-03-23',
    horaInicio: '12:00', tipo: 'medicacion', prioridad: 'alta', completado: false,
  },
  {
    id: 'ev4', titulo: 'Cita Dr. Ramírez', fecha: '2026-03-23',
    horaInicio: '16:30', horaFin: '17:30', tipo: 'cita', prioridad: 'alta', completado: false,
    notas: 'Llevar resultados de laboratorio',
  },
  {
    id: 'ev5', titulo: 'Terapia física', fecha: '2026-03-24',
    horaInicio: '10:00', horaFin: '11:00', tipo: 'terapia', prioridad: 'media', completado: false,
  },
  {
    id: 'ev6', titulo: 'Enalapril 10mg', fecha: '2026-03-24',
    horaInicio: '08:00', tipo: 'medicacion', prioridad: 'alta', completado: false,
  },
  {
    id: 'ev7', titulo: 'Visita de familia', fecha: '2026-03-25',
    horaInicio: '15:00', horaFin: '18:00', tipo: 'otro', prioridad: 'baja', completado: false,
    notas: 'Nietos vienen de visita',
  },
  {
    id: 'ev8', titulo: 'Control de presión', fecha: '2026-03-25',
    horaInicio: '09:00', tipo: 'cita', prioridad: 'media', completado: false,
  },
  {
    id: 'ev9', titulo: 'Ejercicios respiratorios', fecha: '2026-03-26',
    horaInicio: '11:00', horaFin: '11:30', tipo: 'terapia', prioridad: 'baja', completado: false,
  },
];

export const miembrosFamiliares: MiembroFamiliar[] = [
  {
    id: 'f1', nombre: 'DEMO', apellido: 'EMPRENDIMIENTO', email: 'demo@emprendimiento.com',
    telefono: '+52 55 1234 5678', rol: 'admin',
    permisos: ['todo'], activo: true, ultimoAcceso: '2026-03-23T14:30:00',
  },
  {
    id: 'f2', nombre: 'Carlos', apellido: 'González', email: 'carlos@email.com',
    telefono: '+52 55 8765 4321', rol: 'familiar',
    permisos: ['ver_dashboard', 'ver_alertas', 'ver_calendario'], activo: true,
    ultimoAcceso: '2026-03-23T10:15:00',
  },
  {
    id: 'f3', nombre: 'Ana', apellido: 'López', email: 'ana.lopez@email.com',
    telefono: '+52 55 1111 2222', rol: 'cuidador',
    permisos: ['ver_dashboard', 'ver_alertas', 'editar_rutinas', 'ver_calendario', 'editar_recordatorios'],
    activo: true, ultimoAcceso: '2026-03-22T18:45:00',
  },
  {
    id: 'f4', nombre: 'Dr. Roberto', apellido: 'Ramírez', email: 'dr.ramirez@hospital.com',
    telefono: '+52 55 3333 4444', rol: 'medico',
    permisos: ['ver_dashboard', 'ver_alertas', 'ver_salud'], activo: true,
    ultimoAcceso: '2026-03-21T09:00:00',
  },
  {
    id: 'f5', nombre: 'Laura', apellido: 'González', email: 'laura@email.com',
    rol: 'familiar', permisos: ['ver_dashboard', 'ver_alertas'], activo: false,
    ultimoAcceso: '2026-03-10T14:00:00',
  },
];

export const configuracionDispositivo: ConfiguracionDispositivo = {
  sensibilidadCaida: 75,
  sensibilidadMovimiento: 60,
  personalidadVoz: 'dulce',
  volumenVoz: 70,
  modoDescanso: {
    activo: true,
    horaInicio: '22:00',
    horaFin: '07:00',
  },
  autonomia: {
    navegacionAutonoma: true,
    respuestaAutomatica: true,
    nivelIndependencia: 65,
  },
  conectividad: {
    wifi: true,
    bluetooth: true,
    datosMoviles: false,
  },
};

export function generarDatosSalud(): DatosSalud[] {
  const datos: DatosSalud[] = [];
  for (let i = 0; i < 24; i++) {
    const hora = `${i.toString().padStart(2, '0')}:00`;
    datos.push({
      hora,
      temperatura: 36.2 + Math.random() * 0.8,
      pasos: i >= 7 && i <= 21 ? Math.floor(Math.random() * 500) : Math.floor(Math.random() * 30),
      calorias: i >= 7 && i <= 21 ? Math.floor(Math.random() * 80) : Math.floor(Math.random() * 10),
      interacciones: i >= 7 && i <= 21 ? Math.floor(Math.random() * 12) + 1 : Math.floor(Math.random() * 2),
    });
  }
  return datos;
}

export const notificaciones: Notificacion[] = [
  {
    id: 'n1', titulo: 'Sin actividad detectada',
    mensaje: '2 horas sin movimiento. LUMI envió un saludo cálido.',
    timestamp: '2026-03-23T14:23:00', leida: false, tipo: 'alerta',
  },
  {
    id: 'n2', titulo: 'Medicación pendiente',
    mensaje: 'Losartán 50mg no fue confirmado.',
    timestamp: '2026-03-23T12:45:00', leida: false, tipo: 'recordatorio',
  },
  {
    id: 'n3', titulo: 'Carlos vio el dashboard',
    mensaje: 'Tu familiar Carlos revisó el estado de Lumi.',
    timestamp: '2026-03-23T10:15:00', leida: true, tipo: 'familia',
  },
  {
    id: 'n4', titulo: 'Actualización disponible',
    mensaje: 'Lumi v3.2.2 está disponible con mejoras.',
    timestamp: '2026-03-23T08:00:00', leida: true, tipo: 'sistema',
  },
];
