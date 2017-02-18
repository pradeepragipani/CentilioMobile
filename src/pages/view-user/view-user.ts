import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddUserPage } from '../add-user/add-user';
import { UserTabPage } from '../user-tab/user-tab';
import { Global } from '../../providers/global';
import { UserService } from '../../providers/user-service';

/*
  Generated class for the ViewUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-user',
  templateUrl: 'view-user.html'
})
export class ViewUserPage {

  returnData: any;
  userList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService,
              private globalMethods: Global) {
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewUserPage');
  }

  public gotoAddUser(){
    this.navCtrl.setRoot(AddUserPage);
  }

}
