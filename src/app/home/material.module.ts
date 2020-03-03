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
  ]
})
export class MaterialModule{}
