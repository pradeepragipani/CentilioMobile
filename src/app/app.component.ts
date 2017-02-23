import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { UserTabPage } from '../pages/user-tab/user-tab';
import { DeviceTabPage } from '../pages/device-tab/device-tab';
import { ReportPage } from '../pages/report/report';
import { MapDevicePage } from '../pages/map-device/map-device';
import { ManageDevicePage } from '../pages/manage-device/manage-device';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = LoginPage;
  pages: any;

  constructor(platform: Platform, public menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.pages = [
      { title: 'Dashboard', component: DashboardPage },
      { title: 'Users', component: UserTabPage },
      { title: 'Devices', component: DeviceTabPage },
      { title: 'Reports', component: ReportPage },
      { title: 'Map Device', component: MapDevicePage },
      { title: 'Manage Device', component: ManageDevicePage }
    ];
  }

  openPage(page) {
    // alert(page);
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  logout() {
    localStorage.setItem('user', '');
    localStorage.setItem('pwd', '');
    localStorage.setItem('isCheckUser', '');
    this.nav.setRoot(LoginPage);
  }
}
