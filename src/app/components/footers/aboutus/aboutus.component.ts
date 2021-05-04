import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scroll(0,0);
  }

  refreshPage(){
    var homeLocationpage = sessionStorage.getItem("homeLoc");
    window.location.href = homeLocationpage;
   }
}
