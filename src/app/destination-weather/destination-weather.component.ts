import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { OperationsService } from '../operations.service';

@Component({
  selector: 'app-destination-weather',
  templateUrl: './destination-weather.component.html',
  styleUrls: ['./destination-weather.component.css']
})
export class DestinationWeatherComponent implements OnChanges {

  city: any = '';
  state: any = '';
  weather: any = {};

  @Input() destinationData: any;
  @Output() destination = new EventEmitter<any>();
  constructor(private ops: OperationsService) { }

  ngOnChanges() {
    console.log("Received place", this.destinationData);
    this.getLocation();
  }

  getLocation() {
    console.log("Acquiring destination Lat Long");
    let lat = this.destinationData.geometry.location.lat();
    let lng = this.destinationData.geometry.location.lng();
    console.log("Acquired Dest: ", lat, lng);
    console.log("Emitting Location data");
    this.destination.emit(lat + "," + lng);
    let currComp = this;
    console.log("Acquiring location:")
    this.ops.getLocation(lat, lng).subscribe(
      data => {
        console.log(data)
        currComp.city = data['results'][0].address_components[2].long_name;
        currComp.state = data['results'][0].address_components[4].short_name;
        console.log("Acquired location", currComp.city, this.state);
        currComp.getWeather();
      }
    )
  }

  getWeather() {
    console.log("Getting weather:", this.state, this.city);
    let currComp = this;
    this.ops.getWeather(this.state, this.city).subscribe(
      data => {
        currComp.weather = data['current_observation'];
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("Weather of destination acquired", currComp.weather);
      }
    )
  }

}
