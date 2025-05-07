import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';
import { TranslationLoaderResolver } from './resolvers/translation-loader.resolver';
import { ContainerComponent, tabPaths } from './components/container/container.component';
import { PlatformConnectionResolver } from './resolvers/platform-connection.resolver';

function tabPathToRoute(path: string): Route{
  return {
    path: path,
    component: ContainerComponent
  }
} 

const routes: Routes = [
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
      ...tabPaths.map(tabPathToRoute)
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
