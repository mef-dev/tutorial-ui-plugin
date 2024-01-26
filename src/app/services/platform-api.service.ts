import { Injectable } from '@angular/core';
import { PluginEndpoints } from '../endpoints/plugin';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatformApiService {

  private info = PlatformHelper.PluginDataSync;

  constructor(private httpClient: HttpClient) {}

  get(): Observable<any> {
    return this.httpClient.get(`${this.info.pluginApiUrl}/${this.info.alias}/${PluginEndpoints.getInfo}`);
  }

  getPluginData(): Observable<any> {
    return this.httpClient.get(`${this.info.platformApiUrl}/services/info/160021`)
  }

  createItem(data: any): Observable<any>{
    return this.httpClient.post(`${this.info.pluginApiUrl}/${this.info.alias}/${PluginEndpoints.createItem}`, data);
  }

  sendSseEvent(body: any): Observable<any> {
    return this.httpClient.post(`${this.info.platformApiUrl}/${PluginEndpoints.messageSseEvent}`, body, {
      headers: {
        'Authorization': `Basic ${this.getAuthorization()}`
      }
    })
  }

  private getAuthorization(): string {
    if (!environment.production && environment.bauth) {
      return `Basic ${btoa(environment.bauth)}`;
    }
    return `Bearer ${localStorage.getItem('token')}`;
  }


}
