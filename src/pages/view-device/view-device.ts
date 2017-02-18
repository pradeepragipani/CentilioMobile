import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddDevicePage } from '../add-device/add-device';
import { Global } from '../../providers/global';
import { DeviceService } from '../../providers/device-service';

/*
  Generated class for the ViewDevice page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-device',
  templateUrl: 'view-device.html'
})
export class ViewDevicePage {

  getDevices: any;
  getDevicesList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private globalMethods: Global, 
              private deviceService: DeviceService) {
    this.callDeviceList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewDevicePage');
  }

  public callDeviceList() {
    if(localStorage.getItem('isCheckUser') === "admin"){
      this.deviceService.getAdminDevices().then((data) => {
        this.getDevices = data;
        // console.log(data);
        if(this.getDevices.status == 200){
          this.getDevicesList = this.getDevices.json().devices;
          console.log(this.getDevicesList);
        }else {
          this.globalMethods.showAlert("Centilio !","Error");
        }
      });
    }else{
      this.deviceService.getUserDevices().then((data) => {
        this.getDevices = data;
        // console.log(data);
        if(this.getDevices.status == 200){
          this.getDevicesList = this.getDevices.json().devices;
          console.log(this.getDevicesList);
        }else {
          this.globalMethods.showAlert("Centilio !","Error");
        }
      });
    }
  }

  public gotoAddDevice(){
    this.navCtrl.setRoot(AddDevicePage);
  }

}
