import { Component, OnInit } from '@angular/core';

import { PeticionesService } from '../services/peticiones.service';
import { Crimen } from '../models/crimen';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PeticionesService]

})
export class HomeComponent implements OnInit {
  public crimenes:[Crimen]; //Es un arreglo de crimenes

  constructor(
    private _peticionesService: PeticionesService
  ){}

  ngOnInit(){
    // long: -99.0627 , lat: 19.3568
    this._peticionesService.getCrimes('-99.0627','19.3568','200').subscribe(
      result => {
          this.crimenes = result;
          console.log(this.crimenes);
      },
      error => {
        console.log(<any>error);
      }
    );
  }




}
