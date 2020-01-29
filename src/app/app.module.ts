import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { routes } from './app.router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlotlyComponent } from './plotly/plotly.component';

// Librerias
import { AgmCoreModule } from '@agm/core';


// Modulos importantes de Http
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MapComponent } from './map/map.component';
import { NoPageComponent } from './no-page/no-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlotlyComponent,
    MapComponent,
    NoPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule, // Modulos importantes de Http
    HttpClientJsonpModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHIYS8Q_XGg1K99dNSkGK7eljU4oeZexE'
    })// importación de modulos de mapa
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
