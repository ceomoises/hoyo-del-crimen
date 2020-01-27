import { Component, OnInit } from '@angular/core';

import { Crimen } from 'src/app/models/crimen';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // Atributos del mapa
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public crimes: Array<Crimen>; // Marcadores de crimenes
  // Primero configuramos el texto de nuestros marcadores
  public labelOptions = {
    color: '#ee4646',
    fontFamily: '',
    fontSize: '10px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    text: 'Plan Pagado/No pagado'
  };

  constructor() {
    // intanciamos nuestras clases
    this.crimes = [];
    // se configura el mapa
    this.latitude = 19.433869;
    this.longitude = -99.138893;
    this.zoom = 16;
  }

  ngOnInit() {
    console.log(this.latitude);
    console.log(this.longitude);
    console.log(this.labelOptions);
  }

}
