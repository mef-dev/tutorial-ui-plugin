import { TranslateLoader } from '@ngx-translate/core';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export class CustomLoader implements TranslateLoader {

    constructor(private httpClient: HttpClient) {}

    getTranslation(langCountry: string): Observable<any> {
        if(!langCountry){
            langCountry = 'en';
        }

        if (!langCountry.includes('_')) {
            return this.httpClient.get(PlatformHelper.getAssetUrl() + '/i18n/' + langCountry + '.json');
        }

        const arr = langCountry.split('_');
        return forkJoin([
            this.httpClient.get(PlatformHelper.getAssetUrl() + '/i18n/' + arr[0] + '.json'),
            this.httpClient.get(PlatformHelper.getAssetUrl() + '/i18n/' + arr[1] + '/' + langCountry + '.json')
        ])
            .pipe(map(data => {
                const res = {};
                data.forEach((obj) => {
                    Object.assign(res, obj);
                });
                return res;
            }));
    }

}
