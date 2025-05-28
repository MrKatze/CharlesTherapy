import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { HistorialComponent } from './components/historial/historial.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PerfilPsicometricoComponent } from './components/perfil-psicometrico/perfil-psicometrico.component';
import { CitasComponent } from './components/citas/citas.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'home', component: PrincipalComponent },
  { path: 'perfilPsicometrico', component: PerfilPsicometricoComponent},
  { path: 'historial', component: HistorialComponent },
  { path: 'citas', component: CitasComponent},

];
