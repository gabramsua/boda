import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { Quizz } from '../../../models/models';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.scss'],
  animations: [
    trigger(
      'fadeIn', [
        transition(':enter', [
            style({ height: 0, opacity: 0 }),
            animate('1s ease-out', style({ height: 300, opacity: 1 }))
          ])
        // transition(':leave', [
        //     style({ height: 300, opacity: 1 }),
        //     animate('250ms ease-in', style({ height: 0, opacity: 0 }))
        //   ])
      ]
    )
  ]
})
export class CuestionarioComponent implements OnInit, OnChanges {
  @Input() preguntas: Quizz[];
  @Output() dispatchPuntuacion = new EventEmitter<number>();
  @Output() endOfGame = new EventEmitter<boolean>();
  avance = [0,10,20,30,40,50,60,70,80,90]
  step: number = 0;
  respuestasTemporales: string[] = []
  respuestas: string[] = []
  currentCorrecta: string;
  viewPista = [false,false,false,false,false,false,false,false,false,false,];

  constructor(private _service: AuthService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.step = 0;
    this.nextQuestion()
    
  }

  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  onAnswerClicked(respuesta){
    if(respuesta === this.preguntas[this.step].respuestaCorrecta){
      // Calculamos la puntuación si ha visto la pista
      const puntosDeCurrentPregunta = this.viewPista[this.step] 
        ? this.preguntas[this.step].puntuacion/2 
        : this.preguntas[this.step].puntuacion;

      // Emitir el evento al padre de que se ha acertado la pregunta
      this.dispatchPuntuacion.next(this.preguntas[this.step].puntuacion*10)

    }
    // fin del juego || cambiamos de pregunta
    this.step == 9 ? this.endGame() : this.nextQuestion()
  }

  onViewPista(){
    this.viewPista[this.step] = true;
  }

  nextQuestion() {
    this.step++
    this.resetRespuestas()
    this.currentCorrecta = this.preguntas[this.step].respuestaCorrecta
    this.respuestasTemporales.push(this.preguntas[this.step].respuestaCorrecta)
    this.respuestasTemporales.push(this.preguntas[this.step].r_falsa_1)
    this.respuestasTemporales.push(this.preguntas[this.step].r_falsa_2)
    this.respuestasTemporales.push(this.preguntas[this.step].r_falsa_3)

    // Desordenar respuestas
    const randomIndex = Math.floor(Math.random()*this.respuestasTemporales.length)

    let shuffledIndex = []
    for (let i = 1; i < 35; i++) {
      shuffledIndex.push(this.getRandomArbitrary(0,4))
    }
    const shuffledSinRepetir = [...new Set(shuffledIndex)]
    for(const i of shuffledSinRepetir) {
      this.respuestas.push(this.respuestasTemporales[i])
    }
  }
  resetRespuestas() {
    this.currentCorrecta = null;
    this.respuestasTemporales = []
    this.respuestas = []
  }
  endGame(){
    this.endOfGame.next(true)
  }
}
