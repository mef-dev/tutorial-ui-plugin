import { Injectable } from '@angular/core';
import { IHttpService, PluginLocalData, PlatformHelper } from 'mef-dev-platform-connector'; // TODO:
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PlatformConnectorService {
  
  private platformHttpService: IHttpService | undefined = PlatformHelper.getPlatformHttpClient();

  constructor(
    private _http: HttpService // own implement(for ng-serve)
    ) {
  }

  get HttpClient(): IHttpService{
    return this.platformHttpService ?? this._http;
  }

  get PluginData(): PluginLocalData | undefined{
    return PlatformHelper.getPluginData();
  }
}
