import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-domain-setting',
  templateUrl: './domain-setting.component.html',
  styleUrls: ['./domain-setting.component.css']
})
export class DomainSettingComponent implements OnInit {

  constructor() { }
  userid: string = '';
  dec_userid: string = ''
  ngOnInit(): void {
    if (sessionStorage['username']) {
      this.userid = sessionStorage['username']
      this.dec_userid = atob(this.userid)
    }
  }

}
