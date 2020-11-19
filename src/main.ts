import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { PluginBaseModule } from "./plugin/plugin.module";
import { environment } from "./environments/environment";


platformBrowserDynamic()
  .bootstrapModule(PluginBaseModule)
  .catch((err) => console.error(err));
