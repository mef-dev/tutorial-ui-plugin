import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ContainerComponent } from './components/container/container.component';
import { PlatformDataComponent } from './components/platform-data/platform-data.component';
import { PluginApiComponent } from './components/plugin-api/plugin-api.component';
import { PluginInfoComponent } from './components/plugin-info/plugin-info.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomLoader } from './helpers/custom-translate-loader.helper';
import { MefDevAuthInterceptor, PlatformHelper, UiProfileViewModel } from "@natec/mef-dev-platform-connector";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SseComponent } from './components/sse/sse.component';
import { MefDevCardModule, MefDevCollapseModule, MefDevPageLayoutsModule, MefDevTabsModule } from '@natec/mef-dev-ui-kit';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { FormsModule } from '@angular/forms';
import { BpmnComponent } from './components/bpmn/bpmn.component';
import { AssetsAccessComponent } from './components/assets-access/assets-access.component';
import { APP_BASE_HREF } from '@angular/common';
import { catchError, forkJoin, map } from 'rxjs';
import { environment } from 'src/environments/environment';

function init(httpClient: HttpClient, translate: TranslateService) {
  return () => forkJoin([
    PlatformHelper.loadPlatformOptions().pipe(
      map((data: UiProfileViewModel) => {
        console.warn('✅ Platform data loaded');
        return data;
      }),
      catchError((err) => {
        console.warn('⚠️ Platform data not detected');
        if (environment.production) {
          throw err;
        }
        return PlatformHelper.setOptions({
          httpClient: httpClient as any,
          apiUrl: (environment as any).apiUrl ?? 'https://api.mef.dev',
          pluginName: 'basic-request-demo',
          headers: {
            'Authorization': `Basic ${btoa((environment as any).bauth)}`
          }
        });
      })
    ), 
    (
      (translate: TranslateService) => {
        translate.setDefaultLang(localStorage.getItem('language') ?? 'en');
        return translate.get('test');
      }
    )(translate)
  ]);
}
@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    PlatformDataComponent,
    PluginApiComponent,
    PluginInfoComponent,
    SseComponent,
    BpmnComponent,
    AssetsAccessComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MefDevTabsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomLoader,
        deps: [HttpClient],
      }
    }),
    MefDevPageLayoutsModule,
    NgxJsonViewerModule,
    MefDevCollapseModule,
    MefDevCardModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [ HttpClient, TranslateService ],
      useFactory: init,
      multi: true,
    },
    {
      provide: APP_BASE_HREF,
      useFactory: PlatformHelper.getAppBasePath,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MefDevAuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
