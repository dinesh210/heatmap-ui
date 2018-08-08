import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {APPRestService} from './app.service';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyBQO5BdoHgaOugb0f9L1NPqURZsNSL9imo' + '&libraries=visualization'
    }),
    AgmJsMarkerClustererModule
  ],
  declarations: [ AppComponent],
  bootstrap:    [ AppComponent ],
  providers: [
    APPRestService
]
  // schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
