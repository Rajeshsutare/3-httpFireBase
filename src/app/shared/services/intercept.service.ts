import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, finalize } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptService implements HttpInterceptor{

  

  constructor(private _loaderservice:LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  this._loaderservice.loadingStatus.next(true)
   let reqClone = req.clone({
    setHeaders :{
      'content-type':'application/json',
      'authorization':'JWT Token value From localStorage'
    },
   })


   return next.handle(reqClone)
    .pipe(
      delay(500),
      finalize(()=>{
        this._loaderservice.loadingStatus.next(false);
      })
    )
  }
}
