import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WorkflowDTO } from '../models/workflow.dto';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class PlatformApiService {

  constructor(
    private httpClient: HttpClient,
    private endpointService: EndpointService
  ) {}

  pluginGetRequest(): Observable<any> {
    return this.httpClient.get(this.endpointService.getInfo);
  }
  pluginPostRequest(data: any): Observable<any>{
    return this.httpClient.post(this.endpointService.createItem, data);
  }

  
  getWorkflows(): Observable<WorkflowDTO> {
    return this.httpClient.get<WorkflowDTO>(this.endpointService.bpmnWorkflows);
  }
  executeStandartBpmn(body: any): Observable<any> {
    return this.httpClient.post(this.endpointService.getBpmnCallUrl(), body);
  }
}
