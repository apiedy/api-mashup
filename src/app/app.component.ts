import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {} from 'googlemaps';
import { Observable } from 'rxjs/Observable';

import { OperationsService } from './operations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  lat: any;
  lng: any;
  city: any = '';
  state: any = '';
  initWeather: any = {};
  autocomplete;
  placeSearch;
  place:any;
  directions: any;

  @ViewChild('autocomplete')
  autocompleteElementRef: ElementRef;

  constructor(private ops: OperationsService,
              private ref: ChangeDetectorRef) {
                setInterval(() => {
                  this.ref.detectChanges();
                }, 1000);
              }

  ngAfterViewInit() {
    const currComp = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      currComp.lat = position.coords.latitude;
      currComp.lng = position.coords.longitude;
      console.log("Acquired Lat and Long", currComp.lat, currComp.lng);
      console.log("Getting Location");
      currComp.getLocation();
      console.log("Initializing Places Autocomplete");
      currComp.initAutocomplete();
    });
  }
  
  getLocation() {
    this.ops.getLocation(this.lat, this.lng).subscribe(
      data => {
        this.city = data['results'][0].address_components[2].long_name;
        this.state = data['results'][0].address_components[4].short_name;
        console.log("Location Acquired:", this.city, this.state);
        this.getInitWeather();
      }
    );
  }

  initAutocomplete() {
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteElementRef.nativeElement, {
      types: ["geocode"]
    });
    let currComp = this;
    this.autocomplete.addListener('place_changed', function() {currComp.getDestination()});
    console.log("Autocomplete Initialized");
  }

  getInitWeather() {
    console.log("Getting Local Weather")
    this.ops.getWeather(this.state, this.city).subscribe(
      data => {
        this.initWeather = data['current_observation'];
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("Weather Acquired", this.initWeather);
      }
    )
  }
  
  setGeoBias() {
    let currComp = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        currComp.autocomplete.setBounds(circle.getBounds());
      });
    }
  }
  
  getDestination() {
    console.log("Place Changed");
    console.log("Acquiring Place");
    this.place = this.autocomplete.getPlace();
    console.log("Place acquired", this.place);
  }
  
  onDestination(string) {
    console.log("Emit Received", string);
    let origin = this.lat + "," + this.lng;
    let destination = string;
    let currComp = this;
    console.log("Getting Directions");
    this.ops.getDirections(origin, destination).subscribe(
      data => {
        currComp.directions = data;
      },
      err => {
        console.log(err)
      },
      () => {
        console.log("Acquired directions", this.directions);
      }
    )
  }
}

// https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=AIzaSyDkVHKCWOxe71yl-nVZirfkzY5-6l9WMWE