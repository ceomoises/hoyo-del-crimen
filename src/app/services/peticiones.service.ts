import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// npm install --save rxjs-compat
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Crimen } from '../models/crimen';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  public url: string;

  constructor( private http: HttpClient){
    this.url = "https://hoyodecrimen.com/api/v1";
  }

  //Regresa un arreglo de crimenes
  getCrimes(long,lat,distance):Observable<any>{
    const crimesUrl = `${this.url}/latlong/crimes/all/coords/${long}/${lat}/distance/${distance}`
    return this.http.jsonp(crimesUrl,'callback').pipe(
      map(res => {
        return res["rows"].map(item =>{
          return new Crimen(
            item.crime,
            item.date,
            item.hour,
            item.lat,
            item.long,
          )
        })
      })
    )
  };

}
