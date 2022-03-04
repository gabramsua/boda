import { Component, OnInit } from '@angular/core';
import constants from 'src/app/constants';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/models';
import { Manos } from '../../../models/models';
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
            animate('1s ease-out', style({ height: 190, opacity: 1 }))
          ]),
        transition(':leave', [
            style({ height: 190, opacity: 1 }),
            animate('500ms ease-in', style({ height: 0, opacity: 0 }))
          ])
      ]
    ),    
    trigger(
      'fadeInResultados', [
        transition(':enter', [
            style({ height: 0, opacity: 0 }),
            animate('500ms ease-out', style({ height: 300, opacity: 1 }))
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
  currentUser: User;
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
  isPlaying = false;
  
  clasificacion:any[] = []
  tuMejorPuntuacion: number = 0;

  constructor(private _service: AuthService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.clasificacion = []
  }

  empezar() {
    this.puntuacionTotal = 0;
    this.estadoManos = constants.ESTADOS_MANOS.JUGANDO;
    this.clasificacion = []
    this.hasPlayedFlag = false;
    window.setTimeout(() => {
    //   document.getElementById('fadeout').style.opacity = '0'
      this.isPlaying = false;
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
    // document.getElementById('fadeout').style.opacity = '1';
    this.isPlaying = true;
    

    // Ver quién gana
    const result = this.comparacion(chosen, respuesta)
    // console.log(result, chosen, respuesta)
    // Actualizar marcador
    switch(result){
      case 1:
        this.marcador = '¡Has ganado! ';
        this.sigue = ' Sigue hasta que pierdas.'
        this.puntuacionTotal+=3;
        this.showResultadoManos()
        
        break;
      case -1:
        this.marcador = '¡Has perdido!'
        this.endOfGame();
        break;
      case 0:
        this.marcador = '¡Empate! ';
        this.sigue = ' Sigue hasta que pierdas.'
        this.puntuacionTotal++;
        this.showResultadoManos()
        break;
    }

  }

  showResultadoManos(){
    window.setTimeout(() => {
    //   document.getElementById('fadeout').style.opacity = '0';
      this.isLoading = false;
      this.isPlaying = false;
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
      // document.getElementById('fadeout').style.opacity = '0';
      // Traer ranking
      this.getAllRanking()

      this.isPlaying = false;
      this.isLoading = false;
      this.marcador = '';
      this.sigue = '';
      this.hasPlayedFlag = true;
      this.estadoManos = constants.ESTADOS_MANOS.RESULTADOS;
    }, 2000);
    
    // Guardar si procede
    // Enseñar Ranking
  }

  verRanking(){
    this.getAllRanking()

    this.isPlaying = false;
    this.isLoading = false;
    this.marcador = '';
    this.sigue = '';
    this.hasPlayedFlag = false;
    this.estadoManos = constants.ESTADOS_MANOS.RESULTADOS;
  }

  getAllRanking() {    
    this.clasificacion = []
    this._service.getAllRanking(constants.END_POINTS.MANOS).subscribe(data => {
      data.forEach((element: any) => {
        this.clasificacion.push({
          ...element.data()
        })
      });
      // Ordenar clasificación
      this.clasificacion.sort((a,b) => (a.puntos > b.puntos) ? 1 : ((b.puntos > a.puntos) ? -1 : (a.date < b.date ? 1 : (b.date < a.date) ? -1 : 0)))
      this.clasificacion.reverse();

      this.verSiEntroEnRanking()
    })
  }

  verSiEntroEnRanking() {
    // const found = this.clasificacion.findIndex(element => element.telefono == this.currentUser.telefono);
    // this.tuMejorPuntuacion = found+1;
    if(this.puntuacionTotal > this.clasificacion[9].puntos) {
      // ENTRO EN EL RANKING
      const result: Manos = {
        nombre: this.currentUser.nombre,
        apellidos: this.currentUser.apellidos,
        telefono: this.currentUser.telefono,
        puntos: this.puntuacionTotal,
        date: new Date(),
        letra: this.clasificacion[9].letra
      }
      this.save(this.clasificacion[9].letra, result)
      this.clasificacion[9] = result;
      // Ordenar clasificación
      this.clasificacion.sort((a,b) => (a.puntos > b.puntos) ? 1 : ((b.puntos > a.puntos) ? -1 : (a.date < b.date ? 1 : (b.date < a.date) ? -1 : 0)))
      this.clasificacion.reverse();
    }
    // Calcular el mejor resultado EN EL RANKING
    this.personalBest()
  }

  personalBest() {
    const found = this.clasificacion.findIndex(element => element.telefono == this.currentUser.telefono);
    this.tuMejorPuntuacion = found+1;
  }

  save(clave, valor){
    this._service.save(constants.END_POINTS.MANOS, clave, valor)
      .then(()=>{
      }, error => {
        console.log(error)
      })
  }

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
