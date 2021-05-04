import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class SendUserInfoInterceptor implements HttpInterceptor {

  private sub:any;

  constructor( private activatedRoute: ActivatedRoute,) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    var url = this.activatedRoute.snapshot['_routerState'].url;
    var parts = url.split('/');
    var user_id = ''
    if(parts.includes('users')){
      user_id = sessionStorage['username']
    }
    if(parts.includes('gofounders') && parts.includes('showAll')){
      user_id = parts.slice(-2)[0]
    }
    else if(parts.includes('gofounders')){
      user_id = parts.slice(-1)[0] 
    }

    let newHeaders = request.headers;
    newHeaders = newHeaders.append("userid", atob(user_id));
    const updatedRequest = request.clone({
      headers: newHeaders
    });
    return next.handle(updatedRequest);
  }
}
