import { Component, OnInit } from '@angular/core';

import { PeticionesService } from '../services/peticiones.service';
import { Crimen } from '../models/crimen';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PeticionesService]

})
export class HomeComponent implements OnInit {
  public crimenes:[Crimen]; //Es un arreglo de crimenes


  constructor(
    private _peticionesService: PeticionesService
  ){}

  ngOnInit(){
    function recuperarUbicacion(position){
      graficar(position.coords.latitude, position.coords.longitude);
    }
    if(navigator.geolocation){ //Validar si hay acceso web a la ubicación
      navigator.geolocation.getCurrentPosition(recuperarUbicacion);
    }

    function graficar(latitude,longitude){
        var trace1 = {
            x: [0],
            y: [0],
            mode: 'markers',
            type: 'scatter',
            name: 'Mi ubicación',
            text: ['(0,0)'],
            marker: { size: 12 }
        };

        var myArrayX = [];
        var myArrayY = [];
        var myLabels = [];
        for (var i = 0; i < 10; i++){
            myArrayX.push(i-latitude);
            myArrayY.push(i-longitude);
            myLabels.push("("+(i-latitude)+","+(i-longitude)+")")
        }

        var trace2 = {
            x: myArrayX,
            y: myArrayY,
            mode: 'markers',
            type: 'scatter',
            name: 'Zona insegura',
            text: myLabels,
            marker: { size: 12 }
        };


        var data = [ trace1, trace2];

        /*Dimensiones del plano*/
        var layout = {
        xaxis: {
            range: [Math.min(...myArrayX, 0)-2, Math.max(...myArrayX, 0)+2]
        },
        yaxis: {
            range: [Math.min(...myArrayY, 0)-2, Math.max(...myArrayY, 0)+2]
        },
        title:'Transformacion de Datos'
        };

        Plotly.newPlot('grafica', data, layout);
    }



  }

}
