import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/Usuario';
import * as xml2js from "xml2js";
import { Platform } from 'ionic-angular';

@Injectable()
export class SmsServiceProvider {

  public headers : any;
  base

  constructor(public http: HttpClient, private _platform: Platform) {
    
    this.headers = {
      responseType: "text",
      headers: new HttpHeaders()/*
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Headers', 'Content-Type')
        .append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
        .append('Access-Control-Allow-Credentials', 'true')
        .append('Content-Type', 'text/xml; charset=utf-8')*/
        .append('Access-Control-Allow-Origin' , '*')
        .append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
        .append('Accept','text/xml')
        .append('content-type','text/xml')
    };
    
  }



  get(){
    return this.http.get('https://randomuser.me/api/?format=xml', this.headers)
  }


  testLoginpost(){
    let input = '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<soap:Body>' +
        '<Mobile_Login xmlns="http://eficatus.com.br/e-fica">' +
          '<CNPJ>81.760.878/0001-27</CNPJ>' +
          '<Usuario>suporte</Usuario>' +
          '<Senha>suporte@2017</Senha>' +
          '<srChaveSeguranca>MFF_Mobile</srChaveSeguranca>' +
          '<strRetorno></strRetorno>' +
        '</Mobile_Login>' +
      '</soap:Body>' +
    '</soap:Envelope>';
    
    return this.http.post('http://eficatus.com.br/WebApp/ws/e-fica.asmx?wsdl', input, this.headers)
  }

  login(cnpj, senha, usuario){
    let input = '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<soap:Body>' +
        '<Mobile_Login xmlns="http://eficatus.com.br/e-fica">' +
          '<CNPJ>'+ cnpj + '</CNPJ>' +
          '<Usuario>'+ usuario +'</Usuario>' +
          '<Senha>'+ senha +'</Senha>' +
          '<srChaveSeguranca>MFF_Mobile</srChaveSeguranca>' +
          '<strRetorno></strRetorno>' +
        '</Mobile_Login>' +
      '</soap:Body>' +
    '</soap:Envelope>';

    return this.http.post('http://eficatus.com.br/site/ws/e-fica.asmx?wsdl', input, this.headers)
  }


convertToJson(data: any){

  let res;

  // setting the explicitArray option prevents an array structure
  xml2js.parseString(data, { explicitArray: false }, (error, result) => {
    
    if (error) {
      throw new Error(error);
    } else {
      
      res = result["soap:Envelope"]["soap:Body"];
    }

  });

  return res;

}



}
