import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { pagenation } from 'src/app/models/pagenation';
import { GofoundersService } from 'src/app/services/gofounders/gofounders.service';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2'

declare var $: any;

interface rsp {
  message: string,
  data: any;
}

@Component({
  selector: 'app-login-home-viewmore',
  templateUrl: './login-home-viewmore.component.html',
  styleUrls: ['./login-home-viewmore.component.css']
})
export class LoginHomeViewmoreComponent implements OnInit {

  editedUrlData = { trimurl: '', url: '' , newtrimurl: ''}
  selectedTrimUrl = ''

  trackdetails: any;
  trackdetailsCount: any = 0;
  trackViewMore: any = false
  trackedUrl: string = ''
  rowdata = [];

  backendUrl: string = environment.backendUrl;
  domainName: string = window.location.hostname || '';

  userid: string = '';
  dec_userid: string = '';
  gpno: string = '';
  private sub: any;


  allrowdata: pagenation = {
    start: 0,
    prev: 0,
    current: 0,
    next: 0,
    last: 0,
    rmpages: [],
    data: [],
  };

  constructor(private service: GofoundersService, private route: ActivatedRoute, private router: Router, private titleService: Title, private spinner: NgxSpinnerService) {

    this.titleService.setTitle('O-Trim - Shorten, Share and Track URLs for Better Campaign Management')

  }

  ngOnInit() {

    console.log(this.route)
    if (sessionStorage['username']) {
      this.userid = sessionStorage['username']
      this.dec_userid = atob(this.userid)
    }
    if (this.route && this.route.params) {
      this.sub = this.route.params.subscribe(params => {
        console.log(params)
        if (params['pageno']) {
          this.gpno = params['pageno'];
          this.getdataByPno(this.gpno)
        } else {
          this.getdataByPno(1)
        }

      }, (error) => console.log(error))
    }

  }

  getdataByPno(pno) {
    var uid = ''
    try {
      uid = atob(this.userid)
    } catch (e) {
      uid = ''
    }
    this.spinner.show()
    this.service.getdataByPno(uid, pno).subscribe((dt: any) => {
      this.spinner.hide()
      if (dt['data'].length) {
        this.allrowdata = dt
        console.log(this.allrowdata , " allow Data")
      }
    }, (error) => {
      this.spinner.hide()
      console.log(error)
    })


  }

  goBack() {
    this.router.navigate(['users']).then(() => {
      window.location.reload();
    });
  }

  navigateByPno(pno) {
    this.router.navigate(['users', 'showAll', String(pno)]).then(() => {
      window.location.reload();
    });
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

  checkSpclChars(str) {
    if (str) {
      var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      return format.test(str)
    } else {
      return false
    }
  }

  openEditurlPop(inp_data) {
    this.editedUrlData = { trimurl: inp_data['trimUrl'], url: inp_data['url'], newtrimurl: inp_data['trimUrl']}
    $('#editUrlModal').modal('show')
  }

  openshareDiv = false;

  opensharerow_id : any;


  openShareUrl(inp_data){

    inp_data['open_share_btn'] = !inp_data['open_share_btn'] 

    this.openshareDiv = !this.openshareDiv;

    this.opensharerow_id = inp_data['rowId'];


    this.selectedTrimUrl = this.backendUrl+inp_data['trimUrl']
    // $('#shareUrlModal').modal('show')

  
  }

  editUrl() {

    if (this.editedUrlData.url == '' || this.editedUrlData.url === null || this.editedUrlData.url === undefined) {
      Swal.fire('Please enter an url !', '', 'error')

    }else if (this.editedUrlData.newtrimurl == '' || this.editedUrlData.newtrimurl === null || this.editedUrlData.newtrimurl === undefined) {
      Swal.fire('Please enter an url !', '', 'error')
    }else if (this.editedUrlData.newtrimurl.length <= 2  ) {
      Swal.fire('Url must be atleast 3 characters  !', '', 'error')
    } else if (!this.is_url(this.editedUrlData.url)) {
      Swal.fire('Please Enter a Valid URL', '', 'error')
    } else if (this.checkSpclChars(this.editedUrlData.newtrimurl)) {
      Swal.fire('Custom part must be Alphanumeric', '', 'error')

    } else {
      var obj = this.editedUrlData
      this.spinner.show()
      this.service.ser_update(obj).subscribe((dt: any) => {
        this.spinner.hide()
        if (dt.message == 'no') {
          Swal.fire(dt.data, '', 'error')

        } else {
          Swal.fire(dt.data, '', 'success')
        }
        document.getElementById('editUrlModal').click();
        this.getdataByPno(this.gpno)
      }, (error) => {
        this.spinner.hide()
        console.log(error)
      })
    }
  }

  delete(inp_data) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this url!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        var obj = { trimurl: inp_data.trimUrl }
        this.spinner.show()
        this.service.ser_delete(obj).subscribe((dt: rsp) => {
          console.log(dt)
          this.spinner.hide()
          if (dt.message == 'no') {
            Swal.fire(dt.data, '', 'error')

          } else {
            Swal.fire(dt.data, '', 'success')
          }
          this.getdataByPno(this.gpno)
        }, (error) => {
          this.spinner.hide()
          console.log(error)
        })

      }
    }, (error) => console.log(error))

    // console.log(x.trimurl)

  }

  track(inp) {
    this.trackedUrl = inp
    this.spinner.show()
    this.service.getTrack(inp).subscribe((dt: any) => {
      this.spinner.hide()
      console.log(dt)
      this.trackdetailsCount = dt['count'] || 0
      this.trackdetails = dt['data'];
      this.trackViewMore = dt['viewMore']
    }, (error) => {
      this.spinner.hide()
      console.log(error)
    })
  }

  viewMore() {
    this.router.navigate(['gofounders/showAll', this.userid, 1]).then(() => {
      window.location.reload();
    });
  }

  vTrackMore() {
    this.router.navigate(['trackAll', this.userid, this.trackedUrl, 1]).then(() => {
      window.location.reload();
    });
  }

  validateAliasName(str): boolean {

    var reg = /^[a-zA-Z][a-zA-Z0-9\s]*$/;

    if (str.length >= 5 && str.length <= 20) {
      return reg.test(str)
    } else {
      return false
    }

  }

  addAliasbyUser(inp_data) {
    if (inp_data['editedAliasName'] == '') {
      Swal.fire('Please Enter Alias Name', '', 'warning')
    } else if (!(this.validateAliasName(inp_data['editedAliasName']))) {
      Swal.fire('Please enter valid Alias name', '', 'warning')
    } else {
      this.spinner.show()
      var send_data = { 'userid': atob(this.userid), 'trimUrl': inp_data['trimUrl'], 'aliasName': inp_data['editedAliasName'] }
      this.service.putAliasbyUser(send_data).subscribe((dt: any) => {
        this.spinner.hide()
        console.log(dt);
        inp_data['edit_alias'] = false
 
        if (dt['message'] == 'ok') {
          inp_data['aliasName'] = JSON.parse(JSON.stringify(inp_data['editedAliasName']))
          Swal.fire(dt['data'], '', 'success')
        } else {
          Swal.fire(dt['data'], '', 'warning')
        }
      }, (error) => {
        this.spinner.hide()
        console.log(error)
      })
    }
  }

  enableEditAlias(inp_data) {
    inp_data['editedAliasName'] = inp_data['aliasName']
    inp_data['edit_alias'] = true
  }

  diableEditAlias(inp_data) {
    inp_data['edit_alias'] = false
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
