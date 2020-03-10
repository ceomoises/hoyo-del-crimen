import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  private urlNominatim:string;

  constructor (private _http: HttpClient){
    this.urlNominatim = "https://nominatim.openstreetmap.org/reverse?format=jsonv2";
  }

  /**
  * Regresa una promesa de tu geolalicación
  *
  * @param options Las opciones de getCurrentPosition
  * @returns Tu geolocalización actual
  *
  */
  private getCurrentPosition(options?):Promise<any>{
    return new Promise((resolve,reject)=>{
      window.navigator.geolocation.getCurrentPosition(
        res=>{ resolve(res);},
        err=>{ reject(err);},
        options);
    })
  }

  /**
  * Regresa un objeto con tus cordenadas geograficas
  *
  * @param options Las opciones de getCurrentPosition
  * @returns Las coordenadas de `lat`, `long` y la presición `accy`
  *
  */
  async getPosition(options?):Promise<any>{
    try{
      const res = await this.getCurrentPosition(options);
      return {lat:res.coords.latitude,long:res.coords.longitude,accy:res.coords.accuracy}
    }catch(error){
      switch (error.code){
        case 1:throw new Error("You have rejected to your location");
        case 2:throw new Error("Unable to determine your location");
        case 3:throw new Error("Service timeout has been reached");
      }
    }
  }

  /**
  * Regresa un string con el estado de una ciudad segun sus coordenadas
  *
  * @param lat La coordenada de latitud
  * @param long La coordenada de longitud
  * @returns El estado de las coordenadas `lat` y `long`
  *
  */
  async getState(lat:number, long:number):Promise<string>{
    try{
      const url = `${this.urlNominatim}&lat=${lat}&lon=${long}`;
      let res = await this._http.get(url).toPromise();
      return res["address"].state;
    }catch(err){
      throw new Error("Unable to determine your state");
    }
  }
}
