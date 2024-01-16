import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = req.clone({
      headers: req.headers
    });

    if (!environment.production && environment?.['bauth']) {
      authReq = req.clone({
        withCredentials: true,
        headers: req.headers
            // @ts-ignore
            .set('Authorization', `Basic ${btoa(environment.bauth)}`)
      })
    }

    return next.handle(authReq).pipe(
        tap((event) => {},
            (err) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status == 401)
                  console.log('Unauthorized')
              }
            }
        )
    )
  }
}
