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

  //Convierte getCurrentPosition a una Promesa
  private getCurrentPosition(options?):Promise<any>{
    return new Promise((resolve,reject)=>{
      window.navigator.geolocation.getCurrentPosition(
        res=>{ resolve(res);},
        err=>{ reject(err);},
        options);
    })
  }
  // Obtiene tus coordenadas actuales
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

  public getCurrenPosition(options?:any):Observable<any>{
    return Observable.create( observer =>{
      if(window.navigator && window.navigator.geolocation){
        let watchId = window.navigator.geolocation.watchPosition(
          (position)=>{
            observer.next(position);
          },
          (error)=>{
            switch (error.code){
              case 1:observer.error("You have rejected to your location");break;
              case 2:observer.error("Unable to determine your location");break;
              case 3:observer.error("Service timeout has been reached"); break;
            }
          },options);
        // PATCH: Con el timeout nos aseguramos de dejar de obtener la ubicación
        // en google chrome después de cierto tiempo.
        let timeout = setTimeout(()=>{
          console.log("stop watching...");
          observer.complete();
          window.navigator.geolocation.clearWatch( watchId );
        },options.timeout);
      }else{
        observer.error("Browser doesn't support location service");
      }
    });
  }
  // Obtiene el estado de una ciudad segun sus coordenadas
  async getState(lat:number, long:number):Promise<any>{
    try{
      const url = `${this.urlNominatim}&lat=${lat}&lon=${long}`;
      let res = await this._http.get(url).toPromise();
      return res["address"].state;
    }catch(err){
      throw new Error("Unable to determine your state");
    }
  }
}
