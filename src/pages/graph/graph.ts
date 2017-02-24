import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Global } from '../../providers/global';
import { DeviceService } from '../../providers/device-service';
import { GraphService } from '../../providers/graph-service';

/*
  Generated class for the Graph page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-graph',
  templateUrl: 'graph.html'
})
export class GraphPage {

  getType: any;
  getDeviceList: any;

  device: any;
  startDate: any;
  endDate: any;

  returnData: any;
  dataJson: any;
  toHideGraph: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private globalMethods: Global,
              private deviceService: DeviceService, private graphService: GraphService) {
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
    console.log('ionViewDidLoad GraphPage');
  }

  // lineChart
  public lineChartData:Array<any> = [
    // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [], label: 'Graph'}
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  public setDate(dateVal){
    console.log(dateVal);
    
    this.startDate = dateVal;
  }

  public getGraph(){
    console.log(this.device);
    // console.log(this.startDate);
    
    let startDt = new Date(this.startDate + ' 00:00:00').getTime();
    let endDt = new Date(this.endDate + ' 23:59:59').getTime();
    // console.log(startDt);
    // console.log(endDt);
    
    if(this.device === "" || this.device === undefined){
      // alert("Please Select Device");
      this.globalMethods.showAlert('Centilio !', 'Please select Device');
    }else if(this.startDate === "" || this.startDate === undefined){
      // alert("Please Select Device");
      this.globalMethods.showAlert('Centilio !', 'Please select Start Date');
    }else if(this.endDate === "" || this.endDate === undefined){
      // alert("Please Select Device");
      this.globalMethods.showAlert('Centilio !', 'Please select End Date');
    }else {
      this.globalMethods.showLoading();
      this.graphService.getDeviceDetailsByDate(this.device, startDt, endDt).then(
          data => {
              this.globalMethods.loading.dismiss();
              this.returnData = data
              // console.log(this.returnData);
              if(this.returnData.status >= 200 || this.returnData.status < 300){
                this.toHideGraph = true;
                console.log("Success");
                this.dataJson = this.returnData.json();
                console.log(this.dataJson);
                // this.lineChartData = [{data: [], label: 'Graph'}];
                // this.lineChartLabels = [];
                this.dataJson.deviceReadings.forEach(element => {
                  this.lineChartData[0].data.push(element.readings[3].value);
                  this.lineChartLabels.push(element.timestamp);
                });
                console.log(this.lineChartData);
                
                this.randomize();
              }else {
                this.globalMethods.showAlert('Centilio !', 'Error Occured');
              }
            }, error => {
              this.globalMethods.showAlert('Centilio !', 'Please Check Connection');
            }
      );
    }
  }

}
