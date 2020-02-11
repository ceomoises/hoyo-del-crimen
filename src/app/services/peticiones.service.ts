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

  // Regresa un arreglo de crimenes por fecha { start_date:"2019-01", end_date:"2019-12" }
  async getCrimes(long:number,lat:number,dist:number,date?):Promise<any>{
    try {
      const params = (date!=null)?`?start_date=${date.start_date}-01&end_date=${date.end_date}-12`:``;
      const crimesUrl = `${this.url}/latlong/crimes/all/coords/${long}/${lat}/distance/${dist}${params}`;
      return await this.http.jsonp(crimesUrl,'callback').pipe(
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
      ).toPromise();
    } catch (error) {
      throw new Error("Unable to get crimes in your zone")
    }
  };

}
