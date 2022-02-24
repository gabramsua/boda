import { Component, OnInit } from '@angular/core';
import constants from 'src/app/constants';
import { trigger, style, animate, transition } from '@angular/animations';
// declare var showResultadoManos;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger(
      'fadeIn', [
        transition(':enter', [
            style({ height: 0, opacity: 0 }),
            animate('1s ease-out', style({ height: 300, opacity: 1 }))
          ]),
        // transition(':leave', [
        //     style({ height: 300, opacity: 1 }),
        //     animate('50ms ease-in', style({ height: 0, opacity: 0 }))
        //   ])
      ]
    )
  ]
})
export class GameComponent implements OnInit {
  puntuacionTotal: number = 0;
  estadoManos = constants.ESTADOS_MANOS.BIENVENIDA;
  opciones = ['piedra', 'papel', 'tijera']
  hasPlayedFlag = false;
  // jugada: string = '';
  marcador: string = '';
  sigue: string = '';
  isLoading = false;

  selecciona = '';
  jugamos = '';

  constructor() { }

  ngOnInit(): void {
  }

  empezar() {
    this.puntuacionTotal = 0;
    this.estadoManos = constants.ESTADOS_MANOS.JUGANDO;
    this.hasPlayedFlag = false;
    window.setTimeout(() => {
      document.getElementById('fadeout').style.opacity = '0'
    }, 2000);
  }

  jugar(chosen: string) {
    this.isLoading = true;
    this.marcador = '';
    this.sigue = '';
    this.selecciona = chosen;
    
    // Elegir respuesta al azar
    const randomIndex = Math.floor(Math.random()*this.opciones.length);
    const respuesta = this.opciones[randomIndex]
    this.jugamos = respuesta;

    // this.jugada = 'Elegiste ' + chosen + ' y los novios eligieron ' + respuesta;
    document.getElementById('fadeout').style.opacity = '1';

    // Ver quién gana
    const result = this.comparacion(chosen, respuesta)
    // console.log(result, chosen, respuesta)
    // Actualizar marcador
    switch(result){
      case 1:
        this.marcador = '¡Has ganado!';
        this.sigue = ' Sigue hasta que pierdas.'
        this.puntuacionTotal+=3;
        this.showResultadoManos()
        
        break;
      case -1:
        this.marcador = '¡Has perdido!'
        this.endOfGame();
        break;
      case 0:
        this.marcador = '¡Empate!';
        this.sigue = ' Sigue hasta que pierdas.'
        this.puntuacionTotal++;
        this.showResultadoManos()
        break;
    }

  }

  showResultadoManos(){
    window.setTimeout(() => {
      document.getElementById('fadeout').style.opacity = '0';
      this.isLoading = false;
    }, 2000);
  }

  comparacion(user, pc) {
    switch(user+pc){
      case 'piedratijera':
      case 'papelpiedra':
      case 'tijerapapel':
        return 1; // GANA
      case 'tijerapiedra':
      case 'papeltijera':
      case 'piedrapapel':
        return -1; // PIERDE
      case 'papelpapel':
      case 'tijeratijera':
      case 'piedrapiedra':
        return 0; // EMPATE
    }
  }

  endOfGame() {
    window.setTimeout(() => {
      document.getElementById('fadeout').style.opacity = '0';
      this.isLoading = false;
      this.marcador = '';
      this.sigue = '';
      this.hasPlayedFlag = true;
      this.estadoManos = constants.ESTADOS_MANOS.RESULTADOS;
    }, 2000);
    
    // Guardar si procede
    // Enseñar Ranking
  }

  verRanking() {}

  goToBienvenida() {
    // document.getElementById('fadeout').style.opacity = '0';
    this.isLoading = false;
    this.marcador = '';
    this.sigue = '';
    this.selecciona = '';
    this.jugamos = '';
    this.estadoManos = constants.ESTADOS_MANOS.BIENVENIDA    
  }
}
