import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GofoundersService } from 'src/app/services/gofounders/gofounders.service';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2'
import { ForgetPasswordComponent } from '../../authentication/forget-password/forget-password.component';
import { LoginCompComponent } from '../../authentication/login-comp/login-comp.component';
import { RegisterCompComponent } from '../../authentication/register-comp/register-comp.component';
import { CommonHeaderComponent } from '../../common-components/common-header/common-header.component';

declare var $: any;

interface rsp {
  message: string,
  data: any;
}
@Component({
  selector: 'app-common-home',
  templateUrl: './common-home.component.html',
  styleUrls: ['./common-home.component.css']
})
export class CommonHomeComponent implements OnInit {

  inp_url = ''
  rowdata = []
  backendUrl: string = environment.backendUrl;

  self = this;

  @ViewChild('cmnheader', {static:true}) cmnheader:CommonHeaderComponent;

  constructor(private service: GofoundersService, private route: ActivatedRoute, private router: Router, private titleService: Title, private spinner: NgxSpinnerService) { 

    this.titleService.setTitle('Custom URL Shortener by ONPASSIVE | O-Trim')

  }

  ngOnInit(): void {
  }

  chk_url_ext(url) {
    var ext = url.split(/[#?]/)[0].split('.').pop().trim();
    if (['msi', 'exe'].includes(ext.substr(ext.length - 3))) {
      return true
    } else {
      return false
    }
  }

  is_url(str): boolean {
    var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (!str.includes('.') || str.includes(',') || str.includes('EN-OTP') || !regexp.test(str) || this.chk_url_ext(str)) {
      return false
    }
    else {
      return true;
    }
  }

  submit() {

    console.log( sessionStorage['token'] , "token");

    // Swal.fire('Warning : Login Required', '', 'warning');
    // this.cmnheader.openLGFComp('l');
    localStorage.setItem('openmodal','signin')
    this.router.navigateByUrl('/login');
    return

    console.log(this.inp_url , "inp_url");

    if (this.inp_url == '' || this.inp_url === null || this.inp_url === undefined) {
      Swal.fire('Please enter an url !', '', 'error')

    } else if (!this.is_url(this.inp_url)) {
      Swal.fire('Please Enter a Valid URL', '', 'error')

    }  

    //   else if(){


    // } 
    else {

        var obj = { inp_url: this.inp_url }
        console.log(obj, this.inp_url)
        this.spinner.show()
        this.service.ser_insert(obj).subscribe((dt: rsp) => {
          this.spinner.hide()
          console.log(dt)
          this.inp_url = ''
          if (dt.message == 'no') {
            Swal.fire(dt.data, '', 'error')
          } else {
            Swal.fire(dt.data, '', 'success')
          }
          if (dt['inserted_row']) {
            this.rowdata = [dt['inserted_row']]
          }
        }, (error) => {
          this.spinner.hide()
          console.log(error)
        })



    }

  }

}
