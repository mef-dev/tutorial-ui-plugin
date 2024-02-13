import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';
import { TranslationLoaderResolver } from './resolvers/translation-loader.resolver';
import { ContainerComponent } from './components/container/container.component';
import { PlatformConnectionResolver } from './resolvers/platform-connection.resolver';

const routes: Routes = PlatformHelper.updatePluginsRoutes([
  {
    path: '',
    resolve: {
      translation: TranslationLoaderResolver,
      platformData: PlatformConnectionResolver
    },
    children: [
      {
        path:'',
        redirectTo: 'plugin-information',
        pathMatch: 'full'
      },
      {
        path: 'plugin-information',
        component: ContainerComponent,
      },
      {
        path: 'request-to-platform',
        component: ContainerComponent,
      },
      {
        path: 'request-to-plugin-api',
        component: ContainerComponent,
      },
      {
        path: 'receive-sse',
        component: ContainerComponent,
      }
    ]
  }
]);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
