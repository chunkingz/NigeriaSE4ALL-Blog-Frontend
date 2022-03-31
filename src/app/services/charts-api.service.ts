import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartsApiSec } from './charts-api-sec';

@Injectable({
  providedIn: 'root'
})
export class ChartsApiService {

  private _baseURL = ChartsApiSec._baseURL;
  private _bearerTokenURL = ChartsApiSec._bearerTokenURL;
  private _accessToken!: string;
  private getterOptions = {}

  constructor(private _http: HttpClient) {
    this.checkToken();
  }

  checkToken(){
    let token = localStorage.getItem('token');

    if (Number(token?.trim.length) == 0 || token == null || this.tokenExpired(token)) {
      // token is invalid OR doesnt exist OR token expired
      this.getToken();
    } else {
      // token valid
    }

    this.getterOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    };
    return token;
  }

  private tokenExpired(token: any) {    
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;    
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  

  tokenOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  getToken(){
    return this._http.post(this._bearerTokenURL, ChartsApiSec.params, this.tokenOptions).subscribe( (res:any) => {
      this._accessToken = res.access_token;
      localStorage.setItem('token', this._accessToken);
    })
  }

  getInstalledCapacity(){
    return this._http.get(`${this._baseURL}se4allwebsite/installedcap`, this.getterOptions)
  }

  getPeopleAndCommunitiesConnected(){
    return this._http.get(`${this._baseURL}se4allwebsite/portfolio`, this.getterOptions)
  }

  getDoughnutAnalytics(){
    return this._http.get(`${this._baseURL}se4allwebsite/minigridsbyprogramme`, this.getterOptions)
  }

}
