import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Global } from '../../providers/global';
import { DeviceService } from '../../providers/device-service';
import { ReportService } from '../../providers/report-service';

/*
  Generated class for the Report page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {

  getType: any;
  getDeviceList: any;
  deviceDetails = {
    device: ""
  };

  getReadings: any;
  getReadingsData: any;

  //for empty object
  readings: any;

  toDisplayTable: any = false;
  toDisplayNoDetails: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private deviceService: DeviceService,
              public globalMethods: Global, private reportService: ReportService) {
    if(localStorage.getItem('isCheckUser') == 'admin'){
      this.deviceService.getAdminDevices().then((data) => {
        this.getType = data;
        // console.log(data);
        if(this.getType.status == 200){
          this.getDeviceList = this.getType.json().devices;
          console.log(this.getDeviceList);
        }else {
          this.globalMethods.showAlert("Centilio !","Error");
        }
      });
    }else {
      this.deviceService.getUserDevices().then((data) => {
        this.getType = data;
        // console.log(data);
        if(this.getType.status == 200){
          this.getDeviceList = this.getType.json().devices;
          console.log(this.getDeviceList);
        }else {
          this.globalMethods.showAlert("Centilio !","Error");
        }
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  public onChange() {
    // alert(this.deviceDetails.device);
    if(this.deviceDetails.device == "" || this.deviceDetails.device == undefined){
      this.globalMethods.showAlert('Centilio !', 'Please select Device');
    }else {
      this.globalMethods.showLoading();
      console.log(this.deviceDetails.device);
      this.onSelect(this.deviceDetails.device);
    }
  }

  public onSelect(uuid):void {

    console.log("on viewdevice");    
    this.reportService.getDeviceDetailsById(uuid).then(
        (data) => {
          this.getReadings = data;
          this.globalMethods.loading.dismiss();          
          
          if(this.getReadings.status == 200 && this.getReadings._body == "No device readings found for this device...") {
            console.log("else");
            this.readings = [
              {"value": 0},{"value": 0},{"value": 0},{"value": 0}
            ];
            this.getReadingsData = [{
              'readings' : this.readings,
              'timestamp' : ''
            }];
            // this.getReadingsData.readings[0].value = "";
            // this.getReadingsData.readings[1].value = "";
            // this.getReadingsData.readings[2].value = "";
            // this.getReadingsData.readings[3].value = "";
            // this.getReadingsData.timestamp = "";
            this.toDisplayTable = false;
            this.toDisplayNoDetails = true;
          }else if (this.getReadings.status == 200) {            
            this.getReadingsData = this.getReadings.json().deviceReadings;
            this.toDisplayTable = true;
            this.toDisplayNoDetails = false;
            // console.log(this.getReadingsData);
          }else {
            this.readings = [
              {"value": 0},{"value": 0},{"value": 0},{"value": 0}
            ];
            this.getReadingsData = [{
              'readings' : this.readings,
              'timestamp' : ''
            }];
            this.toDisplayTable = false;
            this.toDisplayNoDetails = true;
          }
        }
    );
  }

}
