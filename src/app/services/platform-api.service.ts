import { Injectable } from '@angular/core';
import { PluginEndpoints } from '../endpoints/plugin';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';
import { WorkflowDTO } from '../models/workflow.dto';

@Injectable({
  providedIn: 'root'
})
export class PlatformApiService {

  private info = PlatformHelper.PluginDataSync;

  constructor(private httpClient: HttpClient) {}

  pluginGetRequest(): Observable<any> {
    return this.httpClient.get(`${this.info!.pluginApiUrl}/${this.info!.alias}/${PluginEndpoints.plgGet}`);
  }

  pluginPostRequest(): Observable<WorkflowDTO> {
    return this.httpClient.get<WorkflowDTO>(`${this.info!.platformApiUrl}/bpmn/flowdefinitions`);
  }

  platformGetWorkflows(data: any): Observable<any>{
    return this.httpClient.post(`${this.info!.pluginApiUrl}/${this.info!.alias}/${PluginEndpoints.plgPost}`, data);
  }
}
