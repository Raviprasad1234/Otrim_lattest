import { Component, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-register-comp',
  templateUrl: './register-comp.component.html',
  styleUrls: ['./register-comp.component.css']
})
export class RegisterCompComponent implements OnInit, AfterViewInit {

  showpassword = false

  registerData: FormGroup
  @Output() outputEmit: EventEmitter<any> = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder,
    private router : Router,
    private service: LoginServiceService, private spinner: NgxSpinnerService) {
    this.registerData = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    $('[data-toggle="tooltip"]').tooltip()
  }

  showhidePassword(inp) {
    this.showpassword = inp
  }

  valid_username(str): boolean {
    var reg = /^[a-zA-Z0-9\s]*$/;

    if(str.indexOf(' ') >= 0){
      return false
    }

    if (str.length >= 2 && str.length <= 25) {
      return reg.test(str)
    } else {
      return false
    }

  }

  valid_email(str): boolean {



    var regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(str.indexOf(' ') >= 0){

      console.log(str);
      return false
    }

debugger;
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
    var reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,12})");
    // var reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;
    if(str.indexOf(' ') >= 0){
      return false
    }

    if (str.length >= 6 && str.length <= 12) {
      return reg.test(str)
    } else {
      return false
    }

  }    

  registerUser() {
    if (this.registerData.valid) {
      if (!this.valid_username(this.registerData.value.username)) {
        Swal.fire('Please Enter Valid UserName', '', 'warning')
      } else if (!this.valid_email(this.registerData.value.email)) {
        Swal.fire('Please Enter Valid email id', '', 'warning')
      } else if (!this.valid_password(this.registerData.value.password)) {
        Swal.fire('Please Enter Valid Password', '', 'warning')
      } else {
        console.log('registered user data', this.registerData.value)
        this.spinner.show()
        this.service.registerUser(this.registerData.value).subscribe((dt: any) => {
          this.spinner.hide()
          if (dt['message'] == 'ok') {
            Swal.fire(dt['data'], '', 'success')
          } else {
            Swal.fire(dt['data'], '', 'warning')
          }
          if (dt['message'] == 'ok') {
            this.outputEmit.emit({ message: 'register_successful', data: '' });
            this.router.navigateByUrl('/login');
          }
        }, (error) => {
          this.router.navigateByUrl('/');
          this.spinner.hide()
          console.log(error)
          Swal.fire(error, '', 'error')
        })
      }
    } else {
      Swal.fire('Please enter mandatory fields', '', 'warning')
    }
  }


  
  gobacktohome(){
    // this.router.navigateByUrl('/');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  gotoLoginHere(){
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    })
    
  }


  // signup' , component : RegisterCompComponent}, 
  // {path: 'forgotpassword' , component: ForgetPasswordComponent},
  // {

}
