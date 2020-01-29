import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private options : any;

  constructor() {
    this.options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  }

  getPosition():Promise<any>{
    return new Promise((resolve,reject)=>{
      navigator.geolocation.watchPosition(
        res=>{
          resolve({long:res.coords.longitude,lat:res.coords.latitude,aprox:res.coords.accuracy});
        },err=>{
          reject("Ocurrio un erro al obtener la ubicación");
        },this.options)
    })
  }

}
