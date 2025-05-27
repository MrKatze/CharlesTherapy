import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { PerfilPsicometricoComponent } from './componentes/perfil-psicometrico/perfil-psicometrico.component';
// ...otros imports...

@NgModule({
  declarations: [
    AppComponent,
    PerfilPsicometricoComponent
  ],

  imports: [
  BrowserModule,
  CommonModule,  // ← ESTE es el que habilita *ngIf y *ngFor
  // otros módulos
],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
