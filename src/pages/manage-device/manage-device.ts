import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Global } from '../../providers/global';
import { DeviceService } from '../../providers/device-service';
import { ManageDeviceService } from '../../providers/manage-device-service';

/*
  Generated class for the ManageDevice page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-manage-device',
  templateUrl: 'manage-device.html'
})
export class ManageDevicePage {

  getType: any;
  getDeviceList: any;

  playSoundReturn: any;
  locateReturn: any;
  brightnessReturn: any;

  deviceName: any;
  deviceBrightness: any;

  playSoundObj = {
    "device": "",
    "name" : "playAudio",
    "message" : {
      "action": "play",
      "value": ""
    }
  }

  changeBrightnessObj = {
    "device": "",
    "name" : "displayBrightness",
    "message" : {
      action: "", // if user chose increase in the drop-down above then this should be "increase"
      value: "10" // Keep ths hard coded now. We will make it variable later
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private globalMethods: Global,
              private deviceService: DeviceService, public manageDeviceService: ManageDeviceService) {
    if(localStorage.getItem('isCheckUser') === "admin"){
      this.deviceService.getAdminDevices().then(
          data => {
            this.getType = data;
            // console.log(data);
            if(this.getType.status == 200){
              this.getDeviceList = this.getType.json().devices;
              console.log(this.getDeviceList);
            }else {
              this.globalMethods.showAlert("Centilio !","Error");
            }
          },
          error => {
            this.globalMethods.showAlert("Centilio !","Error");
          }
      );
    }else{
      this.deviceService.getUserDevices().then(
          data => {
            this.getType = data;
            // console.log(data);
            if(this.getType.status == 200){
              this.getDeviceList = this.getType.json().devices;
              console.log(this.getDeviceList);
            }else {
              this.globalMethods.showAlert("Centilio !","Error");
            }
          },
          error => {
            this.globalMethods.showAlert("Centilio !","Error");
          }
      );
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageDevicePage');
  }

  public adjustBrightness(value) {
    console.log("on brightness");
    this.changeBrightnessObj.device = this.deviceName;
    this.changeBrightnessObj.message.action = value;
    
    if(this.deviceName == "" || this.deviceName == undefined){
      // alert("Please Select Device");
      this.globalMethods.showAlert("Centilio !","Please select Device");
    }else {
      this.callService(this.changeBrightnessObj);
    }
  }

  public playSound() {
    this.playSoundObj.device = this.deviceName;
    console.log(this.playSoundObj);
    if(this.deviceName == "" || this.deviceName == undefined){
      // alert("Please Select Device");
      this.globalMethods.showAlert("Centilio !","Please select Device");
    }else {
      this.callService(this.playSoundObj);
    }
  }

  public callService(obj) {
    this.manageDeviceService.playSpoundOnDevice(obj).then(
          data => {
            this.playSoundReturn = data;
          },
          error => {
            console.log(error)
          }
      );
  }

}
