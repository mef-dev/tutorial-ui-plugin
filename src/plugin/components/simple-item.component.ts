import {
  Component,
  ViewChild
} from "@angular/core";

import { jqxGridComponent } from "jqwidgets-scripts/jqwidgets-ng/jqxgrid";

import { CustomerAccountModel } from "../models/customer-account.model";
import { CustomerAccountsService } from "../services/customer-account.service";

import { BaseEndpoints } from '../endpoints/base-endpoints';

@Component({
  selector: "app-item",
  template: `
    <div style="font-size: 13px; font-family: Verdana; float: left">
      <jqxGrid
        #myGrid
        [groupable]="true"
        [width]="1225"
        [source]="dataAdapter"
        [columns]="columns"
        [autoheight]="true"
        [editable]="true"
        [editmode]="'selectedrow'"  
        [selectionmode]="'singlerow'"
        [pageable]="true"
        [columnsresize]="true"
        [selectionmode]="'multiplecellsadvanced'"
        [sortable]="true"
        [showtoolbar]="true" 
        [rendertoolbar]="rendertoolbar"
        [theme]="'metro'"
        [filterable]="true"  
        [showfilterrow]="true"
        [altrows]="true"
        [virtualmode]= "true"
        [rendergridrows]="rendergridrows"
        (onRowdoubleclick)="rowSelect($event)" 
        (onRowunselect)="rowUnSelect($event)"
        
      ></jqxGrid> 
     
      <div class="container">
        reqInProgressCount = {{requestsCnt}}<br />
        err request log:
        <label> {{errReqLog}} </label>
      </div>

  `
})
export class SimpleItemComponent  {
  
  @ViewChild("myGrid") myGrid: jqxGridComponent;

  public requestsCnt: number = 0;
  public errReqLog: string = '';

  private rowsToUpdate: Array<CustomerAccountModel> = new Array<CustomerAccountModel>();
  private rowsToCreate: Array<CustomerAccountModel> = new Array<CustomerAccountModel>();
  private rowsToDelete: Array<CustomerAccountModel> = new Array<CustomerAccountModel>();

  private nowEditRow: number = -1;
  private isNewRow: boolean = false;
  private isDelRow: boolean = false;

  constructor(
    private _CustomerAccountsService: CustomerAccountsService,
  ) {  }

  //#region init grid

  filds: Array<any> = [
    { name: "ACCOUNT_TYPES", type: "string" },
    { name: "Total", type: "number" },
    { name: "NUM_QTY", type: "number" },
    { name: "Lang", type: "string" },
    { name: "IsExternalID", type: "number" },
    { name: "CLIENT_NAME", type: "string" },
    { name: "CLIENT_CONTRACT", type: "string" },
    { name: "CLI_OKPO", type: "string" },
    { name: "ABN_ID", type: "number" },
    { name: "ACCOUNT_STATUS_CLOSED", type: "bool" },
    { name: "ACCOUNT_ID", type: "number" },
    { name: "ACCOUNT", type: "string" },
    { name: "BILL_NO", type: "string" },
  ];

  rendergridrows = (params: any): any => {
    return params.data;
  }

  source: any = {
    datatype: "json",
    beforeLoadComplete: this.beforeLoadComplete,
    datafields: this.filds,
    url: BaseEndpoints.getCustomerAccauntsByModel({pagenum: 0, pagesize: 10}),
    sort: () => {
      // update the grid and send a request to the server.
      this.myGrid.updatebounddata('sort');
    },
    filter: () => {
      // update the grid and send a request to the server.
      this.myGrid.updatebounddata('filter');
    }
  };

  dataAdapter: any = new jqx.dataAdapter(this.source, {
    loadServerData: (serverdata, source, callback) => {
      console.log("serverdata", serverdata);
      this._CustomerAccountsService.getCustomerAccauntsByModel(serverdata).subscribe(
        req => { callback({ records: req, totalrecords: (req[0] != null ? req[0].Total : 0)  }); },
        err => console.log(err)
      );
    }

  });

  columns: any[] = [
    {
      text: "Тип аккаунта",
      datafield: "ACCOUNT_TYPES",
      width: 125,
      columntype: "dropdownlist",
      createeditor: (row: number, value: any, editor: any): void =>
        editor.jqxDropDownList({
          autoDropDownHeight: true,   
        }),
        filtertype: 'list',
        filteritems: ['0', '1']
    },
    { text: "Язик", datafield: "Lang", width: 75, columntype: "dropdownlist", search: false, sortable: false, filterable: false},
    { text: "Внешний ID", datafield: "IsExternalID", width: 100, search: false, sortable: false, filterable: false }, // ???
    { text: "Имя", datafield: "CLIENT_NAME", width: 200 },
    { text: "Контракти", datafield: "CLIENT_CONTRACT", width: 150 },
    { text: "ОКПО", datafield: "CLI_OKPO", width: 100 },
    { text: "ID Абонента", datafield: "ABN_ID", width: 100, search: false, sortable: false, filterable: false },
    {
      text: "Аккаунт закрит",
      datafield: "ACCOUNT_STATUS_CLOSED",
      width: 100,
      columntype: "checkbox",
      cellbeginedit: this.cellbeginedit, search: false, sortable: false, filterable: false
    }, // ???
    { text: "ID Аккаунта", datafield: "ACCOUNT_ID", width: 75 , search: false, sortable: false, filterable: false},
    { text: "Аккаунт", datafield: "ACCOUNT", width: 100 },
    { text: "Номер", datafield: "BILL_NO", width: 100, search: false, sortable: false, filterable: false }, // ???
    
  ];

  beforeLoadComplete(records: any): any {
    for (const key in records) {
      let record = records[key];
      record.status_metadata = record.status == null ? "null" : record.status;
    }
    return records;
  }

  cellbeginedit(row: number, datafield: string, columntype: any, value: any): boolean {
    return this.nowEditRow == row ? true : false;
  }
 
  //#endregion

  //#region logic

  rowSelect(event: any): void {
    this.nowEditRow = event.args.rowindex;
    console.log("edit row " + this.nowEditRow);
  }

  rowUnSelect(event: any): void {
    if(this.nowEditRow != -1){
      this.myGrid.endrowedit(this.nowEditRow, false);
      
      if(!this.isDelRow)
        (this.isNewRow ? this.rowsToCreate : this.rowsToUpdate).push(this.myGrid.getrows()[this.nowEditRow]);
      else
        this.isDelRow = false;

      //console.log((this.isNewRow ? "this.rowsToCreate" : "this.rowsToUpdate") ,(this.isNewRow ? this.rowsToCreate : this.rowsToUpdate));
      console.log(`End edit row ${event.args.rowindex}`);

      this.nowEditRow = -1;
      this.isNewRow = false; 
    }
  }

  addRowBtnClick = (event) => {
    this.nowEditRow = 0;
    this.isNewRow = true;
    this.myGrid.addrow(0, new CustomerAccountModel(), 0);
    
    this.myGrid.beginrowedit(this.nowEditRow);
    console.log("add row btn");
    //console.log("nowEditRow " , this.nowEditRow);
    //console.log(event);
  }

  delRowBtnClick = (event) => {
    console.log("del btn ", this.nowEditRow);
    if(this.nowEditRow == -1)
      return;
    this.rowsToDelete.push(this.myGrid.getrows()[this.nowEditRow]);
    this.isDelRow = true;
    this.saveBtnClick(null);
  }

  saveBtnClick = (event) => {
      
    if(this.nowEditRow != -1)
      this.myGrid.unselectrow(this.nowEditRow); 
    console.log("Save Change btn");

    console.log("this.rowsToCreate ", this.rowsToCreate);
    console.log("this.rowsToUpdate ", this.rowsToUpdate);
    console.log("this.rowsToDelete ", this.rowsToDelete);

    this.rowsToCreate.forEach(element => {
      this.requestsCnt++;
      this._CustomerAccountsService.createCustomerAccaunts(element).subscribe(
        request => this.okRequetAction("createCustomerAccaunts", request),
        error => this.errRequetAction("createCustomerAccaunts", error)
      );
    });
    this.rowsToCreate = [];

    this.rowsToUpdate.forEach(element => {
      this.requestsCnt++;
      this._CustomerAccountsService.updateCustomerAccaunts(element).subscribe(
        request => this.okRequetAction("updateCustomerAccaunts", request),
        error =>this.errRequetAction("updateCustomerAccaunts", error)
      );
    });
    this.rowsToUpdate = [];

    this.rowsToDelete.forEach(element => {
      this.requestsCnt++;
      this._CustomerAccountsService.deleteCustomerAccaunts(element.ABN_ID).subscribe(
       request => this.okRequetAction("deleteCustomerAccaunts", request),
       error => this.errRequetAction("deleteCustomerAccaunts", error)
      );
    });
    this.rowsToDelete = [];
    this.myGrid.updatebounddata();
  } 

  okRequetAction(actionName: string, req: any): void{
    if(req['id'] > 0){
      console.log(actionName + " ", req);
      this.requestsCnt--;
      this.myGrid.updatebounddata();
    }
    else{
      this.errRequetAction(actionName, req);
    }
  }

  errRequetAction(actionName: string, req: any): void{
    console.log(actionName + " err ", req);
    this.errReqLog += req;
    this.requestsCnt--;
    this.myGrid.updatebounddata();
  }

  //#endregion

  //#region tool bar
  
  rendertoolbar = (toolbar: any): void => {
    let container = document.createElement('div');
    
    container.style.margin = '5px';

    let buttonContainer1 = document.createElement('div');
    let buttonContainer2 = document.createElement('div');
    let buttonContainer3 = document.createElement('div');
   
    buttonContainer1.id = 'buttonContainer1';
    buttonContainer2.id = 'buttonContainer2';
    buttonContainer3.id = 'buttonContainer3';
  
    buttonContainer1.style.cssText = 
     buttonContainer2.style.cssText = 
     buttonContainer3.style.cssText = 'float: right; margin-left: 10px; margin-right: 10px;';
 
    container.appendChild(buttonContainer1);
    container.appendChild(buttonContainer2);
    container.appendChild(buttonContainer3);
  
    toolbar[0].appendChild(container);
    
    let addRowButton = jqwidgets.createInstance('#buttonContainer1', 'jqxButton', { width: 105, value: 'Add New Row'  });
    let saveChangeButton = jqwidgets.createInstance('#buttonContainer2', 'jqxButton', { width: 105, value: 'Save Change'  });
    let deleteRowButton = jqwidgets.createInstance('#buttonContainer3', 'jqxButton', { width: 105, value: 'Delete select row'  });
    
    addRowButton.addEventHandler('click', this.addRowBtnClick);
    saveChangeButton.addEventHandler('click', this.saveBtnClick);
    deleteRowButton.addEventHandler('click', this.delRowBtnClick);
    
  };
  
  //#endregion

}
