import { Injectable } from '@angular/core';
import { PluginEndpoints } from '../endpoints/plugin';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';

@Injectable({
  providedIn: 'root'
})
export class PlatformApiService {

  private info = PlatformHelper.PluginDataSync;

  constructor(private httpClient: HttpClient) {}

  get(): Observable<any> {
    return this.httpClient.get(`${this.info.pluginApiUrl}/${this.info.alias}/${PluginEndpoints.getInfo}`);
  }

  createItem(data: any): Observable<any>{
    return this.httpClient.post(`${this.info.pluginApiUrl}/${this.info.alias}/${PluginEndpoints.createItem}`, data);
  }


}
