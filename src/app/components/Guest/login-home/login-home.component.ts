// import { Component, OnInit } from '@angular/core';



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
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.css']
})
export class LoginHomeComponent implements OnInit {

  customized_pop_data = { plink: '', clink: '' }
  inp_url = ''
  editedUrlData = { trimurl: '', url: '' , newtrimurl: ''}
  selectedTrimUrl = ''

  linkedinsharedUrl = '';

  inserted_urls = []
  already_inserted_urls = []

  trim_conf = false

  trackdetails: any;
  trackdetailsCount: any = 0;
  trackViewMore: any = false
  trackedUrl: string = '';
  rowdata = [];

  vmore: boolean = false;

  backendUrl: string = environment.backendUrl;

  userid: string = '';
  dec_userid: string = ''
  obj ={}
  shareOnsocial=false;

  shareDataOfURl : any;

  // allrowdata: pagenation = {
  //   start: 0,
  //   prev: 0,
  //   current: 0,
  //   next: 0,
  //   last: 0,
  //   rmpages: [],
  //   data: [],
  // };


  allrowdata: any = {};


  private sub: any;
  gpno: string = '';

  public myAngularxQrCode: any = null;


  constructor(private service: GofoundersService, private route: ActivatedRoute, private router: Router, private titleService: Title, private spinner: NgxSpinnerService) {
    this.titleService.setTitle('O-Trim - Shorten, Share and Track URLs for Better Campaign Management');


  }

  ngOnInit() {

    // this.openHappyModel()

    this.myAngularxQrCode = 'Your QR code data string';

    console.log(this.route)
    if (sessionStorage['username']) {
      this.userid = sessionStorage['username']
      this.dec_userid = atob(this.userid)
    }
    // this.rowget()

    if (this.route && this.route.params) {
      this.sub = this.route.params.subscribe(params => {
        console.log(params)
        if (params['pageno']) {
          this.gpno = params['pageno'];
          this.getdataByPno(this.gpno)
        } else {
          this.getdataByPno(0)
        }

      }, (error) => console.log(error))
    }


  }

  verifyEmailRedirect(){
    this.inserted_urls = []
    this.already_inserted_urls = []
    if (this.inp_url == '' || this.inp_url === null || this.inp_url === undefined) {
      Swal.fire('Please enter an url !', '', 'error')

    } else if (!this.is_url(this.inp_url)) {
      Swal.fire('Please Enter a Valid URL', '', 'error')

    } else {
      // this.trim_conf = true;
      // document.getElementById('#trackUrlModall').click()
      this.showCustomUrlPopphide()
    }
  }
  showCustomUrlPopphide() {
    $('#trackUrlModall').modal('show')
  }
  closeCustomUrlPopp() {
    $('#trackUrlModall').modal('hide')
  }

  alreadysorten() {
    $('#sortenURL').modal('show')
  }
  closealreadysorten() {
    $('#sortenURL').modal('hide')
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

  customizedlink() {

    var  customUrlRegex = /^(?=.*[a-zA-Z])([a-zA-Z0-9_\s]+)$/;
    if(customUrlRegex.test(this.customized_pop_data.clink) == false){
      Swal.fire('Custom part must be Alphanumeric ', '', 'error');
      return;
    }


    if (this.customized_pop_data.plink == '' || this.customized_pop_data.plink == null || this.customized_pop_data.plink == undefined) {
      $('#urlcustom').val('');
      $('#urlcustom').attr('placeholder', 'Please put the url .');
      $('#urlcustom').addClass('redmessage');
    } else if (this.customized_pop_data.clink == '' || this.customized_pop_data.clink == null || this.customized_pop_data.clink == undefined) {
      $('#customapart').val('');
      $('#customapart').attr('placeholder', 'Please put the custom part.');
      $('#customapart').addClass('redmessage');

    } else if (this.customized_pop_data.clink.length <=2) {
      Swal.fire('Url must be atleast 3 characters !', '', 'error')

    } else if (!this.is_url(this.customized_pop_data.plink)) {
      Swal.fire('Please Enter a Valid URL', '', 'error')

    } else if (this.checkSpclChars(this.customized_pop_data.clink)) {
      Swal.fire('Custom part must be Alphanumeric', '', 'error')
    } else {


      var obj1 = { id: this.customized_pop_data.clink, url: this.customized_pop_data.plink }
      this.spinner.show()

      this.service.ser_insertlimk(obj1).subscribe((dt: rsp) => {

        this.spinner.hide()
        console.log(dt)
        if (dt.message == 'no') {
          Swal.fire(dt.data, '', 'error')
        } else {
          Swal.fire(dt.data, '', 'success')
          this.customized_pop_data = { plink: '', clink: '' }
          document.getElementById('myModalcustom').click()
        }
        // this.rowget()
        this.getdataByPno(0)

      }, (error) => {
        this.spinner.hide()
        console.log(error)
      })
    }
  }

  resetCustomUrlPop() {
    this.customized_pop_data = { plink: '', clink: '' }
    $('#urlcustom').attr('placeholder', 'Paste Your Link Here');
    $('#customapart').attr('placeholder', 'create your link');
  }

  closeCustomUrlPop() {
    $('#myModalcustom').modal('hide')
  }



  openshareDiv = false;
existId:any = 0;
  opensharerow_id : any;



  fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }





  openShareUrl(inp_data?){
    this.shareOnsocial=true;
    this.existId = this.obj['rowId'];
    // console.log(inp_data);
    // inp_data['open_share_btn'] = !inp_data['open_share_btn'] 

    // this.openshareDiv = !this.openshareDiv;

    this.opensharerow_id = this.obj['rowId'];

    // console.log(this.opensharerow_id, "opensharerow_id");

    this.selectedTrimUrl = this.backendUrl+this.obj['trimUrl'];
console.log(this.selectedTrimUrl,'80808080')
     this.linkedinsharedUrl = encodeURIComponent(this.backendUrl+this.obj['trimUrl']);
    
  }

  rowget() {
    this.spinner.show()
    this.service.ser_getrows().subscribe((dt: any) => {
      this.spinner.hide()
      if (dt) {
        this.rowdata = dt.data
        console.log(this.rowdata , "rowdata");
        this.vmore = dt.viewMore || false
      }
    }, (error) => {
      this.spinner.hide()
      console.log(error)
    })
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
        // this.rowget()
        // this.rowget()
        this.getdataByPno(0)

      }, (error) => {
        this.spinner.hide()
        console.log(error)
      })
    }
  }
  // openHappyModel
  delete(inp_data?) {
// console.log(this.obj)
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'Once deleted, you will not be able to recover this url!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Ok',
//       cancelButtonText: 'Cancel'
//     }).then((result) => {
//       if (result.value) {
    

//       }
//     }, (error) => console.log(error))

    // console.log(x.trimurl)
    var obj = { trimurl: this.obj['trimUrl'] }
    this.spinner.show()
    this.service.ser_delete(obj).subscribe((dt: rsp) => {
      console.log(dt)
      this.spinner.hide()
      if (dt.message == 'no') {
        // Swal.fire(dt.data, '', 'error')
      } else {
        // Swal.fire(dt.data, '', 'success')
        this.closeDeleteurlModel();
        $('#myModall').modal('show')

      }
      this.getdataByPno(0);

    }, (error) => {
      this.spinner.hide()
      console.log(error)
    })
  }
  closeHapp(){
    $('#myModall').modal('hide')
  }
  submit(inp) {

    if (this.inp_url == '' || this.inp_url === null || this.inp_url === undefined) {
      Swal.fire('Please enter an url !', '', 'error')

    } else if (!this.is_url(this.inp_url)) {
      Swal.fire('Please Enter a Valid URL', '', 'error')

    } else {

      this.reset_csDiv()

      var obj = { inp_url: this.inp_url , enabled:inp}
      console.log(obj, this.inp_url)
      this.spinner.show()
      this.service.ser_insert(obj).subscribe((dt: rsp) => {
        // this.trim_conf = false
        this.closeCustomUrlPopp()
        this.spinner.hide()
        console.log(dt)
        this.inp_url = ''
        if (dt['inserted_row']) {
          this.inserted_urls = [dt['inserted_row']]
        } else if (dt['already_inserted_row']) {
          this.already_inserted_urls = [dt['already_inserted_row']];
          if(this.already_inserted_urls.length){
            this.alreadysorten()
          }
        }
        if (dt.message == 'no') {
          if (dt.data != 'Link already shortened') {
            Swal.fire(dt.data, '', 'error')
          }
        } else {
          Swal.fire(dt.data, '', 'success')
        }
        // this.rowget();
        this.getdataByPno(0)

      }, (error) => {
        this.spinner.hide()
        console.log(error)
      })
    }

  }

  reset_csDiv() {
    this.inserted_urls = []
    this.already_inserted_urls = []
  }
  openEditurlPop(inp_data?) {
  
    this.editedUrlData = { trimurl: this.obj['trimUrl'], url: this.obj['url'], newtrimurl: this.obj['trimUrl']}
    $('#editUrlModal').modal('show')
  }

  closeDeleteurlModel() {
    document.getElementById('deleteurl').click()
  }

  openHappyModel() {
    document.getElementById('successModel').click()
  }

  tracAction(data){
    this.shareDataOfURl = data
    this.obj=data
    console.log(this.obj,'new');
  }
  track(inp?) {
    console.log(this.obj['trimUrl'])
    this.trackedUrl = this.obj['trimUrl']
    this.spinner.show()
    var url=this.obj['trimUrl']
    this.service.getTrack(url).subscribe((dt: any) => {
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
  // trimUrl
  showSocialIcons(){
    this.shareOnsocial=true;
  }
  hideSocialIcons(){
    this.shareOnsocial=false;

  }
  viewMore() {
    /*this.router.navigate(['gofounders', 'showAll',this.userid, 1]).then(() => {
      window.location.reload();
    }); */
    window.location.href = window.location.origin + '/users/showAll/1';
  }

  vTrackMore() {
    this.router.navigate(['trackAll', this.userid, this.trackedUrl, 1]).then(() => {
      window.location.reload();
    });
  }

  addAliasAfterTrim(inp_data) {
    this.addAliasbyUser({ 'trimUrl': inp_data['trimurl'], 'editedAliasName': inp_data['editedAliasName'] })
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
    if (!inp_data['editedAliasName']) {
      Swal.fire('Please Enter Alias Name', '', 'warning')
    } else if (!(this.validateAliasName(inp_data['editedAliasName']))) {
      Swal.fire('Please enter valid Alias name', '', 'warning')
    } else {
      this.spinner.show()
      var send_data = { 'userid': atob(this.userid), 'trimUrl': inp_data['trimUrl'], 'aliasName': inp_data['editedAliasName'] }
      this.service.putAliasbyUser(send_data).subscribe((dt: any) => {
        this.spinner.hide()
        console.log(dt);
        inp_data['edit_alias'] = false;
 
        if (dt['message'] == 'ok') {
          if (this.inserted_urls.length) {
            this.inserted_urls = []
            // this.rowget();
            this.getdataByPno(0)

          } else {
            inp_data['aliasName'] = JSON.parse(JSON.stringify(inp_data['editedAliasName']))
          }
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


  arr=[
    {id:1},
    {id:2},
    {id:3},
    {id:4},
    {id:5},
    {id:6},
    {id:7},
    {id:8},
    {id:9},
    {id:10},
    {id:11},
    {id:12},
    {id:13},
    
    


  ]


  currentpageNum  : any;

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
        this.allrowdata = dt;
        this.currentpageNum = dt['current'];
        console.log(this.allrowdata , " allow Data")
      }
    }, (error) => {
      this.spinner.hide()
      console.log(error)
    })


  }




  navigateByPno(pno) {

    console.log(pno , "pno");
    this.router.navigate(['users', 'showAll', String(pno)]).then(() => {
      window.location.reload();
    });
  }



  
 


  checkAliasNameEvent(event){

    var userNameIs =  this.dec_userid;
    var aliasNameIs =  event.target.value;
    var pno = this.currentpageNum;

    console.log(aliasNameIs , "aliasNameIs")

    if(aliasNameIs == ''){
      this.getdataByPno(pno)
    } else{
    this.service.getSearchAliasService(userNameIs,aliasNameIs , pno).subscribe((data)=>{
      console.log(data, "data--search alias");
      if(data == undefined || data == null || data == ''){
      }else{
        this.allrowdata =  data;
        console.log(this.allrowdata , " allow Data")
      }
    },(error)=>{
      console.log(error);
    })

  }
}



QR_Code_Data : any = "TrimUrl QR code";

shareURcodeUrl(){
  // console.log(data);
  // this.selectedTrimUrl = this.backendUrl+inp_data['trimUrl'];

 var generate_qr_data = this.shareDataOfURl


 console.log(this.backendUrl+generate_qr_data['trimUrl']);

  this.QR_Code_Data =  this.backendUrl+generate_qr_data['trimUrl'];

}



saveAsQRCodeImage(parent) {

  console.log(parent, "parent");

  var parentElement = parent['qrcElement'].nativeElement.querySelector("canvas");
  let downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', 'O-trim.png');
  let canvas = parentElement;
  let dataURL = canvas.toDataURL('image/png');
  let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
  downloadLink.setAttribute('href', url);
  downloadLink.click();

}






}