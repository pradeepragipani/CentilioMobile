import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeService } from '../../providers/home-service';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
 
  map: any;
  mapInitialised: boolean = false;
  apiKey: any;
  readings: any;
  lats:any; longs:any;
  deviceLocationObj:any;
  deviceLocationArr: any;
  locations: any;

  constructor(public navCtrl: NavController, public homeService: HomeService) {
    this.deviceLocationArr = [
            {lat: -31.563910, lng: 147.154312},
            {lat: -33.718234, lng: 150.363181},
            {lat: -33.727111, lng: 150.371124},
            {lat: -33.848588, lng: 151.209834},
            {lat: -33.851702, lng: 151.216968},
            {lat: -34.671264, lng: 150.863657},
            {lat: -35.304724, lng: 148.662905},
            {lat: -36.817685, lng: 175.699196},
            {lat: -36.828611, lng: 175.790222},
            {lat: -37.750000, lng: 145.116667},
            {lat: -37.759859, lng: 145.128708},
            {lat: -37.765015, lng: 145.133858},
            {lat: -37.770104, lng: 145.143299},
            {lat: -37.773700, lng: 145.145187},
            {lat: -37.774785, lng: 145.137978},
            {lat: -37.819616, lng: 144.968119},
            {lat: -38.330766, lng: 144.695692},
            {lat: -39.927193, lng: 175.053218},
            {lat: -41.330162, lng: 174.865694},
            {lat: -42.734358, lng: 147.439506},
            {lat: -42.734358, lng: 147.501315},
            {lat: -42.735258, lng: 147.438000},
            {lat: -43.999792, lng: 170.463352}
        ];
    this.loadGoogleMaps();

    // this.homeService.getLatestReadings().then((data) => {
    //   this.readings = data;
    //   for(let k = 0; k < this.readings; k++){
    //     if(data[k] === undefined || data[k] === null || data[k] === ""){
    //       console.log("if");
    //     }else {
    //       this.deviceLocationObj = {
    //           title : this.readings[k].device,
    //           desc : 'Test',
    //           lat : this.readings[k].readings[0].value,
    //           long : this.readings[k].readings[1].value
    //         };
    //         // console.log(this.deviceLocationObj);
    //       this.deviceLocationArr.push(this.deviceLocationObj);
    //       console.log(this.deviceLocationArr);
    //     }
    //   }
    // });
  }

  loadGoogleMaps(){
 
    this.addConnectivityListeners();
 
  if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
    console.log("Google maps JavaScript needs to be loaded.");
    this.disableMap();
 
    if(this.homeService.isOnline()){
      console.log("online, loading map");
 
      //Load the SDK
      window['mapInit'] = () => {
        this.initMap();
        this.enableMap();
      }
 
      let script = document.createElement("script");
      script.id = "googleMaps";
 
      if(this.apiKey){
        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
      }
 
      document.body.appendChild(script);  
 
    } 
  }
  else {
 
    if(this.homeService.isOnline()){
      console.log("showing map");
      this.initMap();
      this.enableMap();
    }
    else {
      console.log("disabling map");
      this.disableMap();
    }
 
  }
 
  }
 
  initMap(): Promise<any>{
 
    this.mapInitialised = true;
    let markers = [];
    let deviceLoc = this.deviceLocationArr;
 
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition().then((position) => {
  
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
  
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        // var marker = new google.maps.Marker({ position: latLng, map: this.map, title: 'Your Location!'});
        new google.maps.Marker({
            position: latLng,
            title: "Your Location",
            // animation: google.maps.Animation.DROP,
            icon: "assets/img/location-button25.png",
            map: this.map
          });
          // var infoWindow = new google.maps.InfoWindow();
          // var createMarker = function (info){
          //     var marker = new google.maps.Marker({
          //         position: new google.maps.LatLng(info.lat, info.lng),
          //         map: this.map,
          //         animation: google.maps.Animation.DROP,
          //         icon: "assets/img/location1.png",
          //         title: info.title
          //     });
          //     marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
          //     google.maps.event.addListener(marker, 'click', function(){
          //         infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
          //         infoWindow.open(this.map, marker);
          //     });
          //     markers.push(marker);
          // }  
          // for (let i = 0; i < deviceLoc.length; i++){
          //     createMarker(deviceLoc[i]);
          // }
        resolve(this.map);
  
      });
    });
 
  }
 
  disableMap(){
    console.log("disable map");
  }
 
  enableMap(){
    console.log("enable map");
  }
 
  addConnectivityListeners(){
 
    let onOnline = () => {
 
      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
          this.loadGoogleMaps();
 
        } else {
 
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
      }, 2000);
 
    };
 
    let onOffline = () => {
      this.disableMap();
    };
 
    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
 
  }

}
