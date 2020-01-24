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
    var lat = [1,2,3,4,5];
    var long = [50,4,3,2,1];
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
      x: lat,
      y: long,
      name: "Data Transformation",
      type: "scatter",
      mode: "markers",
      marker: {size:12}
    };

    this.data = [trace1, trace2];

    var maxLat = Math.max(Math.abs (Math.min(...lat,0)), Math.abs (Math.max(...lat,0)));
    var maxLong = Math.max(Math.abs (Math.min(...long,0)), Math.abs (Math.max(...long,0)));
    var layoutSize = Math.max(maxLat, maxLong, distance);

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