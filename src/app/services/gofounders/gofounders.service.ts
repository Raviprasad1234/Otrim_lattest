import { BaseHttpClientService } from '../base-http-client.service';
import {environment} from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GofoundersService {

  backendUrl = environment.backendUrl

  constructor(private _http: BaseHttpClientService) { }
  ser_insert(obj) {
    return this._http.postData(this.backendUrl+'insertURL', obj)
  }

  ser_insertlimk(obj) {
    return this._http.postData(this.backendUrl+'insertCustomizedURL', obj)
  }

  ser_getrows() {
    return this._http.getData(this.backendUrl+'getDataByUserId')
  }

  ser_getAllrows() {
    return this._http.getData(this.backendUrl+'getTrimUrlData')
  }

  ser_update(obj) {
    return this._http.postData(this.backendUrl+'updateTrimUrl', obj)
  }

  ser_delete(obj) {
    return this._http.postData(this.backendUrl+'deleteURL', obj)
  }


  getTrack(input) {
    return this._http.getData(this.backendUrl+'findTrackDetailsByIdTrimUrl?trimurl=' + input)
  }

  getdataByPno(userid, pageno){
    return this._http.getData(this.backendUrl+'getTrimUrlDataServerSide?userid='+userid+'&pageno=' + pageno)
  }


  getpaginationforGoFounderService(userid, pageno){
    return this._http.getData(this.backendUrl+'getTrimUrlDataServerSide?userid='+userid+'&pageno=' + pageno)
  }



  // localhost:8088/getTrimUrlDataServerSide?userid=saba&pageno=0

  // /searchAliasName?userid=dinesh&aliasname=onpa&pageno=0

  getTrackDataServerSide(userid, trimurl, pageno){
    return this._http.getData(this.backendUrl+'getTrackDataServerSide?userid='+userid+'&trimurl=' + trimurl+'&pageno=' + pageno)
  }

  putAliasbyUser(send_data){
    return this._http.postData(this.backendUrl+'addAlias', send_data)
  }

  getAllCharts(periodType, fromDate, toDate){
    return this._http.getData(this.backendUrl+'charts?periodType='+periodType+'&fromDate=' + fromDate+'&toDate=' + toDate)
  }


  getcontactusService(contactparams){
    return this._http.postData(this.backendUrl+'insertContactUsInfo', contactparams)
  }


  getSearchAliasService(userName, aliasname, pno){
    return this._http.getData(this.backendUrl+'searchAliasName?userid='+userName+'&aliasname=' + aliasname+'&pageno=' + pno)
  }


  // subscription mail

  // mailto:localhost:8080/subscribemail/saba.tarannum@onpassive.com

//   getSubscriptionService(subscribeMail){
//     return this._http.postData(this.backendUrl+'subscribeMail', subscribeMail)
//  }


getSubscriptionService(subscribeMail){
  return this._http.postData(this.backendUrl+'subscribeMail', subscribeMail)
}

} 
