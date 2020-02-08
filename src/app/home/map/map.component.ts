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
  public daysSelected:Array<Object>;

  constructor(
    private _peticionesService: PeticionesService,
    private _locationService: LocationService,
    private _http: HttpClient
  ){
    // Primero configuramos el texto de nuestros marcadores
    this.urlNominatim = "https://nominatim.openstreetmap.org/reverse?format=jsonv2";
    this.myMarker = { color:'white', fontSize:'8px', fontWeight:'bold', text:':v' };
    this.myCrimes = { color:'white', fontSize:'8px', fontWeight:'bold', text:'x_x'};

    this.time1 = "00:00"; this.time2 = "01:00";
    this.query = { start_date:"2019-01", end_date:"2019-12" }
    this.options = { enableHighAccuracy:true, timeout:5000, maximumAge:0 }

    this.daysSelected = [
      {day:"Lunes", value:true},
      {day: "Martes", value:true},
      {day: "Miercoles" , value:false},
      {day: "Jueves" , value:false},
      {day: "Viernes" , value:false},
      {day: "Sabado" , value:false},
      {day: "Domingo" , value:false},
    ];

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
          //Verificamos si esta dentro de la Ciudad de Mexico
          let coords$ = this._locationService.validateCoordinates(this.latitude, this.longitude).subscribe(state =>{
            if (state === "Ciudad de México"){
              // Obtenemos un arreglo de crimenes cercanos
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
        if (this.validateMounthCrime(this.crimes[i].date))
          crimesAux.push(this.crimes[i]);
      }
    }
    console.log(crimesAux);
    this.crimesShown = crimesAux;
  }

  public sendRequest(){
    const crim$ = this._peticionesService.getCrimes(this.longitude,this.latitude,this.distance).subscribe(
      result => {
        this.crimes = result;
        this.crimesShown = this.crimes;
        console.log(this.crimes);
        crim$.unsubscribe();
      },
      error => {
        console.log(`HoyoDeCrimen: ${error}`);
      }
    );
  }

  async getPosition(){
    try {
      const position = await this._locationService.getPosition(this.options);
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.accuracy = position.coords.accuracy;
      const state = await this._locationService.validateCoordinates(this.latitude,this.longitude).toPromise();
      if(state==="Ciudad de México"){
        const crimes = await this._peticionesService.getCrimes(this.longitude,this.latitude,this.distance).toPromise();
        console.log(crimes);
      }else{
        console.log ("CrimeZone: Location outside");
      }
    } catch (error) {
      console.log(error);
    }
  }

  validateMounthCrime(date:string):boolean{
    //Dias de la semana
    let days = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado", "Domingo"];
    let diysAvaible = [];
    for (let i in this.daysSelected){
      if (this.daysSelected[i] ['value'])
      diysAvaible.push(this.daysSelected[i] ['day']);
    }
    // Obtenemos el dia del crimen
    let crimeDate = new Date (date);
    let day = days[crimeDate.getDay()];
    // Comprobamos que la hora del crimen este entre el tiempo 1 y 2
    for (let index in diysAvaible){
      if (diysAvaible[index]===day)
        return true;
    }
    return false;
  }


}
