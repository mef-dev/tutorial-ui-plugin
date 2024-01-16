import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PluginEndpoints } from '../endpoints/plugin';
import { PlatformConnectorService } from './platform-connector.service';

@Injectable({
  providedIn: 'root'
})
export class PlatformApiService {

  constructor(private platformConnectorService: PlatformConnectorService) { }

  getInfo(): Observable<any> {
    return this.platformConnectorService.HttpClient.get(PluginEndpoints.getInfo);
  }

  createItem(data: any): Observable<any> {
    return this.platformConnectorService.HttpClient.post(PluginEndpoints.createItem, data);
  }

}
