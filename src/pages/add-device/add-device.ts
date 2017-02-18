import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Global } from '../../providers/global';
import { ViewDevicePage } from '../view-device/view-device';
import { DeviceService } from '../../providers/device-service';

/*
  Generated class for the AddDevice page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-device',
  templateUrl: 'add-device.html'
})
export class AddDevicePage {

  private todo : FormGroup;

  getType: any;
  getTypeList: any;

  returnData: any;
  deviceDetails = {
    "name":"",
    "deviceId":"",
    "latitude":"100.001",
    "longitude":"100.001",
    "status":"new",
    "deviceType":""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private deviceService: DeviceService,
              private formBuilder: FormBuilder, private globalMethods: Global) {

    this.todo = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      imei: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      type: ['', Validators.required]
    });

    this.deviceService.getDeviceTypes().then((data) => {
      this.getType = data;
      // console.log(data);
      if(this.getType.status == 200){
        this.getTypeList = this.getType.json().deviceTypes;
        console.log(this.getTypeList);
      }else {
        this.globalMethods.showAlert("Centilio !","Error");
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDevicePage');
  }

  addDevice() {
    console.log("add device");

    if(this.deviceDetails.name === "" || this.deviceDetails.name === undefined){
      alert("Please enter Device Name");
    }else if(this.deviceDetails.deviceId === "" || this.deviceDetails.deviceId === undefined){
      alert("Please enter Device IMEI Number");
    }else {
      console.log(this.deviceDetails);
      this.deviceService.addDevice(this.deviceDetails).then((data) => {
        this.returnData = data;
        // console.log(data);
        if(this.returnData.status >= 200 || this.returnData.status < 300){
          this.returnData = this.returnData.json();
          console.log(this.returnData);
          this.globalMethods.showAlert("Centilio !","Device Added Succesfully");
          this.navCtrl.setRoot(ViewDevicePage);
        }else {
          alert("Server Error");
        }
      });
    }
  }

}
