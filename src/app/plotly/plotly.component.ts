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
    var arrayLat = [1,2,3,4,5];
    var arrayLong = [50,4,3,2,1];
    var distance = 10;

    var trace1 = {
      x: [0],
      y: [0],
      name: "My location",
      type: "scatter",
      mode: "markers",
      marker: {size:10}
    };

    var trace2 = {
      x: arrayLat,
      y: arrayLong,
      name: "Data Transformation",
      type: "scatter",
      mode: "markers",
      marker: {size:12}
    };

    this.data = [trace1, trace2];

    var maxArrayLat = Math.max(Math.abs (Math.min(...arrayLat,0)), Math.abs (Math.max(...arrayLat,0)));
    var maxArrayLong = Math.max(Math.abs (Math.min(...arrayLong,0)), Math.abs (Math.max(...arrayLong,0)));
    var layoutSize = Math.max(maxArrayLat, maxArrayLong, distance);

    this.layout = {
      xaxis:{range: [-layoutSize-2, layoutSize+2]},
      yaxis:{range: [-layoutSize-2, layoutSize+2]},
      title:'Transformacion de Datos',
      width: 900,
      height: 800,
      shapes: [ {
        type: 'circle',
        xref: 'x',
        yref: 'y',
        x0: -distance,
        y0: -distance,
        x1: distance,
        y1: distance,
        line: {
          color: 'rgba(50, 171, 96, 1)'
        }
      }]
    };

    this.Graph =  Plotly.newPlot(this.Graph.nativeElement, this.data, this.layout);
  }
}