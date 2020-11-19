
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders }   from '@angular/common/http';

import { CustomerAccountModel } from '../models/customer-account.model'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseEndpoints } from '../endpoints/base-endpoints';
import { BaseEntity } from '../models/base-entity.model';

@Injectable()
export class CustomerAccountsService {

  //"Content-Type":"text/plain",
  private headers: HttpHeaders  = new HttpHeaders(
    BaseEndpoints.isProduction ?
      {"withCredentials" : "true" } :
      {}​);

  constructor(private http: HttpClient) {}

  public getCustomerAccauntsByModel(params: any): Observable<CustomerAccountModel[]> {
    return this.http.get<object>(BaseEndpoints.getCustomerAccauntsByModel(params),
      { headers: this.headers })
      .pipe(map(data => data['data'].map(data => new CustomerAccountModel().deserialize(data))));
  }

  public createCustomerAccaunts(model: CustomerAccountModel){

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

    return this.http.post(BaseEndpoints.createCustomerAccaunts(), body,
    { headers: this.headers });
  }

  public updateCustomerAccaunts(model: CustomerAccountModel){
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

    return this.http.put(BaseEndpoints.updateCustomerAccaunts(model.ABN_ID), body,
    { headers: this.headers });
  }

  public deleteCustomerAccaunts(ABN_ID: number){
    return this.http.delete(BaseEndpoints.deleteCustomerAccaunts(ABN_ID),
    { headers: this.headers });
  }
}


