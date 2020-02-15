import { NgModule } from '@angular/core';
import {
  MatSlideToggleModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  imports:[
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule
  ],
  exports:[
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class MaterialModule{}
