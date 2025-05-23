import { Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { HistorialComponent } from './componentes/historial/historial.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';

export const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent}

];
