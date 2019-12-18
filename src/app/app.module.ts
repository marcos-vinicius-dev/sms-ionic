import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { SMS } from '@ionic-native/sms';
import { SmsServiceProvider } from '../providers/sms-service/sms-service'
import { HttpClientModule } from '@angular/common/http'; 
import { DashboardPage } from '../pages/dashboard/dashboard';


import { AndroidPermissions } from '@ionic-native/android-permissions';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DashboardPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SMS,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SmsServiceProvider
  ]
})
export class AppModule {}
