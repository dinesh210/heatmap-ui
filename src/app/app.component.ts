import { Component, OnDestroy, OnInit } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

import { MouseEvent } from '@agm/core';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs/Rx';
import { APPRestService } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  // google maps zoom level
  zoom = 9.4;
  icon = '/assets/vehicle.png';
  // initial center position for the map
  lat = 51.51502;
  lng = -0.204556;
  lat2 = 51.513465000000004;
  lng2: number = -0.100127;
  vehicleInfo = '';
  color = 'red';
  markers = [];
  circles = [];
  alive = false;
  // circles: HeatMap[] = [];
  constructor(private appService: APPRestService) {
    this.alive = true;
  }

  ngOnInit() {
    // get our data immediately when the component inits
    this.appService.getHeatMap()
      .first() // only gets fired once
      .subscribe((data) => {
        this.circles = data;
      });

      this.appService.getVehicle()
      .first() // only gets fired once
      .subscribe((data) => {
        this.markers = data;
      });

    // get our data every subsequent 10 seconds
    IntervalObservable.create(10000)
      .takeWhile(() => this.alive) // only fires when component is alive
      .subscribe(() => {
        this.appService.getHeatMap()
          .subscribe(data => {
            this.circles = data;
          });
      });

      IntervalObservable.create(60000)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.appService.getVehicle()
          .subscribe(data => {
            this.markers = data;
          });
      });
  }

  ngOnDestroy () {
    this.alive = false; // switches your IntervalObservable off
  }

  clickedMarker(label: string, index: number) {
    console.log(index);
    this.vehicleInfo = 'Number: ' + label + ' <br/>' + ' Location: (' + this.markers[index].lat + ',' + this.markers[index].lng + ')' ;
  }

  mapClicked($event: MouseEvent) {
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

}

// just an interface for type safety.
export interface Marker {
  lat: number;
  lng: number;
  label?: string;
}

export interface HeatMap {
  lat: number;
  lng: number;
  heat: string;
}
