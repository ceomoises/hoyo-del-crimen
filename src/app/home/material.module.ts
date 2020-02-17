import { NgModule } from '@angular/core';
import {
  MatSlideToggleModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatTableModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports:[
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule
  ],
  exports:[
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule
  ]
})
export class MaterialModule{}
