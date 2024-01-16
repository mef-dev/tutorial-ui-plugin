import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PluginEndpoints } from '../endpoints/plugin';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlatformApiService {

  constructor(private httpClient: HttpClient) { }

  getInfo(): Observable<any> {
    return this.httpClient.get(PluginEndpoints.getInfo);
  }

  createItem(data: any): Observable<any> {
    return this.httpClient.post(PluginEndpoints.createItem, data);
  }

  // doesn't work with interceptor

  // constructor(private platformConnectorService: PlatformConnectorService) { }
  //
  // getInfo(): Observable<any> {
  //   return this.platformConnectorService.HttpClient.get(PluginEndpoints.getInfo);
  // }
  //
  // createItem(data: any): Observable<any> {
  //   return this.platformConnectorService.HttpClient.post(PluginEndpoints.createItem, data);
  // }


}
