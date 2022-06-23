import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHttpService } from '@natec/mef-dev-platform-connector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements IHttpService {

	constructor(public http: HttpClient) {}

	get(
		path: string,
		params?: HttpParams,
		headers: HttpHeaders = new HttpHeaders()
	): Observable<any> {
		return this.http.get(path, {
			params: params,
			headers: headers,
			withCredentials: true,
		});
	}

	getT<T>(
		path: string,
		params?: HttpParams,
		headers: HttpHeaders = new HttpHeaders()
	): Observable<T> {
		return this.http.get<T>(path, {
			params: params,
			headers: headers,
			withCredentials: true,
		});
	}

	post(
		path: string,
		body?: any,
		params?: HttpParams,
		headers: HttpHeaders = new HttpHeaders(),
		reportProgress: boolean = false
	): Observable<any> {
		return this.http.post(path, body, {
			params: params,
			headers: headers,
			withCredentials: true,
			reportProgress: reportProgress,
		});
	}

  postSimple(
    path: string,
    body?: any,
    responseType?: any,
    params?: HttpParams,
    headers: HttpHeaders = new HttpHeaders(),
    reportProgress: boolean = false
  ): Observable<any> {
    return this.http.post(path, body, {
      params: params,
      headers: headers,
      withCredentials: true,
      responseType: responseType,
      reportProgress: reportProgress,
    });
  }


	postT<T>(
		path: string,
		body?: any,
		params?: HttpParams,
		headers: HttpHeaders = new HttpHeaders()
	): Observable<T> {
		return this.http.post<T>(path, body, {
			params: params,
			headers: headers,
			withCredentials: true,
		});
	}

	del(
		path: string,
		body?: any,
		responseType?: any,
		params?: HttpParams,
		headers: HttpHeaders = new HttpHeaders(),
		reportProgress: boolean = false
	  ): Observable<any> {
		return this.http.delete(path, {
		  params: params,
		  headers: headers,
		  withCredentials: true,
		  responseType: responseType,
		  reportProgress: reportProgress,
		});
	  }

  deleteT<T>(
    path: string,
    body?: any,
    responseType?: any,
    params?: HttpParams,
    headers: HttpHeaders = new HttpHeaders(),
    reportProgress: boolean = false
  ): Observable<any> {
    return this.http.delete<T>(path, {
      params: params,
      headers: headers,
      withCredentials: true,
      responseType: responseType,
      reportProgress: reportProgress,
    });
  }
}
