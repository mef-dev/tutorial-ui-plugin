import { Injectable } from '@angular/core';
import { PluginEndpoints } from '../endpoints/plugin';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';
import { PluginDataResponseModel } from '../models/plugin-data-response.model';
import { PluginEndpointsResponseModel } from '../models/plugin-endpoints-response.model';
import { SseBodyModel } from '../models/sse-body,model';

@Injectable({
  providedIn: 'root'
})
export class PlatformApiService {

  private info = PlatformHelper.PluginDataSync;

  constructor(private httpClient: HttpClient) {}

  get(): Observable<PluginEndpointsResponseModel> {
    return this.httpClient.get<PluginEndpointsResponseModel>(`${this.info.pluginApiUrl}/${this.info.alias}/${PluginEndpoints.getInfo}`);
  }

  getPluginData(): Observable<PluginDataResponseModel> {
    return this.httpClient.get<PluginDataResponseModel>(`${this.info.platformApiUrl}/bpmn/flowdefinitions`);
  }

  createItem(data: any): Observable<PluginEndpointsResponseModel>{
    return this.httpClient.post<PluginEndpointsResponseModel>(`${this.info.pluginApiUrl}/${this.info.alias}/${PluginEndpoints.createItem}`, data);
  }

  sendSseEvent(body: SseBodyModel): Observable<any> {
    return this.httpClient.post(`${this.info.platformApiUrl}/${PluginEndpoints.messageSseEvent}`, body);
  }

}
