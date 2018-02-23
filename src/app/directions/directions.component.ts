import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.css']
})
export class DirectionsComponent implements OnChanges {

  routes: any = {};

  @Input() directionsData: any;
  constructor() { }

  ngOnChanges() {
    this.routes = this.directionsData.routes;
  }

}
