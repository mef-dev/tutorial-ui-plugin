import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PluginEndpoints } from '../endpoints/plugin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlatformConnectorService } from './platform-connector.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatformApiService {

  constructor(private httpClient: HttpClient, private platformConnectorService: PlatformConnectorService) { }

  getInfo(): Observable<any> {
    return this.httpClient.get(PluginEndpoints.getInfo, {
      headers: this.getAuthorization()
    });
  }

  createItem(data: any): Observable<any> {
    return this.httpClient.post(PluginEndpoints.createItem, data, {
      headers: this.getAuthorization()
    });
  }

  private getAuthorization(): HttpHeaders {
    const authorizationValue = this.platformConnectorService.HttpClient
        ? `Basic ${environment.bauth}`
        : `Bearer ${localStorage.getItem('token')}`;
    return new HttpHeaders().append('Authorization', authorizationValue);
  }

}
