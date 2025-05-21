import { Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { HistorialComponent } from './componentes/historial/historial.component';

export const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'historial', component: HistorialComponent }
];
