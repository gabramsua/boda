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

export interface Quizz {
    pregunta: string;
    respuestaCorrecta: string;
    r_falsa_1: string;
    r_falsa_2: string;
    r_falsa_3?: string;
    puntuacion: number;
    pista?: string;
}

export interface ResultadoQuizz {
    nombre: string;
    apellidos: string;
    telefono: string;
    puntos: number;
    date: Date;
    // fecha: string;
    // hora: string;
}
export interface Bus {
    tipo: string;
    personas: number;
    invitadosQueVan: string[];
  }