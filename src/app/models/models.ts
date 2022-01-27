export interface User {
    nombre: string;
    apellidos: string;
    telefono: string;
    asistencia: string;
    tipoBus: string;
    alergias: string;
    bebidas: string;
    cancion: string;
    puntuacionQuizz: number;
    acompananteDe: string;
    acompanantes: User[];
}

export interface ResultadoCancion {}