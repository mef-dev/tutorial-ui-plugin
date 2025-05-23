import { Injectable } from '@angular/core';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  constructor() { }
  
  //Backend plugin
  get getInfo():string {
    return `${PlatformHelper.PluginDataSync!.pluginApiUrl!}/${PlatformHelper.PluginDataSync!.alias}/restresource/12`
  }
  get createItem():string {
    return `${PlatformHelper.PluginDataSync!.pluginApiUrl!}/${PlatformHelper.PluginDataSync!.alias}/restresource/create-item`
  }

    
  //BPMN
  get bpmnWorkflows():string {
    return `${PlatformHelper.PluginDataSync!.platformApiUrl}/bpmn/flowdefinitions`
  }
  getBpmnCallUrl(
    accessType: 'personal' | 'tenant' = 'personal', 
    libName: string = 'MyDrafts', 
    flowName: string = 'simple-flow-example', 
    debugMode: boolean = false):string {
    return `${PlatformHelper.PluginDataSync!.platformApiUrl}/bpmn/flowdefinitions/${accessType}/${libName}/${flowName}/Start.json?debug=${debugMode}&async=false&run=auto`
  }

}
