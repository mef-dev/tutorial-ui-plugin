import { environment } from "src/environments/environment";
import { PLUGIN_VERSION } from "src/environments/version";
import { Filter } from '../classes/get-request-filter';

// TODO: ось це глянути для тестування на локальній машині як організувати і на прод як вибирати, по ідеї просто перевірити в енвайєрментах и прод

const pluginPath = environment.production
  ? `${localStorage["api-url"]}entity/` //${environment.serviceName}
  : environment.apiUrl;

export class BaseEndpoints {
  
  private static get GetPath(){
    return `${pluginPath}${environment.production ? "" : "AngularTest/"}`
  }
  public static get isProduction() {
    return environment.production;
  }

  public static get GetCustomerAccauntsUrl() {
    return `${this.GetPath}customeraccounts`;
  }

  public static getCustomerAccauntsByModel(parametrs: any): string {
    return `${this.GetCustomerAccauntsUrl}.json?page=${parametrs.pagenum}&pagesize=${parametrs.pagesize}`;    
  }
  public static createCustomerAccaunts() {
    return `${this.GetCustomerAccauntsUrl}.json`;
  }
  public static updateCustomerAccaunts(id: number) {
    return `${this.GetCustomerAccauntsUrl}/update/${id}.json`;
  }
  public static deleteCustomerAccaunts(id: number) {
    return `${this.GetCustomerAccauntsUrl}/${id}.json`;
  }
};
