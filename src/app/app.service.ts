import { Injectable } from '@angular/core';
import { Http, Response} from "@angular/http";
import { Observable } from "rxjs";
import {HeatMap} from './app.component';
import 'rxjs/Rx';

@Injectable()
export class APPRestService {
//   private url = 'https://heatmap.cfapps.io'; // full uri of the service to consume here

  constructor(private http: Http) { }

  getHeatMap(): Observable<HeatMap[]> {
    return this.http
      .get('/traffic/heatmaps')
    //   .get(this.url + '/traffic/heatmaps')
      .map((res: Response) => res.json());
  }

  getVehicle(): Observable<HeatMap[]> {
    return this.http
      .get( '/traffic/vehicles')
    //   .get(this.url + '/traffic/vehicles')
      .map((res: Response) => res.json());
  }
}
