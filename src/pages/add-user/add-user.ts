import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Global } from '../../providers/global';
import { ViewUserPage } from '../view-user/view-user';
import {UserService} from '../../providers/user-service';

/*
  Generated class for the AddUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html'
})
export class AddUserPage {

  private todo : FormGroup;

  returnData: any;
  userDetailsNew = {
        "firstName":"",
        "lastName":"",
        "email":"",
        "password":"",
        "role":"a1e62e8e-6ebf-47ea-8002-105b819427ad"
    };

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, 
        private userService: UserService, private globalMethods: Global) {
    this.todo = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUserPage');
  }

  addUserNew() {

    console.log("hi");
    if(this.userDetailsNew.firstName === "" || this.userDetailsNew.firstName === undefined){
      alert("Please enter First Name");
    }else if(this.userDetailsNew.lastName === "" || this.userDetailsNew.lastName === undefined){
      alert("Please enter Last Name");
    }else if(this.userDetailsNew.email === "" || this.userDetailsNew.email === undefined){
      alert("Please enter Email");
    }else if(this.userDetailsNew.password === "" || this.userDetailsNew.password === undefined){
      alert("Please enter Password");
    }else if(this.userDetailsNew.role === "" || this.userDetailsNew.role === undefined){
      alert("Please Select Role");
    }else {
      console.log(this.userDetailsNew);
      this.userService.addUserNew(this.userDetailsNew).then((data) => {
        this.returnData = data;
        // console.log(data);
        if(this.returnData.status >= 200 || this.returnData.status < 300){
          this.returnData = this.returnData.json();
          console.log(this.returnData);
          this.globalMethods.showAlert("Centilio !","User Added Succesfully");
          this.navCtrl.setRoot(ViewUserPage);
        }else {
          alert("Please Check Email/Username or Password");
        }
      });
    }
  }

}
