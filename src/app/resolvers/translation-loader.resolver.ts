import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TranslationLoaderResolver {

  constructor(private translateService: TranslateService) {}

  resolve(): Observable<any> {
    return this.translateService.get('test');
  }

}
