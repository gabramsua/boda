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
    this.zoom = 2;
    this.mapTypeId = 'hybrid';
    this.sitios =  [
      {
        nombre: "Iglesia de La Caridad",
        lat: 37.38446735276997,
        lng: -5.99578351814051,
        icon: '../../assets/imgs/church_2.png',  // 'https://img.icons8.com/windows/32/000000/church.png'
        foto: 'https://live.staticflickr.com/5008/5295822517_173bacc4e9.jpg',
        wiki: 'https://es.wikipedia.org/wiki/Iglesia_y_Hospital_de_la_Caridad_(Sevilla)',
        texto: '¡Aquí a las 12:30!',
        place: 'https://www.google.com/maps/place/Iglesia+de+La+Caridad/@37.3842372,-5.9957406,15z/data=!4m2!3m1!1s0x0:0x4981f7115a9efad9?sa=X&ved=2ahUKEwiumP_pzNn1AhVIxoUKHX1wC-wQ_BJ6BAhCEAU'
      },
      {
        nombre: "Hacienda El pino de San José",
        lat: 37.42345798224207,
        lng: -5.816402346560007,
        icon: '../../assets/imgs/restaurant_2.png', // 'https://img.icons8.com/windows/30/000000/restaurant.png'
        foto: '',
        wiki: 'http://www.elpinodesanjose.com',
        texto: 'Aquí será el banquete sobre las 14:00',
        place: 'https://www.google.com/maps/place/El+Pino+De+San+Jose/@37.4227635,-5.8190202,17z/data=!3m1!4b1!4m5!3m4!1s0xd1266b26f38a765:0x38a6c42d5e414bc5!8m2!3d37.4228324!4d-5.8166796'
      }
    ];
  }

  ngOnInit(): void {
  }

}
