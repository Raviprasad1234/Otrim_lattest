import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var jQuery:any;

@Component({
  selector: 'app-otrim-analytics-slider',
  templateUrl: './otrim-analytics-slider.component.html',
  styleUrls: ['./otrim-analytics-slider.component.css']
})
export class OtrimAnalyticsSliderComponent implements OnInit, AfterViewInit {

  @ViewChild('analyticsSlider', {static: false}) analyticsSlider: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    jQuery(this.analyticsSlider.nativeElement).owlCarousel({
      items:1,
      loop:true,
      nav: true,
      autoplay:true,
      autoplayTimeout:4000,
      autoplayHoverPause:true,
      smartSpeed:750
    });
  }

}
