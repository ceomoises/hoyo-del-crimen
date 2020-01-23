import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getPosition():Promise<any>{
    return new Promise((resolve,reject)=>{
      navigator.geolocation.getCurrentPosition(
        res=>{
          resolve({long:res.coords.longitude,lat:res.coords.latitude});
        },err=>{
          reject("Ocurrio un erro al obtener la ubicación");
        })
    })
  }

}
