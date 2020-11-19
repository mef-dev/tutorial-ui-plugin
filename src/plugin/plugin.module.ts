import { BrowserModule } from "@angular/platform-browser";
import { NgModule, InjectionToken } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  HttpClient,
  HttpClientModule,
} from "@angular/common/http";
import { jqxGridModule } from "jqwidgets-scripts/jqwidgets-ng/jqxgrid";
import { jqxDateTimeInputModule } from "jqwidgets-scripts/jqwidgets-ng/jqxdatetimeinput";
import { jqxDropDownListModule } from "jqwidgets-scripts/jqwidgets-ng/jqxdropdownlist";
import { jqxChartModule } from "jqwidgets-scripts/jqwidgets-ng/jqxchart";

import { AngularDraggableModule } from "angular2-draggable";
import {
  BsDropdownModule,
  AccordionModule,
  AlertModule,
  ButtonsModule,
  CollapseModule,
  ModalModule,
  TabsModule,
  TooltipModule,
  TypeaheadModule,
} from "ngx-bootstrap";

import { TranslateModule } from "@ngx-translate/core";
import { ROUTES, PluginRoutingModule } from "./plugin-routing.module";
import { PLUGIN_VERSION } from "src/environments/version";

import { PluginComponent } from "./plugin.component";
//import { SimpleListComponent } from "./components/simple-list.component";
import { SimpleItemComponent } from "./components/simple-item.component";
//import { RowEditWindowComponent} from './components/row-edit-window.component';

import { CustomerAccountsService } from "./services/customer-account.service";
// import { CustomerTypesService } from "./services/customer-types.service";

export const SETTINGS = new InjectionToken("SETTINGS");
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
    ROUTES,
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
      provide: PLUGIN_VERSION.name, //"plugin-demo",
      useValue: PluginComponent,
    },
    // CustomerTypesService, 
    CustomerAccountsService
  ],
  bootstrap: [PluginComponent],
})
export class PluginBaseModule {}
