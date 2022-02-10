import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularDraggableModule} from 'angular2-draggable';
import {jqxGridModule} from 'jqwidgets-scripts/jqwidgets-ng/jqxgrid';
import {jqxDateTimeInputModule} from 'jqwidgets-scripts/jqwidgets-ng/jqxdatetimeinput';
import {jqxDropDownListModule} from 'jqwidgets-scripts/jqwidgets-ng/jqxdropdownlist';
import {jqxChartModule} from 'jqwidgets-scripts/jqwidgets-ng/jqxchart';

import {AccordionModule} from 'ngx-bootstrap/accordion';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {AlertModule} from 'ngx-bootstrap/alert';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {TranslateModule} from '@ngx-translate/core';

import {PLUGIN_VERSION} from 'src/environments/version';
import {PluginComponent} from './plugin.component';
import {SimpleItemComponent} from './components/simple-item.component';
import {CustomerAccountsService} from './services/customer-account.service';
import {FakeCustomerAccountsService} from './services/fake-customer-account.service';
import {PluginRoutingModule} from './plugin-routing.module';

export const SETTINGS = new InjectionToken('SETTINGS');


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        BsDropdownModule.forRoot(),
        AccordionModule.forRoot(),
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),
        CollapseModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        TypeaheadModule.forRoot(),
        AngularDraggableModule,
        TranslateModule,
        BrowserModule,
        PluginRoutingModule,
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
            // якщо нема одразу, то точно збілдиться в процесі!
            provide: PLUGIN_VERSION.name, // "plugin-demo",
            useValue: PluginComponent,
        },
        CustomerAccountsService,
        FakeCustomerAccountsService
    ],
    bootstrap: [PluginComponent],
})
export class PluginBaseModule {
}
