import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'respuesta',
  templateUrl: './respuesta.component.html',
  styleUrls: ['./respuesta.component.scss'],
  animations: [
    trigger(
      'fadeIn', [
        transition(':enter', [
            style({ height: 0, opacity: 0 }),
            animate('1s ease-out', style({ height: 300, opacity: 1 }))
          ]),
        transition(':leave', [
            style({ height: 300, opacity: 1 }),
            animate('1s ease-in', style({ height: 0, opacity: 0 }))
          ])
      ]
    )
  ]
})
export class RespuestaComponent implements OnInit {
  @Input() texto: string;
  @Output() answerClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    // console.log(this.texto)
  }

  onAnswerClicked() {
    this.answerClicked.next(this.texto);
  }
}
