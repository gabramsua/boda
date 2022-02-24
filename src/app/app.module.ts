import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper'; 
import { CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core'; 
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS  } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon'
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AgmCoreModule } from '@agm/core'
import { ChartsModule } from 'ng2-charts';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './services/auth-guard.service';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { TrasladosComponent } from './components/traslados/traslados.component';
import { MesasComponent } from './components/mesas/mesas.component';
import { ListaBodasComponent } from './components/lista-bodas/lista-bodas.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { CustomSnackBarComponent } from 'shared/SnackBarComponent.component';
import { RecomiendaCancionComponent } from './components/recomienda-cancion/recomienda-cancion.component';
import { MinutaComponent } from './components/minuta/minuta.component';
import { LoginComponent } from './components/login/login.component';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { ManagementComponent } from './components/management/management.component';
import { FilterPipeInvitadosPipe } from './shared/filter-pipe-invitados.pipe';
import { QuizzComponent } from './componentes/Quizz/quizz/quizz.component';
import { PreguntaComponent } from './componentes/Quizz/pregunta/pregunta.component';
import { RespuestaComponent } from './componentes/Quizz/respuesta/respuesta.component';
import { FinComponent } from './componentes/Quizz/fin/fin.component';
import { RankingComponent } from './componentes/Quizz/ranking/ranking.component';
import { CuestionarioComponent } from './componentes/Quizz/cuestionario/cuestionario.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CutApellidosPipePipe } from './shared/cut-apellidos-pipe.pipe';
import { CutPhonePipePipe } from './shared/cut-phone-pipe.pipe';
import { CountdownComponent } from './components/countdown/countdown.component';
import { GameComponent } from './components/PPT/game/game.component';


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
    RecomiendaCancionComponent,
    MinutaComponent,
    LoginComponent,
    PaginaNoEncontradaComponent,
    ResultadosComponent,
    ManagementComponent,
    FilterPipeInvitadosPipe,
    QuizzComponent,
    PreguntaComponent,
    RespuestaComponent,
    FinComponent,
    RankingComponent,
    CuestionarioComponent,
    SpinnerComponent,
    CutApellidosPipePipe,
    CutPhonePipePipe,
    CountdownComponent,
    GameComponent
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
    AppRoutingModule,
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
