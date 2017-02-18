import { Injectable } from '@angular/core';
import { Http, HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Global } from './global';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {

  private headers: Headers;
  data: any;
  addData: any;

  userLocal: any = localStorage.getItem('user');
  pwdLocal: any = localStorage.getItem('pwd');

  constructor(public http: Http, private globalMethods: Global) {
    console.log('Hello UserService Provider');
    let values = 'Basic ' + btoa(this.userLocal + ':' + this.pwdLocal);

    this.headers = new Headers();
    this.headers.append('Accept' , 'application/json');
    this.headers.append('Authorization', values);  
    this.headers.append('Content-Type', 'application/json');
  }

  getClients() {
    // ...using get request
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
      this.http.get('http://183.82.1.143:4123/clients', {headers: this.headers})
        .map(res => res)
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
          this.globalMethods.showAlert('Centilio !', 'Server Error in getting Users');
        },
        () => {}
        );
      });
    }

  addUserNew(userDetails) {
    let body = JSON.stringify(userDetails);
    // ...using get request
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
      this.http.post('http://183.82.1.143:4123/users', body, {headers: this.headers})
        .map(res => res)
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.addData = data;
          console.log(this.addData);
          
          resolve(this.addData);
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
