import { Component, Input } from '@angular/core';
import { NavController, AlertController, NavParams, Platform} from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';
import { DashboardPage } from '../dashboard/dashboard';
import { AndroidPermissions } from '@ionic-native/android-permissions';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  cnpj : string;
  email: string;
  senha: string;
  num : string
  mensagem : string
  
  public headers : any;
  

  constructor(public _navCtrl: NavController,
              private _sms: SMS,
              public _platform : Platform,
              private androidPermissions: AndroidPermissions,
              public navParams: NavParams,
              private _alertCtrl: AlertController,
              private _smsService : SmsServiceProvider,
              public http: HttpClient) {
                      if(this._platform.is("cordova")){
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SMS).then(
          result => console.log('Has permission?',result.hasPermission),
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SMS)
        );

        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SMS, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
      }
  }
  
  loginUser(){    
    this._smsService
    .testLoginpost() //pegar url do service provider contato
    .subscribe(//para obter resposta da api
    (usuario) => { //oq ele vai recerber = lista de contatos
      usuario = this._smsService.convertToJson(usuario);
      if(usuario["Mobile_LoginResponse"]["Mobile_LoginResult"] == 'true')
      {
        console.log(usuario["Mobile_LoginResponse"]["Mobile_LoginResult"]);
        console.log(usuario["Mobile_LoginResponse"]["strRetorno"]);
        this._navCtrl.setRoot(DashboardPage);
      }else{
        this._alertCtrl.create({
          title: 'Falha no Login',
          subTitle: 'CNPJ, Email,  ou senha incorretos',
          buttons: [
            { text: 'Ok'}
          ]
        }).present();
      }
    },
    //callback de erro
    (err: HttpErrorResponse) =>  {
      this._alertCtrl.create({
        title: 'Falha no Login',
        subTitle: 'Erro na comunicação com Web Service. Entre em contato com o suporte.',
        buttons: [
          { text: 'Ok'}
        ]
      }).present();
    })
  }


 
  eviarSMS(){
    console.log(this.num, this.mensagem);
    this._sms.send(this.num, this.mensagem);
  }
 
}

