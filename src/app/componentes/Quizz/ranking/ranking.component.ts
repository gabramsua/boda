import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  @Input() clasificacion: Object[];

  constructor() { }

  ngOnInit(): void {
  }

}
