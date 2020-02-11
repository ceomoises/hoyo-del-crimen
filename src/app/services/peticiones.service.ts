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
  private url: string;

  constructor(private http: HttpClient){
    this.url = "https://hoyodecrimen.com/api/v1";
  }

  //Regresa un arreglo de crimenes
  public getCrimes(long:number,lat:number,dist:number,query?):Observable<any>{
    let params = (query!=null)?`?start_date=${String(query.start_date)}-01&end_date=${String(query.end_date)}-12`:``;
    let crimesUrl = `${this.url}/latlong/crimes/all/coords/${long}/${lat}/distance/${dist}${params}`;
    return this.http.jsonp(crimesUrl,'callback').pipe(
      map(res => {
        return res["rows"].map(item =>{
          return new Crimen(
            item.crime,
            item.date,
            item.hour,
            Number (item.lat),
            Number (item.long)
          )
        })
      })
    )
  };

}
