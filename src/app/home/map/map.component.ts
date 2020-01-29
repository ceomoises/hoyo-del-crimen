import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';
import { LocationService } from '../../services/location.service';
import { Crimen } from 'src/app/models/crimen';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [PeticionesService, LocationService]
})
export class MapComponent implements OnInit {
  // Atributos del mapa
  public latitude: number;
  public longitude: number;
  public distance: number;
  public zoom: number;
  public crimes: Array<Crimen>; // Marcadores de crimenes
  public myMarker: any;
  public myCrimes: any;

  constructor(
    private _peticionesService: PeticionesService,
    private _locationService: LocationService
  ){
    // Primero configuramos el texto de nuestros marcadores
    this.myMarker = {color: 'white', fontSize: '8px', fontWeight: 'bold', text: ':v'};
    this.myCrimes = {color: 'white', fontSize: '8px', fontWeight: 'bold', text: 'x_x'};

    this.crimes = [];
    this.distance = 250;
    this.zoom = 16;
  }

  // Iniciamos con nuestra ubicación
  ngOnInit() {
      this.getCrimes();
  }

  public getCrimes(){
       // Obtenemos nuestra ubicación
       this._locationService.getPosition().then(
        pos => {
          this.latitude = pos.lat;
          this.longitude = pos.long;
          console.log(this.longitude);
          console.log(this.latitude);
          console.log(pos.aprox);
          // Petición para obtener un arreglo de crimenes
          let plotData$ = this._peticionesService.getCrimes(this.longitude, this.latitude, this.distance).subscribe(
            result => {
              this.crimes = result;
              // agregamos longitudes y latitudes a los arreglos
              // for(let i in this.crimenes){
              //   this.arrayLong.push(Number(this.crimenes[i].long))
              //   this.arrayLat.push(Number(this.crimenes[i].lat))
              // }
              console.log(this.crimes);
            // plotData$.unsubscribe();
            },
            error => {
              console.log(error as any);
            }
          ); // fin del subscribe
        } // promesa ubicación
      ); // fin de promesa ubicación

  }

  // Dibujamos con respecto al tiempo



}
