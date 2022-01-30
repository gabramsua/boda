import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isAdmin = false;
  
  constructor() { }

  ngOnInit(): void {
    this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
  }
  cerrarSesion() {
    localStorage.clear()
  }
}
