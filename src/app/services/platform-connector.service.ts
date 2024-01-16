import { Injectable } from '@angular/core';
import { IHttpService, PlatformHelper, PluginLocalData } from '@natec/mef-dev-platform-connector';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PlatformConnectorService {

  private platformHttpService: IHttpService = PlatformHelper.getPlatformHttpClient();

  constructor(private http: HttpService) { }

  get HttpClient(): IHttpService {
    return this.platformHttpService ?? this.http;
  }

  get PluginData(): PluginLocalData | undefined{
    return PlatformHelper.getPluginData();
  }


}
