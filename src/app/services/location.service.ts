import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private urlNominatim:string;

  constructor (private _http: HttpClient){
    this.urlNominatim = "https://nominatim.openstreetmap.org/reverse?format=jsonv2";
  }

  public getPosition(options?):Promise<any>{
    return new Promise((resolve,reject)=>{
      window.navigator.geolocation.getCurrentPosition(
        res=>{
          resolve(res);
        },
        err=>{
          reject("Unable to determine your location");
        },options);
    })
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

  public validateCoordinates(lat:number, long:number):Observable<any>{
    return this._http.get(`${this.urlNominatim}&lat=${lat}&lon=${long}`).pipe(
      map( res =>{
        console.log("DIRECCION");
        console.log(res);
        return res["address"].country;
      })
    ) 
  }
  

  public validateCoordinates2(lat:number, long:number){
    var value=true;
    this._http.get(`${this.urlNominatim}&lat=${lat}&lon=${long}`).subscribe(
      result => {
        let address = <Object>result["address"];
        let country = <string> (address["country"]);
        let county = <string> (address["county"]);
        console.log(address);
        if (!(country==="México")){
          value = false;
          console.log("COORDENADA INVALIDATE");
        }
        if (!(county==="Benito Juárez")){
          value = false;
          console.log("COORDENADA INVALIDATE 2");

        }
      },
      error => {
          console.log(<any>error);
    });
  }

}
