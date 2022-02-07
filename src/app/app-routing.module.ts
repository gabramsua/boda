import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuestionarioComponent } from './componentes/Quizz/cuestionario/cuestionario.component';
import { QuizzComponent } from './componentes/Quizz/quizz/quizz.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { HomeComponent } from './components/home/home.component';
import { ListaBodasComponent } from './components/lista-bodas/lista-bodas.component';
import { LoginComponent } from './components/login/login.component';
import { ManagementComponent } from './components/management/management.component';
import { MesasComponent } from './components/mesas/mesas.component';
import { MinutaComponent } from './components/minuta/minuta.component';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { RecomiendaCancionComponent } from './components/recomienda-cancion/recomienda-cancion.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { TrasladosComponent } from './components/traslados/traslados.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'confirmacion', component: ConfirmacionComponent, canActivate: [AuthGuardService]},
    {path: 'traslados', component: TrasladosComponent, canActivate: [AuthGuardService]},
    {path: 'mesas', component: MesasComponent, canActivate: [AuthGuardService]},
    {path: 'menu', component: MinutaComponent, canActivate: [AuthGuardService]},
    {path: 'lista-de-bodas', component: ListaBodasComponent, canActivate: [AuthGuardService]},
    {path: 'recomienda-cancion', component: RecomiendaCancionComponent, canActivate: [AuthGuardService]},
    {path: 'resultados-votacion', component: ResultadosComponent, canActivate: [AuthGuardService]},
    {path: 'quizz', component: QuizzComponent, canActivate: [AuthGuardService]},
    {path: 'cuestionario', component: CuestionarioComponent, canActivate: [AuthGuardService]},
    {path: 'management', component: ManagementComponent, canActivate: [AuthGuardService]},
    {path: 'gallery', component: GaleriaComponent, canActivate: [AuthGuardService]},
    {path: '**', component: PaginaNoEncontradaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
