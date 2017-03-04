import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading, MenuController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { DashboardPage } from '../dashboard/dashboard';
import { LoginService } from '../../providers/login-service';
import { Global } from '../../providers/global';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService],
  animations: [
 
    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),
 
    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),
 
    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1}) 
        ]))
      ])
    ]),
 
    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class LoginPage {
  // loading: Loading;
  registerCredentials = {email: '', password: ''};
  
  returnData: any;
  userDetails: any;
 
  constructor(private nav: NavController, private loginService: LoginService, private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController, private globalMethods: Global, public menu: MenuController) {}

  ionViewDidEnter() {
    this.globalMethods.disableMneu();
  }
 
  public createAccount() {
    this.nav.push(HomePage);
  }
 
  public login() {
       
   if(this.registerCredentials.email == "" || this.registerCredentials.email == undefined){
    this.globalMethods.showAlert("Centilio !", "Please enter Email/Username");
   }else if(this.registerCredentials.password == "" || this.registerCredentials.password == undefined){
    this.globalMethods.showAlert("Centilio !", "Please enter Password");
   }else {
     this.globalMethods.showLoading();
     this.loginService.login(this.registerCredentials).then((data) => {
      this.returnData = data;
      // console.log(data);
      if(this.returnData.status == 'Forbidden'){
        this.globalMethods.loading.dismiss();
        this.globalMethods.showAlert('Centilio !', 'Server Error');
      }else {
        if(this.returnData.status == 200){
          console.log("success");
          localStorage.setItem('user', this.registerCredentials.email);
          localStorage.setItem('pwd', this.registerCredentials.password);
          this.userDetails = this.returnData.json();
          localStorage.setItem('isCheckUser', this.userDetails.role);
          console.log(this.userDetails);
          this.globalMethods.loading.dismiss();
          this.nav.setRoot(DashboardPage);
        }else {
          this.globalMethods.loading.dismiss();
          this.globalMethods.showAlert("Centilio !", "Please Check Email/Username or Password");
        }
      }
    })
    .catch(err => {
      //show alert
      this.globalMethods.loading.dismiss();
      this.globalMethods.showAlert('Centilio !', err);
    });
   }
  }

  
 
  showError(text) {
    setTimeout(() => {
      this.globalMethods.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
