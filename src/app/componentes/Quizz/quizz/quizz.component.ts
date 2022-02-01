import { Component, OnInit, DoCheck } from '@angular/core';
import constants from 'src/app/constants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit, DoCheck {
  loading = false;
  preguntasAleatorias: any[] = [];
  preguntasNeno: any[] = [];
  preguntasMaria: any[] = [];
  listadoPreguntas: any[] = [];
  flag = false;
  estadoQuizz = constants.ESTADOS_QUIZZ.BIENVENIDA
  puntuacionTotal: number = 0;
  hasPlayedFlag = false;
  tuMejorPuntuacion: number = 0;
  clasificacion:any[] = []

  constructor(private _service: AuthService) { }

  ngOnInit(): void {
  }
  ngDoCheck(){
    if(!this.flag && this.preguntasNeno.length == 5 /*&& this.preguntasMaria.length == 5*/){
      this.flag = true;
      // Mezclarlas todas entre sí
      // this.listadoPreguntas = this.preguntasNeno.sort(() => Math.random()-0.5); // this.mezclarPreguntas()
      this.listadoPreguntas = this.preguntasNeno
      this.loading = false
      this.estadoQuizz = constants.ESTADOS_QUIZZ.PREGUNTANDO
    }
  }
  empezar() {
    this.loading = true;
    
    // Traer preguntas 5 María y 5 Neno
    this.getPreguntasNeno()
    // this.getPreguntasMaria()

    // Guardar Preguntas
    // Redirigir
  }
  
  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getPreguntasNeno() {
    for (let i = 1; i < 35; i++) {
      let randomNumber = this.getRandomArbitrary(1,19)
      if (this.preguntasAleatorias.indexOf(randomNumber) === -1 && this.preguntasAleatorias.length < 10) {
        this.preguntasAleatorias.push(randomNumber);
      }
    }

    for(const random of this.preguntasAleatorias) {
      this._service.get(constants.END_POINTS.QUIZZ_NENO, constants.PREGUNTAS_NENO[random]).subscribe(data => {
          this.preguntasNeno.push(data.data())
      })
    }
  }
  
  getPreguntasMaria() {
    for (let i = 1; i < 6; i++) {
      let randomNumber = this.getRandomArbitrary(1,19)
      if (this.preguntasAleatorias.indexOf(randomNumber) === -1) {
        this.preguntasAleatorias.push(randomNumber);
      }
    }
    for(const random of this.preguntasAleatorias) {
      // this.preguntasNeno.push()
      this._service.get(constants.END_POINTS.QUIZZ_MARIA, constants.PREGUNTAS_MARIA[random]).subscribe(data => {
          this.preguntasMaria.push(data.data())
      })
    }
  }

  updatePuntuacion(puntos) {
    this.puntuacionTotal += puntos;
  }

  endOfGame(hasPlayed = false){
    // this.loading = true;
    // Guardar resultado del invitado
    // Cargar el ranking
    this.clasificacion = [
      {
        nombre: 'Pepe',
        apellidos: 'Ramos',
        telefono: '645303663',
        puntos: 170,
        fecha: '01/02/2022',
        hora: '17:40'
      },
      {
        nombre: 'Carmen',
        apellidos: 'Gallardo',
        telefono: '603825519',
        puntos: 190,
        fecha: '01/02/2022',
        hora: '17:40'
      },
      {
        nombre: 'Teo',
        apellidos: 'González',
        telefono: '659640428',
        puntos: 190,
        fecha: '01/02/2022',
        hora: '21:35'
      }
    ]
    // Calcular el mejor resultado del currentUser

    this.estadoQuizz = constants.ESTADOS_QUIZZ.RESULTADOS
    this.hasPlayedFlag = hasPlayed
  }
  goToBienvenida() {
    this.estadoQuizz = constants.ESTADOS_QUIZZ.BIENVENIDA    
  }
}
