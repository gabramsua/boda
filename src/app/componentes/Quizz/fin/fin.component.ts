import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fin',
  templateUrl: './fin.component.html',
  styleUrls: ['./fin.component.scss']
})
export class FinComponent implements OnInit {
  @Input() puntuacionFinal: number;
  @Input() tuMejorPuntuacion: number;

  constructor() { }

  ngOnInit(): void {
  }

}
