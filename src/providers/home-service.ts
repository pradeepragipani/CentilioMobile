import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';

import { Global } from './global';

declare var Connection;

/*
  Generated class for the HomeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HomeService {

  userLocal: any = localStorage.getItem('user');
  pwdLocal: any = localStorage.getItem('pwd');

  private headers: Headers;
  onDevice: boolean;
  data: any;

  constructor(public http: Http, public platform: Platform, private globalMethods: Global) {
    console.log('Hello HomeService Provider');
    this.onDevice = this.platform.is('cordova');
  }

  isOnline(): boolean {
    if(this.onDevice && Network){
      return Network !== Connection.NONE;
    } else {
      return navigator.onLine; 
    }
  }
 
  isOffline(): boolean {
    if(this.onDevice && Network){
      return Network === Connection.NONE;
    } else {
      return !navigator.onLine;   
    }
  }

  getLatestReadings() {

    let values = 'Basic ' + btoa(this.userLocal + ':' + this.pwdLocal);

    this.headers = new Headers();
    this.headers.append('Accept' , 'application/json');
    this.headers.append('Authorization', values);  
    this.headers.append('Content-Type', 'application/json');

    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
      this.http.get('http://183.82.1.143:4123/deviceReadings?latestOnly=true', {headers: this.headers})
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          console.log(this.data);
          
          resolve(this.data);
        },
        (err) => {
          console.log(err);
          this.globalMethods.loading.dismiss();
          this.globalMethods.showAlert('Centilio !', 'Server Error');
        },
        () => {}
        );
    });
  }

}
