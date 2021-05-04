// import { Component, OnInit, EventEmitter, Output } from '@angular/core';







import { Component ,OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-login-comp',
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.css']
}) 
export class LoginCompComponent implements OnInit {

  showpassword = false

  emailid = '';

  loginData: FormGroup;
  @Output() outputEmit: EventEmitter<any> = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder,
     private service: LoginServiceService,
     private router: Router,
     private route: ActivatedRoute,
      private spinner: NgxSpinnerService) {
    this.loginData = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });


    var id = this.route.snapshot['_routerState'].url
   
    console.log(id);

    if(id == '/login'){
       
    } else{
      var afterQuestionmark = id.substr(id.indexOf('email=') + 6);
      this.emailid = afterQuestionmark;   
      console.log(this.emailid , "this.emailid");
       this.emailverifyaftermailedMethod();
    }
  }

  ngOnInit(): void {

  }

  showhidePassword(inp) {
    console.log(inp)
    this.showpassword = inp
  }
  onDragStart(f){
    // console.log(f)
    event.preventDefault();
  }
  forgetPassword() {
    // this.outputEmit.emit({ message: 'forget_password', data: [] })
      this.router.navigateByUrl('forgotpassword');
    

  }

  loginUser() { 
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

}
