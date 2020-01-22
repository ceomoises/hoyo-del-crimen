import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plotly',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.css']
})


export class PlotlyComponent {
  public graph = {
      data: [
          { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
          { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
      ],
      layout: {width: 320, height: 240, title: 'A Fancy Plot'}
  };
}


    // // long: -99.0627 , lat: 19.3568
    // // this._peticionesService.getCrimes('-99.0627','19.3568','200').subscribe(
    // //   result => {
    // //       this.crimenes = result;
    // //       console.log(this.crimenes);
    // //   },
    // //   error => {
    // //     console.log(<any>error);
    // //   }
    // // );
    // // Funcion para obtener latitud y longitud
    // function recuperarUbicacion(position){
    //   graficar(position.coords.latitude, position.coords.longitude);
    // }
    // if(navigator.geolocation){ // Validar si hay acceso web a la ubicación
    //   navigator.geolocation.getCurrentPosition(recuperarUbicacion);
    // }

    // function graficar(latitude,longitude){
    //     var trace1 = {
    //         x: [0],
    //         y: [0],
    //         mode: 'markers',
    //         type: 'scatter',
    //         name: 'Mi ubicación',
    //         text: ['(0,0)'],
    //         marker: { size: 12 }
    //     };

    //     var myArrayX = [];
    //     var myArrayY = [];
    //     var myLabels = [];
    //     for (var i = 0; i < 10; i++){
    //         myArrayX.push(i-latitude);
    //         myArrayY.push(i-longitude);
    //         myLabels.push("("+(i-latitude)+","+(i-longitude)+")")
    //     }

    //     var trace2 = {
    //         x: myArrayX,
    //         y: myArrayY,
    //         mode: 'markers',
    //         type: 'scatter',
    //         name: 'Zona insegura',
    //         text: myLabels,
    //         marker: { size: 12 }
    //     };


    //     var data = [ trace1, trace2];

    //     /*Dimensiones del plano*/
    //     var layout = {
    //     xaxis: {
    //         range: [Math.min(...myArrayX, 0)-2, Math.max(...myArrayX, 0)+2]
    //     },
    //     yaxis: {
    //         range: [Math.min(...myArrayY, 0)-2, Math.max(...myArrayY, 0)+2]
    //     },
    //     title:'Transformacion de Datos'
    //     };

    //     Plotly.newPlot('grafica', data, layout);
    // }