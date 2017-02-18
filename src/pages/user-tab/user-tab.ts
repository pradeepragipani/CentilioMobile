import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddUserPage } from '../add-user/add-user'
import { ViewUserPage } from '../view-user/view-user'

/*
  Generated class for the UserTab tabs.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
  selector: 'page-user-tab',
  templateUrl: 'user-tab.html'
})
export class UserTabPage {

  tab1Root: any = ViewUserPage;
  tab2Root: any = AddUserPage;

  constructor(public navCtrl: NavController) {

  }

}