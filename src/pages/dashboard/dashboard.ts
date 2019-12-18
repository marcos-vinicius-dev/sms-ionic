import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';

import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  num : string
  mensagem : string

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public _platform : Platform,
    private androidPermissions: AndroidPermissions,
    private _sms: SMS) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  eviarSMS(){
    console.log(this.num, this.mensagem);
    if(this._platform.is("cordova")){
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SMS).then(
        result => console.log('Has permission?',result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SMS)
      );
      this._sms.send(this.num, this.mensagem);
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SMS, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    }
    
  }

}
