import { Injectable } from '@angular/core';
import { Http, HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Global } from './global';

/*
  Generated class for the ReportService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ReportService {

  data: any;
  private headers: Headers;

  userLocal: any = localStorage.getItem('user');
  pwdLocal: any = localStorage.getItem('pwd');

  constructor(public http: Http, private globalMethods: Global) {
    console.log('Hello ReportService Provider');
    let values = 'Basic ' + btoa(this.userLocal + ':' + this.pwdLocal);

    this.headers = new Headers();
    this.headers.append('Accept' , 'application/json');
    this.headers.append('Authorization', values);  
    this.headers.append('Content-Type', 'application/json');
  }

  getDeviceDetailsById(uuid) {
    // ...using get request
    return new Promise(resolve => {
      this.http.get('http://183.82.1.143:4123/devices/' + uuid + '/deviceReadings',  {headers: this.headers})
      // ...and calling .json() on the response to return data
      .map((res: Response) => res)
      //...errors if any
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = data;
        // console.log(this.data);
        
        resolve(this.data);
      },
      (err) => {
        console.log(err);
        this.globalMethods.loading.dismiss();
        this.globalMethods.showAlert('Centilio !', 'Server Error in getting Devices');
      },
      () => {}
      );
    });
  }
}
