import { Component, OnInit, DoCheck } from '@angular/core';
import { Subscription } from 'rxjs';
import constants from 'src/app/constants';
import { ResultadoQuizz, User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit, DoCheck {
  currentUser: User;
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
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.init()
    this.puntuacionTotal = 0;
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
  init(){
    this.loading = false;
    this.preguntasAleatorias = [];
    this.preguntasNeno = [];
    this.preguntasMaria = [];
    this.listadoPreguntas = [];
    this.flag = false;
    this.clasificacion = []

  }
  empezar() {
    this.loading = true;
    this.puntuacionTotal = 0;
    
    // Traer preguntas 5 María y 5 Neno
    this.getPreguntasNeno()
    // this.getPreguntasMaria()
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
      this._service.get(constants.END_POINTS.QUIZZ_MARIA, constants.PREGUNTAS_MARIA[random]).subscribe(data => {
          this.preguntasMaria.push(data.data())
      })
    }
  }

  updatePuntuacion(puntos) {
    this.puntuacionTotal += puntos;
  }

  endOfGame(hasPlayed = false){
    this.loading = true;

    // Guardar resultado del invitado
    if(hasPlayed)this.saveResult()    

    this.estadoQuizz = constants.ESTADOS_QUIZZ.RESULTADOS
    this.hasPlayedFlag = hasPlayed
    this.getAllRanking()

  }
  saveResult(){
    const date = new Date()
    const result: ResultadoQuizz = {
        nombre: this.currentUser.nombre,
        apellidos: this.currentUser.apellidos,
        telefono: this.currentUser.telefono,
        puntos: this.puntuacionTotal,
        date: new Date()
    }
    // console.log(date.getDay()-1+'/'+date.getMonth()+parseInt('1')+'/'+date.getFullYear())
    // console.log('hora: ', date.getHours()+':'+date.getMinutes())
        
    this._service.guardarPregunta(constants.END_POINTS.RESULTADOS_QUIZZ, result)
    .then(() => {
      
      // Update Current User
      if(this.currentUser.puntuacionQuizz < this.puntuacionTotal){
        this.currentUser.puntuacionQuizz = this.puntuacionTotal
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this._service.save(constants.END_POINTS.USERS, this.currentUser.telefono, this.currentUser)
      }
    })
    .catch((error) => {
      Swal.fire(
        'Ha habido un error',
        'Sentimos las molestias',
        'error'
      )
    })
  }

  getAllRanking(){
    this.init();
    
    this._service.getAllRanking(constants.END_POINTS.RESULTADOS_QUIZZ).subscribe(data => {
      data.forEach((element: any) => {
        this.clasificacion.push({
          ...element.data()
        })
      });
      // Ordenar clasificación
      this.clasificacion.sort((a,b) => (a.puntos > b.puntos) ? 1 : ((b.puntos > a.puntos) ? -1 : (a.date < b.date ? 1 : (b.date < a.date) ? -1 : 0)))
      this.clasificacion.reverse();

      // Calcular el mejor resultado EN EL RANKING => hay que ordenarlo antes
      this.personalBest()
      this.loading = false;
    })
  }

  personalBest() {
    const found = this.clasificacion.findIndex(element => element.telefono == this.currentUser.telefono);
    this.tuMejorPuntuacion = found+1;

    // Valor más alto
    // const pb = Math.max.apply(Math, result.map(function(o) { return o.puntos; }))
    // console.log(pb)
  }

  goToBienvenida() {
    this.estadoQuizz = constants.ESTADOS_QUIZZ.BIENVENIDA    
  }
}
