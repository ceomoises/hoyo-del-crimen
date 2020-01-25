import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { LocationService } from '../services/location.service';
import { Crimen } from '../models/crimen';

declare var Plotly: any;

@Component({
  selector: 'app-plotly',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.css'],
  providers: [PeticionesService, LocationService]
})

export class PlotlyComponent implements OnInit{

  public data:any;
  public layout:any;
  public distance: string;
  public longitude: string;
  public latitude: string;
  public arrayLong: number[];
  public arrayLat: number[];
  public crimenes: Crimen[];

  @ViewChild("Graph",{static:true})
  private Graph:ElementRef

  constructor(
    private _peticionesService: PeticionesService,
    private _locationService: LocationService
  ){
    this.distance = "200"
    this.arrayLong = []
    this.arrayLat = []
  }

  ngOnInit(){
    //Obtenemos nuestra ubicación
    this._locationService.getPosition().then(
      pos=>{
        this.latitude = pos.lat;
        this.longitude = pos.long;

        //Petición para obtener un arreglo de crimenes
        let plotData$ = this._peticionesService.getCrimes(this.longitude,this.latitude,this.distance).subscribe(
          result => {
            this.crimenes = result;
            //agregamos longitudes y latitudes a los arreglos
            for(let i in this.crimenes){
              this.arrayLong.push(this.crimenes[i].long)
              this.arrayLat.push(this.crimenes[i].lat)
            }

          plotData$.unsubscribe();
          },
          error => {
            console.log(<any>error);
          }
        )//fin de subscribe
      }//promesa ubicación
    )//fin de promesa ubicación


    this.data = [{
      x: [1,2,3,4,5],
      y: [5,4,3,2,1],
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
