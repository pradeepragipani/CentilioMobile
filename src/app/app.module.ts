import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { DatePickerModule } from 'datepicker-ionic2';

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
import { ReportPage } from '../pages/report/report';
import { MapDevicePage } from '../pages/map-device/map-device';
import { ManageDevicePage } from '../pages/manage-device/manage-device';
import { GraphPage } from '../pages/graph/graph';

import { Global } from '../providers/global';
import { LoginService } from '../providers/login-service';
import { HomeService } from '../providers/home-service';
import { UserService } from '../providers/user-service';
import { DeviceService } from '../providers/device-service';
import { ReportService } from '../providers/report-service';
import { MapDeviceService } from '../providers/map-device-service';
import { ManageDeviceService } from '../providers/manage-device-service';
import { GraphService } from '../providers/graph-service';

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
    ViewDevicePage,
    ReportPage,
    MapDevicePage,
    ManageDevicePage,
    GraphPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ChartsModule,
    DatePickerModule
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
    ViewDevicePage,
    ReportPage,
    MapDevicePage,
    ManageDevicePage,
    GraphPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, Global,
    LoginService, HomeService,
    UserService, DeviceService,
    ReportService, MapDeviceService, ManageDeviceService, GraphService
  ]
})
export class AppModule {}
