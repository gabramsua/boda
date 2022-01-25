import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core'
import { HttpClientModule } from '@angular/common/http';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ChartsModule } from 'ng2-charts';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper'; 
import { CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core'; 
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS  } from '@angular/material/button-toggle';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS  } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon'
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { CustomSnackBarComponent } from 'shared/SnackBarComponent.component';
import { ModalComponent } from './shared/modal/modal.component ';
import { YoutubeSearcherComponent } from './components/youtube-searcher/youtube-searcher.component';
import { RecomiendaCancionComponent } from './components/recomienda-cancion/recomienda-cancion.component';
import { MinutaComponent } from './components/minuta/minuta.component';
import { LoginComponent } from './components/login/login.component';
import { environment } from '../environments/environment';
import { AuthGuardService } from './services/auth-guard.service';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ConfirmacionComponent,
    TrasladosComponent,
    MesasComponent,
    ListaBodasComponent,
    MapaComponent,
    ModalComponent,
    YoutubeSearcherComponent,
    RecomiendaCancionComponent,
    MinutaComponent,
    LoginComponent,
    PaginaNoEncontradaComponent
  ],
  entryComponents: [CustomSnackBarComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    
    YouTubePlayerModule,
    ChartsModule,
    
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ClipboardModule,
    MatIconModule,
    MatSnackBarModule,

    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'home', component: HomeComponent},
      {path: 'confirmacion', component: ConfirmacionComponent, canActivate: [AuthGuardService]},
      {path: 'traslados', component: TrasladosComponent},
      {path: 'mesas', component: MesasComponent},
      {path: 'menu', component: MinutaComponent},
      {path: 'lista-de-bodas', component: ListaBodasComponent},
      {path: 'recomienda-cancion', component: RecomiendaCancionComponent},
      {path: '**', component: PaginaNoEncontradaComponent},
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBjyKxnDLuBq_llik_lG_NafFHTYPSeIo8'
    })
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: MAT_RADIO_DEFAULT_OPTIONS , useValue: { color: '#336E7B' } },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}},
    AuthGuardService,
  ],
  bootstrap: [AppComponent], 
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
