import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddDevicePage } from '../add-device/add-device'
import { ViewDevicePage } from '../view-device/view-device'

/*
  Generated class for the DeviceTab tabs.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
  selector: 'page-device-tab',
  templateUrl: 'device-tab.html'
})
export class DeviceTabPage {

  tab1Root: any = ViewDevicePage;
  tab2Root: any = AddDevicePage;

  constructor(public navCtrl: NavController) {

  }

}