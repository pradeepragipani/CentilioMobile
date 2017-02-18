import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the Global provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Global {

  loading: Loading;
  
  constructor(public http: Http, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    console.log('Hello Global Provider');
  }

  showAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: 'Centilio !',
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

}
