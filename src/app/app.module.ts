import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlatformDataComponent } from './components/platform-data/platform-data.component';
import { PluginApiComponent } from './components/plugin-api/plugin-api.component';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomLoader } from './helpers/custom-translate-loader.helper';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './intercept/http-mw.intercept';
import { PluginInfoComponent } from './components/plugin-info/plugin-info.component';
import { ContainerComponent } from './components/container/container.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [
    AppComponent,
    PlatformDataComponent,
    PluginApiComponent,
    PluginInfoComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useClass: CustomLoader,
				deps: [HttpClient],
			}
		}),
    NgxJsonViewerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translate:TranslateService) {
    this.translate.setDefaultLang(localStorage.getItem('language') ?? 'en');
	}   
 }
