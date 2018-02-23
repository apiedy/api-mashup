import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { OperationsService } from './operations.service';
import { DestinationWeatherComponent } from './destination-weather/destination-weather.component';
import { DirectionsComponent } from './directions/directions.component';


@NgModule({
  declarations: [
    AppComponent,
    DestinationWeatherComponent,
    DirectionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [OperationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
