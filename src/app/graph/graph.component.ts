import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

declare var Potly:any;
export class GraphComponent implements OnInit {
  @ViewChild("Graph", { static: true })
  private Graph: ElementRef; 
  constructor() { }

  ngOnInit() {
  }

}
