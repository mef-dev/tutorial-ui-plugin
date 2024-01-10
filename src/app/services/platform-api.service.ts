import { Injectable } from '@angular/core';
import { PlatformConnectorService } from './platform-connector.service';
import { Observable } from 'rxjs';
import { PluginEndpoints } from '../endpoints/plugin';

@Injectable({
  providedIn: 'root'
})
export class PlatformApiService {

  constructor(private platformConnectorService: PlatformConnectorService) { }

  getInfo(): Observable<any> {
    return this.platformConnectorService.HttpClient.get(PluginEndpoints.getInfo)
  }

  get(): Observable<any> {
    return this.platformConnectorService.HttpClient.get(PluginEndpoints.get)
  }

}
