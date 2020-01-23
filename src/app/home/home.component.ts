import { Component, OnInit } from '@angular/core';

import { PeticionesService } from '../services/peticiones.service';
import { LocationService } from '../services/location.service';

import { Crimen } from '../models/crimen';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PeticionesService, LocationService]
})
export class HomeComponent implements OnInit {
  public crimenes:[Crimen]; //Es un arreglo de crimenes

  public latitude: string;
  public longitude: string;

  constructor(
    private _peticionesService: PeticionesService,
    private _locationService: LocationService
  ){}

  ngOnInit(){
    // Petición para obtener todos los crimenes en una posición y rango
    // this._peticionesService.getCrimes('-99.0627','19.3568','200').subscribe(
    //   result => {
    //       this.crimenes = result;
    //       console.log(this.crimenes);
    //   },
    //   error => {
    //     console.log(<any>error);
    //   }
    // );
    //Funcion para obtener latitud y longitud
    this._locationService.getPosition().then(
      pos=>{
        this.latitude = pos.lat;
        this.longitude = pos.long;
      }
    )
  }



}
