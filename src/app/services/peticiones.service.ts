import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// npm install --save rxjs-compat
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  public url: string;

  constructor( private http: HttpClient){
    this.url = "https://hoyodecrimen.com/api/v1";
  }

  getCrimes(long,lat,distance){
    const crimesUrl = `${this.url}/latlong/crimes/all/coords/${long}/${lat}/distance/${distance}`
    return this.http.jsonp(crimesUrl,'callback');
  }

}
