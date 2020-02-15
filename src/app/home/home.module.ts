import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';

import { MaterialModule } from './material.module';

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent, AgmCoreModule],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHIYS8Q_XGg1K99dNSkGK7eljU4oeZexE'
    })// importación de modulos de mapa
  ]
})
export class HomeModule { }
