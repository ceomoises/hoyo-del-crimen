import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';
import { LocationService } from '../../services/location.service';
import { Crimen } from 'src/app/models/crimen';
import * as moment from 'moment';
import 'moment-duration-format';

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
  public aprox: number;
  public zoom: number;
  public crimes: Array<Crimen>; // Marcadores de crimenes
  public myMarker: any;
  public myCrimes: any;
  public time1: string;
  public time2:string;

  constructor(
    private _peticionesService: PeticionesService,
    private _locationService: LocationService
  ){
    // Primero configuramos el texto de nuestros marcadores
    this.myMarker = {color: 'white', fontSize: '8px', fontWeight: 'bold', text: ':v'};
    this.myCrimes = {color: 'white', fontSize: '8px', fontWeight: 'bold', text: 'x_x'};

    this.time1 = "00:00";
    this.time2 = "01:00";

    this.crimes = [];
    this.distance = 250;
    this.zoom = 17;
  }

  // Iniciamos con nuestra ubicación
  ngOnInit() {
    // Obtenemos nuestra ubicación
    this._locationService.getPosition().then(
      pos => {
        this.latitude = pos.lat;
        this.longitude = pos.long;
        this.aprox = pos.aprox;

        // Petición para obtener un arreglo de crimenes
        let plotData$ = this._peticionesService.getCrimes(this.longitude, this.latitude, this.distance).subscribe(
          result => {
            this.crimes = result;
            console.log(this.crimes);
          plotData$.unsubscribe();
          },
          error => {
            console.log(<any> error);
          }
        ); // fin del subscribe
      } // promesa ubicación
    ); // fin de promesa ubicación
  }
  // Dibujamos con respecto al tiempo
  nextHour(){
    //obtenemos los minutos y agregamos 60min
    let time1min = moment.duration(this.time1).asMinutes()+60;
    let time2min = moment.duration(this.time2).asMinutes()+60;
    //pasamos nuestros minutos al formato de "horas y minutos"
    this.time1 = moment.duration({m:time1min}).format("HH:mm");
    this.time2 = moment.duration({m:time2min}).format("HH:mm");
  }

}
