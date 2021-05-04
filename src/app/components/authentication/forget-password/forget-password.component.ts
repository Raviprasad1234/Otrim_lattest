import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GofoundersService } from 'src/app/services/gofounders/gofounders.service';
import { LoginServiceService } from 'src/app/services/login/login-service.service';

import Swal from 'sweetalert2'

declare var $: any;

interface rsp {
  message: string,
  data: any;
}
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  showpassword = false

  mail_enable = true
  otp_enable = false
  pass_enable = false

  fg_email: string;
  otp: number;
  fg_pass: string;

  @Output() outputEmit: EventEmitter<any> = new EventEmitter<any>();
  constructor(private service: GofoundersService, 
    private router : Router,
    private spinner: NgxSpinnerService,
     private lservice: LoginServiceService) { }

  ngOnInit(): void {
  }

  showhidePassword(inp){
    this.showpassword = inp
  }

  valid_email(str): boolean {
    var regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (!regularExpression.test(str)) {
      return false
    }
    else {
      return true;
    }
  }
  onDragStart(f){
    // console.log(f)
    event.preventDefault();
  }
  valid_password(str): boolean {

    // var reg = /^[a-zA-Z0-9]*$/;

    // var reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;

    var reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,12})");

    if(str.indexOf(' ') >= 0){
      return false
    }
  
    if (str.length >= 6 && str.length <= 12) {
      return reg.test(str)
    } else {
      return false
    }

  }

  resetCond() {
    this.mail_enable = false
    this.otp_enable = false
    this.pass_enable = false
  }

  resetData(){
    this.fg_email = ''
    this.otp = null
    this.fg_pass = ''
  }


  forgotpassword_header = true;

  createpassword_header = false;

  verify_mail() {

    
  this.forgotpassword_header = true;
  this.createpassword_header = false;


    if (!this.valid_email(this.fg_email)) {
      Swal.fire('Please Enter Valid email id', '', 'warning')
    }else {
      this.spinner.show()
      this.lservice.sendEmail(this.fg_email).subscribe((dt: rsp) => {
        this.spinner.hide()
        console.log("dataFromDB-->", dt)
        if (dt['message'] == 'ok') {
          Swal.fire(dt['data'], '', 'success')
          this.resetCond()
          this.otp_enable = true
          this.forgotpassword_header = true;
          this.createpassword_header = false;
        
        } else {
          Swal.fire(dt['data'], '', 'warning')
        }
      }, (error) => {
        this.spinner.hide()
        Swal.fire(error.error.message, '', 'warning')
        console.log(error)
      })
    }
  }

  verify_otp() {
    var rg = /^\d+$/
    if (!this.otp.toString()) {
      Swal.fire('Please Enter OTP', '', 'warning')
    }else if(this.otp.toString().length != 4 ){
      Swal.fire('Wrong OTP', '', 'warning')
    }else if(!rg.test(this.otp.toString())){
      Swal.fire('Wrong OTP', '', 'warning')
    }else {
      this.spinner.show()
      this.lservice.validateOtp(this.otp, this.fg_email).subscribe((dt: rsp) => {
        this.spinner.hide()
        console.log("dataFromDB-->", dt)
        if (dt['message'] == 'ok') {
          Swal.fire(dt['data'], '', 'success')
          this.resetCond()
          this.pass_enable = true;
          this.forgotpassword_header = false;
          this.createpassword_header = true;
     
        } else {
          Swal.fire(dt['data'], '', 'warning')
        }
      }, (error) => {
        this.spinner.hide()
        Swal.fire(error.error.message, '', 'warning')
        console.log(error)
      })
    }
  }

  sub_password() {
    if (!this.fg_pass) {
      Swal.fire('Please Enter Password', '', 'warning')
    }else if(!this.valid_password(this.fg_pass)){
      Swal.fire('Please Enter Valid Password', '', 'warning')
    } else {
      this.lservice.resetPassword({ email: this.fg_email, password: this.fg_pass }).subscribe((dt: rsp) => {
        this.spinner.hide()
        console.log("dataFromDB-->" + JSON.stringify(dt))
        if (dt['message'] == 'ok') {
          Swal.fire(dt['data'], '', 'success');
          this.router.navigateByUrl('/login');
        } else {
          Swal.fire(dt['data'], '', 'warning')
        }
        if (dt.message == 'ok') {
          this.outputEmit.emit({ 'message': 'forget_pass_success', 'data': [] });
          this.router.navigateByUrl('/login');
        }
      }, (error) => {
        this.spinner.hide()
        console.log(error)
      })
    }
  }

  back_mail() {
    this.fg_pass = ''
    this.resetCond()
    this.resetData()
    this.mail_enable = true
  }

  back_otp() {
    this.resetCond()
    this.resetData()
    this.otp_enable = true
  }


  gobacktohome(){
    // this.router.navigateByUrl('/');

    this.router.navigate(['/']).then(() => {
      window.location.reload();
    })
}


}
