import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule,} from '@angular/common/http';
import {jqxGridModule} from 'jqwidgets-ng/jqxgrid';
import {jqxDateTimeInputModule} from 'jqwidgets-ng/jqxdatetimeinput';
import {jqxDropDownListModule} from 'jqwidgets-ng/jqxdropdownlist';
import {jqxChartModule} from 'jqwidgets-ng/jqxchart';

import {TranslateModule} from '@ngx-translate/core';
import {routes} from './plugin-routing.module';
import {PLUGIN_VERSION} from 'src/environments/version';

import {PluginComponent} from './plugin.component';
import {SimpleItemComponent} from './components/simple-item.component';
import {CustomerAccountsService} from './services/customer-account.service';
import {FakeCustomerAccountsService} from './services/fake-customer-account.service';
import { RouterModule } from '@angular/router';

export const SETTINGS = new InjectionToken('SETTINGS');

declare var PLUGIN_MODE: any;

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
		RouterModule,
        TranslateModule,
        PLUGIN_MODE === true ? RouterModule.forChild(routes) : RouterModule.forRoot(routes),
        jqxGridModule,
        jqxDateTimeInputModule,
        jqxDropDownListModule,
        jqxChartModule,
        HttpClientModule
    ],
    declarations: [PluginComponent, SimpleItemComponent],
    providers: [
        HttpClient,
        {
            provide: PLUGIN_VERSION.name,
            useValue: PluginComponent,
        },
        CustomerAccountsService,
        FakeCustomerAccountsService
    ],
    bootstrap: [PluginComponent],
})
export class PluginBaseModule {
}
