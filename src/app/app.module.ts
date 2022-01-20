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
    ModalComponent
  ],
  entryComponents: [CustomSnackBarComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    
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
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: MAT_RADIO_DEFAULT_OPTIONS , useValue: { color: '#336E7B' } },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}
  ],
  bootstrap: [AppComponent], 
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
