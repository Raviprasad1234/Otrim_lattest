import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import { GofoundersService } from 'src/app/services/gofounders/gofounders.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2';

HC_exporting(Highcharts);
HC_exportData(Highcharts);

@Component({
  selector: 'app-otrim-user-charts',
  templateUrl: './otrim-user-charts.component.html',
  styleUrls: ['./otrim-user-charts.component.css']
})
export class OtrimUserChartsComponent implements OnInit {

  userid: string = '';
  dec_userid: string = ''
  private sub: any;

  selectedChartPer: any = 'today'
  fromDate = new Date();
  toDate = new Date();
  maxDate = this.fromDate;
  maxToDate = new Date();
  dateFormat: any;
  toDateFilter: any;

  constructor(private dateAdapter: DateAdapter<Date>, private gservice: GofoundersService, private spinner: NgxSpinnerService, private route: ActivatedRoute) {

    if (this.route && this.route.params) {
      this.sub = this.route.params.subscribe(params => {
        console.log(params)
        if (params['userid']) {
          this.userid = params['userid'];
          this.userid = this.userid.split('==')[0]
          this.dec_userid = atob(this.userid)
        } else if (sessionStorage['username']) {
          this.userid = sessionStorage['username']
          this.dec_userid = atob(this.userid)
        }
      }, (error) => console.log(error))
    } else if (sessionStorage['username']) {
      this.userid = sessionStorage['username']
      this.dec_userid = atob(this.userid)
    }

    this.dateAdapter.setLocale('en-GB');

  }

  ngOnInit(): void {
    this.onLoad()
  }

  onLoad() {

    this.resetAllDates()

  }

  periodChange(evnt) {
    this.selectedChartPer = evnt
    this.resetAllDates()
  }

  resetAllDates() {
    this.dateFormat = new DatePipe('en-GB');
    this.fromDate = new Date();
    this.toDate = new Date()
    this.maxDate = this.fromDate
    this.maxToDate = new Date()
    this.toDateFilter = '';
    if (this.toDate) {
      this.setToDateFilter(this.toDate.getDate(), this.toDate.getMonth(), this.toDate.getDay())
    }
  }

  incLeadZeroDate(MyDate) {
    var ret = ('0' + MyDate.getDate()).slice(-2) + '/' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/' + MyDate.getFullYear();
    return ret
  }

  fromDateChange(evnt) {
    console.log(evnt.value)
    this.toDate = new Date(evnt.value.toLocaleDateString())
    var tmonth = evnt.value.getMonth()
    var tdate = evnt.value.getDate()
    var tday = evnt.value.getDay()
    this.setToDateFilter(tdate, tmonth, tday)
  }

  setToDateFilter(tdate, tmonth, tday) {
    console.log(this.selectedChartPer, tdate, tmonth, tday)
    if (this.selectedChartPer == 'months') {
      this.toDateFilter = (date: Date) => date.getDate() == tdate;
    } else if (this.selectedChartPer == 'years') {
      this.toDateFilter = (date: Date) => date.getDate() == tdate && date.getMonth() == tmonth;
    } else if (this.selectedChartPer == 'weeks') {
      this.toDateFilter = (date: Date) => date.getDay() == tday;
    }
  }

  filter_charts() {

    if (!this.fromDate) {
      Swal.fire('Please select From date', '', 'warning')
    } else if (!this.toDate) {
      Swal.fire('Please select To date', '', 'warning')
    } else {
      var fdate = this.incLeadZeroDate(this.fromDate)
      var tdate = this.incLeadZeroDate(this.toDate)
      if (this.selectedChartPer == 'today') {
        var fdate = this.incLeadZeroDate(new Date())
        var tdate = this.incLeadZeroDate(new Date())
      }
      this.resetChartsData()
      this.spinner.show()
      this.gservice.getAllCharts(this.selectedChartPer, fdate, tdate).subscribe((dt: any) => {
        this.spinner.hide()
        dt.forEach(elm => {
          if (elm['name'] == 'browsers') {
            this.browsersChart(elm)
          } else if (elm['name'] == 'total_clicks') {
            this.totalClicksChart(elm)
          } else if (elm['name'] == 'city_count') {
            this.cityCounts(elm)
          } else if (elm['name'] == 'ip_address') {
            this.ipAddressChart(elm)
          }
        });

      }, (error) => {
        Swal.fire(error.error.message, '', 'error')
        this.spinner.hide()
        console.log(error)
      })
    }
  }

  resetChartsData() {
    this.browsersChart({ 'name': 'browsers', 'series': [] })
    this.totalClicksChart({ 'name': 'total_clicks', 'series': [] })
    this.cityCounts({ 'name': 'city_count', 'series': [] })
    this.ipAddressChart({ 'name': 'ip_address', 'series': [] })
  }

  totalClicksChart(inp_data) {
    Highcharts.chart('chart_1', {
      data: {
        table: 'datatable'
      },
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: inp_data['categories'],
        labels: {
          rotation: 90
        }
      },
      yAxis: {
        allowDecimals: false,
        title: {
          text: 'Clicks'
        }
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + '</b><br/>' +
            this.point.y + ' ' + 'Clicks';
        }
      },
      exporting: {
        enabled: false
      },
      series: inp_data['series']
    });
  }

  browsersChart(inp_data) {
    Highcharts.chart('chart_2', {
      chart: {
        type: 'line'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: inp_data['categories'],
        labels: {
          rotation: 90
        }
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: true
        }
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + '</b><br/>' +
            this.point.y + ' ' + 'times hitten';
        }
      },
      exporting: {
        enabled: false
      },
      series: inp_data['series']
    });
    // Highcharts.chart({
    //   chart: {
    //     renderTo: 'chart_1',
    //     type: 'spline',
    //     inverted: true
    //   },
    //   title: {
    //     text: 'Atmosphere Temperature by Altitude'
    //   },
    //   subtitle: {
    //     text: 'According to the Standard Atmosphere Model'
    //   },
    //   xAxis: {
    //     reversed: false,
    //     title: {
    //       text: 'Clicks'
    //     },
    //     maxPadding: 0.05,
    //     showLastLabel: true
    //   },
    //   yAxis: {
    //     categories :inp_data['categories'],
    //   },
    //   legend: {
    //     enabled: false
    //   },
    //   tooltip: {
    //     headerFormat: '<b>{series.name}</b><br/>',
    //     pointFormat: '{point.x} km: {point.y}°C'
    //   },
    //   plotOptions: {
    //     spline: {
    //       marker: {
    //         enabled: false
    //       }
    //     }
    //   },
    //   series: [{
    //     name: 'Temperature',
    //     type:'spline',
    //     data: inp_data['series']
    //   }]
    // });
  }

  ipAddressChart(inp_data) {
    Highcharts.chart('chart_3', {
      data: {
        table: 'datatable'
      },
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: inp_data['categories'],
        labels: {
          rotation: 90
        }
      },
      yAxis: {
        allowDecimals: false,
        title: {
          text: 'Count'
        }
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + '</b><br/>' +
            'IP Address : ' + inp_data['categories'][this.point.index] + '<br/>' +
            'hits ' + this.point.y + ' times';
        }
      },
      exporting: {
        enabled: false
      },
      series: inp_data['series'],
      legend: {
        enabled: true
      }
    });
  }

  cityCounts(inp_data) {
    Highcharts.chart({
      chart: {
        renderTo: 'chart_4',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Total Visitors',
        style: {
          fontSize: '14px'
        },
        align: 'left',
        x: 70
      },
      subtitle: {
        text: inp_data['total_visitors'],
        style: {
          color: '#000',
          fontWeight: 'bold',
          fontSize: '23px'
        },
        align: 'left',
        x: 70
      },
      tooltip: {
        pointFormat: '({point.percentage:.1f}%)'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      exporting: {
        enabled: false
      },
      series: [inp_data['series']]
    });

  }

}
