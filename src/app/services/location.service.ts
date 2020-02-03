import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public getPosition(options?):Promise<any>{
    return new Promise((resolve,reject)=>{
      navigator.geolocation.getCurrentPosition(
        res=>{
          resolve(res);
        },
        err=>{
          reject("Unable to determine your location");
        },options
      )
    })
  }

  public getCurrenPosition(options?):Observable<any>{
    return Observable.create( observer =>{
      if(window.navigator && window.navigator.geolocation){
        window.navigator.geolocation.watchPosition(
          (position)=>{
            observer.next(position);
          },
          (error)=>{
            switch (error.code){
              case 1:observer.error("You have rejected to your location");break;
              case 2:observer.error("Unable to determine your location");break;
              case 3:observer.error("Service timeout has been reached"); break;
            }
          },options
        );
      }else{
          observer.error("Browser doesn't support location service");
      }
    });
  }



}
