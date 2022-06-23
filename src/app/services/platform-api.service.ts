import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PluginEndpoints } from '../endpoints/plugin';
import { PaggedList } from '../models/pagged-list.model';
import { ServicePublic } from '../models/service-public.model';
import { PlatformConnectorService } from './platform-connector.service';

@Injectable({
  providedIn: 'root'
})
export class PlatformApiService {
  constructor(
    private platformConnectorService: PlatformConnectorService
  ) { }

  getInfo(): Observable<any> {
    return this.platformConnectorService.HttpClient.get(PluginEndpoints.getInfo)
  }

  get(): Observable<any> {
    return this.platformConnectorService.HttpClient.get(PluginEndpoints.get)
  }

}
