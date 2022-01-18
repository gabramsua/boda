import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  lat: number;
  lng: number;
  zoom: number;
  mapTypeId: string;
  sitios:any[];

  constructor() { 
    // El pino de San José => 37.42345798224207, -5.816402346560007
    // Iglesia de La Caridad => 37.38446735276997, -5.99578351814051
    this.lat = 40;
    this.lng = -3;
    this.zoom = 6;
    this.mapTypeId = 'hybrid';
    this.sitios =  [
      {
        nombre: "Hacienda El pino de San José",
        lat: 37.42345798224207,
        lng: -5.816402346560007,
        icon: '../../assets/imgs/restaurant_2.png'// 'https://img.icons8.com/windows/30/000000/restaurant.png'
      },
      {
        nombre: "Iglesia de La Caridad",
        lat: 37.38446735276997,
        lng: -5.99578351814051,
        icon: '../../assets/imgs/church_2.png' // 'https://img.icons8.com/windows/32/000000/church.png'
      }
    ];
  }

  ngOnInit(): void {
  }

}
