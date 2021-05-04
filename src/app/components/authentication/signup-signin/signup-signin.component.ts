
// import { Component, OnInit, EventEmitter, Output, ViewEncapsulation, AfterViewInit, ElementRef } from '@angular/core';

import {Component, OnInit, EventEmitter, Output, ViewEncapsulation, AfterViewInit, ElementRef, ViewChild } from '@angular/core'

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GofoundersService } from 'src/app/services/gofounders/gofounders.service';
import { LoginServiceService } from 'src/app/services/login/login-service.service';

import Swal from 'sweetalert2'
import { MustMatch } from './confirm-password';
import { ValidatePassword } from './validate-password';

import { ReCaptcha2Component } from 'ngx-captcha';





declare var $: any;

interface rsp {
  message: string,
  data: any;
}

@Component({
  selector: 'app-signup-signin',
  templateUrl: './signup-signin.component.html',
  styleUrls: ['./signup-signin.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class SignupSigninComponent implements OnInit , AfterViewInit {
 
  openloginpage : boolean = true;
  opensignuppage : boolean = false;
  showpassword = false

  showconfirmpassword = false

  emailid = '';

  loginData: FormGroup;

  registerData: FormGroup;

  registerForm: FormGroup;
    submitted = false;


    protected aFormGroup: FormGroup;
    @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
     @ViewChild('langInput') langInput: ElementRef;
   
     public captchaIsLoaded = false;
     public captchaSuccess = false;
     public captchaIsExpired = false;
     public captchaResponse?: string;
   
     public theme: 'light' | 'dark' = 'light';
     public size: 'compact' | 'normal' = 'normal';
     public lang = 'en';
     public type: 'image' | 'audio';
   


  @Output() outputEmit: EventEmitter<any> = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder,
     private service: LoginServiceService,
     private router: Router,
     private route: ActivatedRoute,
      private spinner: NgxSpinnerService) {
    this.loginData = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });



    this.registerData = this.formBuilder.group({
      signupusername: ['', Validators.required],
      email: ['', Validators.required],
      signuppassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    } ,
    {
      validator: MustMatch('signuppassword', 'confirmPassword')
  });


    var id = this.route.snapshot['_routerState'].url
   
    console.log(id);

    if(id == '/login'){
       
    } else{
      var afterQuestionmark = id.substr(id.indexOf('email=') + 6);
      this.emailid = afterQuestionmark;   
      console.log(this.emailid , "this.emailid");
      //  this.emailverifyaftermailedMethod();
    }
  }

  ngOnInit(): void {
    this.openPageforLogin()
    this.registerForm = this.formBuilder.group({
      signupusername: ['', Validators.required],
       email: ['', [Validators.required, Validators.email]],
       signuppassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
  //     acceptTerms: [false, Validators.requiredTrue]
   }, {
       validator: MustMatch('signuppassword', 'confirmPassword')
   });


   this.aFormGroup = this.formBuilder.group({
    recaptcha: ['', Validators.required]
  });

  }


  get f() { return this.registerForm.controls; }


  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirm_password').value) {
        return {invalid: true};
    }
}



handleSuccess(data) {
  console.log(data);
}


  ngAfterViewInit(){
    $('[data-toggle="tooltip"]').tooltip()
  }



  showhidePassword(inp) {
    console.log(inp)
    this.showpassword = inp
  }

  showhideConfirmPassword(inp) {
    console.log(inp)
    this.showconfirmpassword = inp
  }



  onDragStart(f){
    // console.log(f)
    event.preventDefault();
  }
 
  forgetPassword() {
    // this.outputEmit.emit({ message: 'forget_password', data: [] })
      this.router.navigateByUrl('forgotpassword');
      // window.location.reload();
 
  }


  openSignupMethod(){
    this.openloginpage  = false;
    this.opensignuppage = true;
    // window.location.reload();
    this.submitted = false;

  }

  openloginMethod(){
    this.openloginpage  = true;
    this.opensignuppage = false;
    // window.location.reload();
    this.submitted = false;

  }

  openPageforLogin(){
    var formval= localStorage.getItem('openmodal');
    console.log(formval);
    if(formval=="signin"){
      this.openloginpage  = true;
      this.opensignuppage = false;
      // window.location.reload();
      this.submitted = false;
   }else{
    this.openloginpage  = false;
    this.opensignuppage = true;
    // window.location.reload();
    this.submitted = false;
   }
 
   }
  loginUser() { 

    console.log(this.loginData.value  , "login data")

    if (this.loginData.valid) {
      console.log('registered user data', this.loginData.value)
      this.spinner.show()
      this.service.loginUser(this.loginData.value).subscribe((dt: any) => {

        this.spinner.hide()
        // Swal.fire(dt['message'], '', 'success')
        console.log(dt , "dt");
        this.outputEmit.emit({ message: 'login_successful', data: dt });
        // this.router.navigateByUrl('/users');
        sessionStorage['token'] = dt['token']
        sessionStorage['username'] = btoa(dt['userName'])
        this.router.navigate(['users']).then(() => {
          window.location.reload();
        })
      }, (error) => {
        this.spinner.hide()
        console.log(error)
        if(error.status == 401){
          Swal.fire('Invalid Credentials', '', 'error')
        }else{
          Swal.fire(error.error.message, '', 'error')
        }
      })
    } else {
      Swal.fire('Invalid Username or Password', '', 'warning')
    }
  }


  
  gobacktohome(){
    // this.router.navigateByUrl('/');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }


  gotoSignupHere(){
    this.router.navigate(['signup']).then(() => {
      window.location.reload();
    })
  }


  emailverifyaftermailedMethod() {
    var emailAddress = this.emailid;
    this.service.getverifymailAftermailclickService(emailAddress).subscribe((dt) => {
      console.log(dt, "res");

      this.spinner.hide()
      if (dt['message'] == 'no') {
        Swal.fire(dt['msg'], '', 'error')
      } else {
        Swal.fire(dt['msg'], '', 'success')
      }
      // this.toster.success('Wait for 2 sec you will navigate to home page..!', '', { timeOut: 2000 });
    }, (error) => {
      console.log(error);
      // this.toster.warning('Server TimeOut..!', '', { timeOut: 2000 });
    });
  }



  // showhidePassword(inp) {
  //   this.showpassword = inp
  // }

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

    if (!regularExpression.test(str)) {
      return false
    }
    else {
      return true;
    }
  }
 
  // onDragStart(f){
  //   // console.log(f)
  //   event.preventDefault();
  // }
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


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }


    console.log(this.registerForm.value , "this.registerData.value");
    this.registerUser();

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}




  onRegisterSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerData.invalid) {
        return;
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerData.value, null, 4));

    console.log(this.registerData.value , "this.registerData.value");
    this.registerUser();

  

  }



  registerUser() {
    if (this.registerForm.valid) {
      if (!this.valid_username(this.registerForm.value.signupusername)) {
        Swal.fire('Please Enter Valid UserName', '', 'warning')
      } else if (!this.valid_email(this.registerForm.value.email)) {
        Swal.fire('Please Enter Valid email id', '', 'warning')
      } else if (!this.valid_password(this.registerForm.value.signuppassword)) {
        Swal.fire('Please Enter Valid Password', '', 'warning')
      } else {
        console.log('registered user data', this.registerForm.value)
        this.spinner.show()
        this.service.registerUser(this.registerForm.value).subscribe((dt: any) => {
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


  
  // gobacktohome(){
  //   // this.router.navigateByUrl('/');
  //   this.router.navigate(['/']).then(() => {
  //     window.location.reload();
  //   });
  // }

  gotoLoginHere(){
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    })
    
  }


  showResponse(event) {
    // this.messageService.add({severity:'info', summary:'Succees', detail: 'User Responded', sticky: true});
}





}