import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import constants from 'src/app/constants';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  public doughnutChartLabels = [
    constants.VALUES.TITULOS_CANCIONES.CANCION_1,
    constants.VALUES.TITULOS_CANCIONES.CANCION_2,
    constants.VALUES.TITULOS_CANCIONES.CANCION_3,
    constants.VALUES.TITULOS_CANCIONES.CANCION_4,
    constants.VALUES.TITULOS_CANCIONES.CANCION_5,
    constants.VALUES.TITULOS_CANCIONES.CANCION_6
  ];
  public doughnutChartData = [[,,,,,]]; // [[10,20,30,40,50,60]];
  public doughnutChartType: ChartType = 'pie';

  constructor(private _service: AuthService) { }

  ngOnInit(): void {
    this.getResultados()
  }

  getResultados() {
    for (let i = 1; i < 7; i++) {
      this._service.getAll('cancion_'+i).subscribe(data => {
        this.doughnutChartData[0][i-1] = data.length-1
      })
    }
  }
}
