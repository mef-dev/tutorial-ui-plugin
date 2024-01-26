import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';
import { TranslationLoaderResolver } from './resolvers/translation-loader.resolver';
import { ContainerComponent } from './components/container/container.component';
import { PlatformDataComponent } from './components/platform-data/platform-data.component';
import { PluginApiComponent } from './components/plugin-api/plugin-api.component';
import { PluginInfoComponent } from './components/plugin-info/plugin-info.component';
import { SseComponent } from './components/sse/sse.component';
import { PlatformConnectionResolver } from './resolvers/platform-connection.resolver';

const routes: Routes = PlatformHelper.updatePluginsRoutes([
  {
    path: "",
    component: ContainerComponent,
    resolve: {
      translation: TranslationLoaderResolver,
      platformData: PlatformConnectionResolver
    },
    children: [
      {
        path: "",
        redirectTo: "platform-data",
        pathMatch: "full"
      },
      {
        path: 'platform-data',
        component: PlatformDataComponent,
      },
      {
        path: 'plugin-info',
        component: PluginInfoComponent,
      },
      {
        path: 'plugin-api',
        component: PluginApiComponent,
      },
      {
        path: 'sse',
        component: SseComponent
      }
    ]
  }
]);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
