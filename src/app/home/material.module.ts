import { NgModule } from '@angular/core';
import {
  MatSlideToggleModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatCheckboxModule,
  MatBadgeModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports:[
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatIconModule
  ],
  exports:[
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatIconModule
  ]
})
export class MaterialModule{}
