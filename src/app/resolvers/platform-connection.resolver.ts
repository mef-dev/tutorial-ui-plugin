import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UiProfileViewModel } from '@natec/mef-dev-platform-connector/lib/models/http-dtos/ui-profile-view.model';

@Injectable({
    providedIn: 'root'
})
export class PlatformConnectionResolver {

    constructor(private httpClient: HttpClient) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return PlatformHelper.loadPlatformOptions().pipe(
            map((data: UiProfileViewModel) => {
                console.warn('Loaded platform data');
            }),
            catchError((err, caught) => {
                console.warn('Platform data not detected');
                if (environment.production) {
                    throw err;
                }
                return PlatformHelper.setOptions({
                    httpClient: this.httpClient as any,
                    apiUrl: (environment as any)?.apiUrl ?? `https://sandbox.mef.dev`,
                    pluginName: 'basic-request-demo',
                    headers: {
                        'Authorization': `Basic ${btoa((environment as any).bauth)}`
                    }
                })
            })
        )
    }

}
