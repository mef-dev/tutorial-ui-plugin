import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlatformHelper } from 'mef-dev-platform-connector';

import { ContainerComponent } from './components/container/container.component';
import { PlatformDataComponent } from './components/platform-data/platform-data.component';
import { PluginApiComponent } from './components/plugin-api/plugin-api.component';
import { PluginInfoComponent } from './components/plugin-info/plugin-info.component';

import { TranslationLoaderResolver } from './resolvers/translation-loader.resolver';

const routes: Routes = PlatformHelper.updatePluginsRoutes([  //use only ones time, for others sub routes use regular Angular way
  	{
		path: "",
		component: ContainerComponent,
		resolve: {model: TranslationLoaderResolver},
		children: // not to change. all used routes must be declared as children

		[
			{
				path:"", 
				redirectTo:"platform-data", 
				pathMatch: 'full', 
			},
			{
				path:"platform-data", 
				component: PlatformDataComponent, 
			},
			{
				path:"plugin-api", 
				component: PluginApiComponent, 
			},
			{
				path:"plugin-info", 
				component: PluginInfoComponent, 
			},
		]
	},
]);


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
