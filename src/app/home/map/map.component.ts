import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';
import { LocationService } from '../../services/location.service';
import { Crimen } from 'src/app/models/crimen';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import 'moment-duration-format';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [PeticionesService, LocationService]
})

export class MapComponent implements OnInit {
  private urlNominatim:string;
  public longitude: number;
  public latitude: number;
  public distance: number;
  public accuracy: number;
  public zoom: number;
  public crimes: Array<Crimen>;
  public crimesShown: Array<Crimen>;
  public myMarker: any;
  public myCrimes: any;
  public time1: string;
  public time2:string;
  public query:any;
  public options:any;

  constructor(
    private _peticionesService: PeticionesService,
    private _locationService: LocationService,
    private _http: HttpClient
  ){
    // Primero configuramos el texto de nuestros marcadores
    this.urlNominatim = "https://nominatim.openstreetmap.org/reverse?format=jsonv2";
    this.myMarker = { color:'white', fontSize:'8px', fontWeight:'bold', text:':v' };
    this.myCrimes = { color:'white', fontSize:'8px', fontWeight:'bold', text:'x_x'};

    this.time1 = "00:00"; this.time2 = "24:00";
    this.query = { start_date:"2019-01", end_date:"2019-12" }
    this.options = { enableHighAccuracy:true, timeout:5000, maximumAge:0 }

    this.crimesShown = [];
    this.distance = 250;
    this.zoom = 17;
  }

  ngOnInit() {
    this._locationService.getPosition(this.options).then(
      position=>{
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.accuracy = position.coords.accuracy;
        console.log(this.latitude);
        console.log(this.longitude);
        console.log(this.accuracy);
        if(this.latitude!=null && this.longitude!=null){
          // Obtenemos un arreglo de crimenes cercanos
          let coords$ = this._locationService.validateCoordinates(this.latitude, this.longitude).subscribe(state =>{
            if (state === "Ciudad de México"){
              let crim$ = this._peticionesService.getCrimes(this.longitude,this.latitude,this.distance).subscribe(
                result => {
                  this.crimes = result;
                  this.crimesShown = this.crimes;
                  console.log(this.crimes);
                  crim$.unsubscribe();
                  coords$.unsubscribe ();
                },
                error => {
                  console.log(`HoyoDeCrimen: ${error}`);
                }
              );
            }else{
              console.log ("Localización fuera del rango");
            }
          });
        }
      },
      error=>{
        console.log(`CrimeZone: ${error}`);
      }
    )
  }

  // Dibujamos con respecto al tiempo
  nextHour(){
    //obtenemos los minutos y agregamos 60min
    let time1 = moment.duration(this.time1).asMinutes()+60;
    let time2 = moment.duration(this.time2).asMinutes()+60;
    //pasamos nuestros minutos al formato de "horas y minutos"
    this.time1 = moment.duration({m:time1}).format("HH:mm");
    this.time2 = moment.duration({m:time2}).format("HH:mm");

    this.filterCrimes();
  }

  filterCrimes(){
    let crimesAux: Array<Crimen> = [];
    // Convertimos el tiempo 1 y 2 en horas
    let time1 = moment.duration(this.time1).asHours();
    let time2 = moment.duration(this.time2).asHours();
    // Filtramos los crimenes
    for(let i in this.crimes){
      // Obtenemos la hora del crimen
      let crimeHour = moment.duration(this.crimes[i].time).asHours();
      // Comprobamos que la hora del crimen este entre el tiempo 1 y 2
      if(crimeHour>=time1 && crimeHour<=time2){
        crimesAux.push(this.crimes[i]);
      }
    }
    console.log(crimesAux);
    this.crimesShown = crimesAux;
  }

}
