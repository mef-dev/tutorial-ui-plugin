import { StringExt } from './../utils/string-ext.util';

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { CustomerAccountModel } from '../models/customer-account.model'
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoints } from '../endpoints/base-endpoints';
import { BaseEntity } from '../models/base-entity.model';
import { Inject } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable()
export class FakeCustomerAccountsService {
  private headers: HttpHeaders = new HttpHeaders(
    environment.production ?
      { "withCredentials": "true" } :
      {});
    url: string;
  baseUrl: string;
  accounts: CustomerAccountModel[] = [{Id: "1", ACCOUNT: "Demo"} as CustomerAccountModel];
  constructor(@Inject("BASE_URL") baseUrl: string, private http: HttpClient) {
    this.baseUrl = baseUrl;
  }

  public getCustomerAccountsByModel(params?: any): Observable<any> { // CustomerAccountModel[]

    return this.ok(this.accounts);
    // return this.http.get<object>(
    //   `${this.baseUrl}${Endpoints.getCustomerAccounts
    //   }?page=1&pagesize=1000&filter=${JSON.stringify(
    //     params
    //   )}&hateoas=false`,
    //   { headers: this.headers })
    //   .pipe(map(data => data['data'].map(data => new CustomerAccountModel().deserialize(data))));
  }

  public createCustomerAccount(model: CustomerAccountModel) {

    let body: BaseEntity =
    {
      Id: "",
      Name: model.CLIENT_NAME,
      ParentId: "",
      Format: "json",
      Lang: "uk",
      IsCoerced: true,
      CustomAttributes: {}
    }
    this.accounts.push(model);

    return this.http.post(`${this.baseUrl}${Endpoints.createCustomerAccount}`, body,
      { headers: this.headers });
  }

  public updateCustomerAccount(model: CustomerAccountModel) {
    let body: BaseEntity =
    {
      Id: model.ABN_ID.toString(),
      Name: model.CLIENT_NAME,
      ParentId: "",
      Format: "json",
      Lang: "uk",
      IsCoerced: true,
      CustomAttributes: {}
    }

    return this.ok();
  }

  public deleteCustomerAccount(ABN_ID: number) {
    return this.ok();
  }


  // helper functions
  //headers: any;
  // for interceptor
  // ok(body?) {
  //   return of(new HttpResponse({ status: 200, body }))
  // }
  ok(body?) {
    return of(body );
  }
}
