export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  avatar?: string;
  rol: 'admin' | 'cuidador' | 'familiar' | 'medico';
  telefono?: string;
}

export interface DispositivoLumi {
  id: string;
  nombre: string;
  bateria: number;
  senal: number;
  estado: 'activo' | 'reposo' | 'desconectado' | 'alerta';
  ultimaActividad: string;
  ubicacion?: { lat: number; lng: number };
  nivelEmocional: 'feliz' | 'neutral' | 'triste' | 'preocupado';
  sensores: {
    temperatura: number;
    movimiento: boolean;
    caida: boolean;
  };
}

export interface Recordatorio {
  id: string;
  titulo: string;
  descripcion?: string;
  hora: string;
  tipo: 'medicacion' | 'ejercicio' | 'comida' | 'cita' | 'otro';
  completado: boolean;
  recurrente: boolean;
}

export interface Alerta {
  id: string;
  titulo: string;
  descripcion: string;
  timestamp: string;
  gravedad: 'critica' | 'alta' | 'media' | 'baja' | 'info';
  leida: boolean;
  tipo: 'caida' | 'salud' | 'bateria' | 'zona' | 'medicacion' | 'sistema';
}

export interface Rutina {
  id: string;
  nombre: string;
  descripcion?: string;
  pasos: PasoRutina[];
  horario: string;
  diasSemana: number[];
  activa: boolean;
}

export interface PasoRutina {
  id: string;
  orden: number;
  accion: string;
  duracion?: number;
  completado: boolean;
}

export interface EventoCalendario {
  id: string;
  titulo: string;
  fecha: string;
  horaInicio: string;
  horaFin?: string;
  tipo: 'medicacion' | 'cita' | 'ejercicio' | 'terapia' | 'otro';
  prioridad: 'alta' | 'media' | 'baja';
  completado: boolean;
  notas?: string;
}

export interface MiembroFamiliar {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  rol: 'admin' | 'cuidador' | 'familiar' | 'medico';
  permisos: string[];
  activo: boolean;
  ultimoAcceso?: string;
  avatar?: string;
}

export interface ConfiguracionDispositivo {
  sensibilidadCaida: number;
  sensibilidadMovimiento: number;
  personalidadVoz: 'dulce' | 'profesional' | 'energetica';
  volumenVoz: number;
  modoDescanso: {
    activo: boolean;
    horaInicio: string;
    horaFin: string;
  };
  autonomia: {
    navegacionAutonoma: boolean;
    respuestaAutomatica: boolean;
    nivelIndependencia: number;
  };
  conectividad: {
    wifi: boolean;
    bluetooth: boolean;
    datosMoviles: boolean;
  };
}

export interface DatosSalud {
  hora: string;
  temperatura: number;
  pasos: number;
  calorias: number;
  interacciones: number;
}

export interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  timestamp: string;
  leida: boolean;
  tipo: 'alerta' | 'recordatorio' | 'sistema' | 'familia';
}
