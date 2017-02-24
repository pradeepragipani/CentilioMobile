import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Global } from '../../providers/global';
import { DeviceService } from '../../providers/device-service';
import { UserService } from '../../providers/user-service';
import { MapDeviceService } from '../../providers/map-device-service';

/*
  Generated class for the MapDevice page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map-device',
  templateUrl: 'map-device.html'
})
export class MapDevicePage {

  getType: any;
  getDeviceList: any;
  returnData: any;
  userList: any;
  getData: any;

  mapDevice = {
    user: "",
    device: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private deviceService: DeviceService,
              private userService: UserService,
              public globalMethods: Global, private mapDeviceService: MapDeviceService) {
    if(localStorage.getItem('isCheckUser') == 'admin'){
      this.mapDeviceService.getUnassignedDevices().then(
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
            // alert("No Unassigned Devices Found");
            // this.showNoDevices = true;
          }
      );

    this.userService.getClients().then((data) => {
      this.returnData = data;
      // console.log(data);
      if(this.returnData.status == 200){
        this.userList = this.returnData.json();
        console.log(this.userList);
      }else {
        this.globalMethods.showAlert("Centilio !","No Users Found");
      }
    });
    }else {
      // this.deviceService.getUserDevices().then((data) => {
      //   this.getType = data;
      //   // console.log(data);
      //   if(this.getType.status == 200){
      //     this.getDeviceList = this.getType.json().devices;
      //     console.log(this.getDeviceList);
      //   }else {
      //     this.globalMethods.showAlert("Centilio !","Error");
      //   }
      // });
      this.globalMethods.showAlert('Centilio !', 'You have no Access');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapDevicePage');
  }

  public mapDeviceToUser(){
    console.log(this.mapDevice);
    
    if(this.mapDevice.user === "" || this.mapDevice.user === undefined){
      // alert("Please Select User");
      this.globalMethods.showAlert('Centilio !', 'Please select User');
    }else if(this.mapDevice.device === "" || this.mapDevice.device === undefined){
      // alert("Please Select Device");
      this.globalMethods.showAlert('Centilio !', 'Please select Device');
    }else {
      this.globalMethods.showLoading();
      this.mapDeviceService.getDeviceDetailsByDate(this.mapDevice).then(
          data => {
              this.getData = data
              console.log(this.getData);
              if(this.getData.status >= 200 || this.getData.status < 300){
                console.log("Success");
                this.globalMethods.loading.dismiss();
                this.globalMethods.showAlert('Centilio !', 'Device Mapped Succesfully');
                this.mapDevice = {
                  user: "",
                  device: ""
                };
              }else {
                this.globalMethods.loading.dismiss();
                this.globalMethods.showAlert('Centilio !', 'Please Check Details');
              }
            }
      );
    }
  }

}
