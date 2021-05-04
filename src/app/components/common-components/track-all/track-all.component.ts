import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { pagenation } from 'src/app/models/pagenation';
import { GofoundersService } from 'src/app/services/gofounders/gofounders.service';

@Component({
  selector: 'app-track-all',
  templateUrl: './track-all.component.html',
  styleUrls: ['./track-all.component.css']
})
export class TrackAllComponent implements OnInit {

  userid: string = '';
  dec_userid: string = '';
  trimurl:string = ''
  gpno: string = '';
  private sub: any;

  
  allrowdata: pagenation = { 
    start : 0,
	  prev : 0,
	  current : 0,
	  next : 0,
	  last : 0,
	  rmpages : [],
	  data : [],
  };

  constructor(private service: GofoundersService, private route: ActivatedRoute, private router: Router, private titleService: Title, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    if (this.route && this.route.params) {
      this.sub = this.route.params.subscribe(params => {
        console.log(params)
        if (params['userid'] && params['trackurl'] && params['pageno']) {
          this.userid = params['userid']
          this.dec_userid = atob(this.userid)
          this.trimurl = params['trackurl']
          this.gpno = params['pageno']
          this.gettrackdataByPno(this.gpno)
        }
      }, (error) => console.log(error))
    }

  }

  gettrackdataByPno(pno) {
    var uid = ''
    try{
      uid = atob(this.userid)
    }catch(e){
      uid = ''
    }
    this.spinner.show()
    this.service.getTrackDataServerSide(uid, this.trimurl, pno).subscribe((dt: any) => {
     this.spinner.hide()
     if(dt['data'].length){
      this.allrowdata = dt
     }
    }, (error) => {
      this.spinner.hide()
      console.log(error)
    })
  }

  navigateByPno(pno){
    this.router.navigate(['trackAll', this.userid, this.trimurl, String(pno)]).then(() => {
      window.location.reload();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
