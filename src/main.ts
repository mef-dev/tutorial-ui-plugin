import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { PluginBaseModule } from "./plugin/plugin.module";
import { environment } from "./environments/environment";

export function getBaseUrl() {
  return environment.apiUrl; // document.getElementsByTagName("base")[0].href;
}

const providers = [{ provide: "BASE_URL", useFactory: getBaseUrl, deps: [] }];

platformBrowserDynamic(providers)
  .bootstrapModule(PluginBaseModule)
  .catch((err) => console.error(err));
