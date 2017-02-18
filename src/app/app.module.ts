import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { UserTabPage } from '../pages/user-tab/user-tab';
import { AddUserPage } from '../pages/add-user/add-user';
import { ViewUserPage } from '../pages/view-user/view-user';
import { DeviceTabPage } from '../pages/device-tab/device-tab';
import { AddDevicePage } from '../pages/add-device/add-device';
import { ViewDevicePage } from '../pages/view-device/view-device';

import { Global } from '../providers/global';
import { LoginService } from '../providers/login-service';
import { HomeService } from '../providers/home-service';
import { UserService } from '../providers/user-service';
import { DeviceService } from '../providers/device-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    DashboardPage,
    UserTabPage,
    AddUserPage,
    ViewUserPage,
    DeviceTabPage,
    AddDevicePage,
    ViewDevicePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    DashboardPage,
    UserTabPage,
    AddUserPage,
    ViewUserPage,
    DeviceTabPage,
    AddDevicePage,
    ViewDevicePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, Global,
    LoginService, HomeService,
    UserService, DeviceService
  ]
})
export class AppModule {}
