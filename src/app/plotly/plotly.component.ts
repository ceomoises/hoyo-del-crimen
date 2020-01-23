import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var Plotly: any;

@Component({
  selector: 'app-plotly',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.css']
})

export class PlotlyComponent implements OnInit{
  public data:any;
  public layout:any;

  @ViewChild("Graph",{static:true})
  private Graph:ElementRef

  ngOnInit(){
    this.data = [{
      x: [1,2,3,4,5],
      y: [5,4,3,2,1],
      name: "Data Transformation",
      type: "scatter",
      mode: "markers",
      marker: {size:12}
    }]

    this.layout = {
      xaxis:{range: [Math.min(1,2,3,4,5,0)-2, Math.max(1,2,3,4,5, 0)+2]},
      yaxis:{range: [Math.min(5,4,3,2,1,0)-2, Math.max(5,4,3,2,1, 0)+2]},
      title:'Transformacion de Datos'
    };

    this.Graph =  Plotly.newPlot(this.Graph.nativeElement, this.data, this.layout);
  }
}

    // graficar(position.coords.latitude, position.coords.longitude);

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
