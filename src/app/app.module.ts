import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { TrasladosComponent } from './components/traslados/traslados.component';
import { MesasComponent } from './components/mesas/mesas.component';
import { ListaBodasComponent } from './components/lista-bodas/lista-bodas.component';
import { MapaComponent } from './components/mapa/mapa.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ConfirmacionComponent,
    TrasladosComponent,
    MesasComponent,
    ListaBodasComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'confirmacion', component: ConfirmacionComponent},
      {path: 'traslados', component: TrasladosComponent},
      {path: 'mesas', component: MesasComponent},
      {path: 'lista-de-bodas', component: ListaBodasComponent},
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBjyKxnDLuBq_llik_lG_NafFHTYPSeIo8'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
