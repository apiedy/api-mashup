import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OperationsService {

  constructor(private http: HttpClient) { }

  getLocation(lat, lng) {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng)
  }

  getWeather(state, city) {
    return this.http.get("http://api.wunderground.com/api/3f102a095eb841bb/conditions/q/"+state+"/"+city+".json")
  }

  getDirections(origin, destination) {
    return this.http.get("https://maps.googleapis.com/maps/api/directions/json?origin="+ origin +"&destination="+ destination +"&key=AIzaSyDkVHKCWOxe71yl-nVZirfkzY5-6l9WMWE")
  }

}
