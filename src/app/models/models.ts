export interface User {
    nombre: string;
    apellidos: string;
    telefono: string;
    asistencia: string;
    tipoBus: string;
    alergias?: string;
    bebida: string;
    cancion: string;
    puntuacionQuizz: number;
    acompananteDe: string;
    acompanantes: any[];
}

export interface ResultadoCancion {}