import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

//Modulos importantes de Http
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { GraphComponent } from './graph/graph.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Modulos importantes de Http
    HttpClientJsonpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
