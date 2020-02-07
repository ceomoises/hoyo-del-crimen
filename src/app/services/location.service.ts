import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

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
}
