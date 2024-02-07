import { NgModule } from '@angular/core';
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
import { MefDevAuthInterceptor } from "@natec/mef-dev-platform-connector";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SseComponent } from './components/sse/sse.component';
import { MefDevCardModule, MefDevCollapseModule, MefDevPageLayoutsModule, MefDevTabsModule } from '@natec/mef-dev-ui-kit';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        ContainerComponent,
        PlatformDataComponent,
        PluginApiComponent,
        PluginInfoComponent,
        SseComponent
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
            provide: HTTP_INTERCEPTORS,
            useClass: MefDevAuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(private translate: TranslateService) {
        this.translate.setDefaultLang(localStorage.getItem('language') ?? 'en');
    }

}
