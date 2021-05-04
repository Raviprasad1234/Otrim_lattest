import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BaseHttpClientService } from '../base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  backendUrl = environment.backendUrl

  constructor(private _http: BaseHttpClientService, private router: Router) { }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/'])
  }

  /* login and register apis */

  registerUser(send_data) {
    return this._http.postData(this.backendUrl + 'admin/auth/signup', send_data)
  }

  loginUser(send_data) {
    return this._http.postData(this.backendUrl + 'admin/auth/signin', send_data)
  }

  // verifyEmail(inp_data) {
  //   return this._http.putData(this.backendUrl + 'verifyEmail?email=', inp_data)
  // }

  sendEmail(inp_email) {
    return this._http.getData(this.backendUrl + 'sendEmail?email=' + inp_email)
  }

  validateOtp(otpnum: number, email: string) {
    return this._http.getData(this.backendUrl + 'validateOtp?otpnum=' + otpnum + '&email=' + email)
  }

  resetPassword(send_data) {
    return this._http.putData(this.backendUrl + 'admin/auth/resetPassword', send_data)
  }


  getverifymailAftermailclickService(emailAddress){
    // return this.basehttp.postData(this.CatUrl + '/ocademy/user/verifyEmailOfRegisteredUsers/' + emailAddress ,{})  
    return this._http.getData(this.backendUrl + 'verifyEmailOfRegisteredUsers?email='+ emailAddress);
 
  }

  updateProfile(obj){
    // return this.basehttp.postData(this.CatUrl + '/ocademy/user/verifyEmailOfRegisteredUsers/' + emailAddress ,{})  
    return this._http.postData(this.backendUrl + 'updateProfile',obj);
 
  }


  // https://stagingapi01.onpassive.com/verifyEmailOfRegisteredUsers?email=amF5YXJhbUBvbnBhc3NpdmUuY29t

  /* login and register apis */
}
