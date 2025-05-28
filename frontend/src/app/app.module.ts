import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { PerfilPsicometricoComponent } from './components/perfil-psicometrico/perfil-psicometrico.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilPsicometricoComponent
  ],

  imports: [
    BrowserModule,
    CommonModule,  
    HttpClientModule, 
  ],

  providers: [],
  bootstrap: [LoginComponent]
})
export class AppModule { }
