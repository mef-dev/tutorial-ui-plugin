import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';
import { ContainerComponent} from './components/container/container.component';
import { TranslationLoaderResolver } from './resolvers/translation-loader.resolver';
import { PlatformDataComponent } from './components/platform-data/platform-data.component';
import { PluginApiComponent } from './components/plugin-api/plugin-api.component';
import { PluginInfoComponent } from './components/plugin-info/plugin-info.component';

const routes: Routes = PlatformHelper.updatePluginsRoutes([
  {
    path: "",
    component: ContainerComponent,
    resolve: { model: TranslationLoaderResolver },
    children: [
      {
        path: "",
        redirectTo: "platform-data",
        pathMatch: "full"
      },
      {
        path: "platform-data",
        component: PlatformDataComponent
      },
      {
        path: "plugin-api",
        component: PluginApiComponent
      },
      {
        path: "plugin-info",
        component: PluginInfoComponent
      }
    ]
  }
]);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
