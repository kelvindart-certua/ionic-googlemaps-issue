import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';

import {
  GoogleMaps,
  GoogleMapOptions,
  GoogleMap,
  LatLng,
  GoogleMapsEvent
} from '@ionic-native/google-maps';
import { GoogleMapsMapTypeId } from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  /**
   * Reference to the element
   */
  @ViewChild('localMap', { static: false }) localMap: ElementRef;

  googleMap: GoogleMap;

  constructor(private platform: Platform) {}

  async ionViewDidEnter() {
    await this.platform.ready();
    this.loadMap()
  }

  loadMap() {
    const mapOptions: GoogleMapOptions = {
      mapType: GoogleMapsMapTypeId.NORMAL,
      camera: {
        target: {
          // London lat and lng
          lat: 51.509865,
          lng: -0.118092
        },
        zoom: 5,
        tilt: 100
      }
    };

    console.log('localMap: ', this.localMap.nativeElement);

    this.googleMap = GoogleMaps.create(this.localMap.nativeElement, mapOptions);

    this.googleMap
      .one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map ready!');

        // -->Create: marker
        const lat = '51.509865';
        const lng = '-122.0307812';

        // -->Market: add all
        this.googleMap.addMarker({
          title: 'Test Marker',
          icon: 'red',
          position: { lat: +lat, lng: +lng }
        });

        // set view of the map based on options
        this.googleMap.moveCamera({
          target: {
              lat: 51.509865,
              lng: -122.0307812
          },
          zoom: 5,
          tilt: 100
        });
      })
      .catch(err => console.error('GMAP ERROR: ', err));
  }
}
