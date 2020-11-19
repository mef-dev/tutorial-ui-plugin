import { FilteredColum } from './filtered-colum';

export class Filter
{
    constructor(params: any){
        this.filterFilds    = this.FilteredColumsFromJQParams(params);
        this.sortFieldName  = params["sortdatafield"];
        this.sortOrder      = params["sortorder"];
    }
    
    filterFilds:    Array<FilteredColum>;
    sortFieldName:  string;
    sortOrder:      string;

    private FilteredColumsFromJQParams(params: any): Array<FilteredColum>{
        let arr = new Array<FilteredColum>();

        let props = Object.keys(params);
        let filterNumber: number = 0;

        while(props.find(prop => prop.toString() === `filtercondition${filterNumber}`.toString() ))
        {
            let filter = new FilteredColum()
            filter.columName = params[`filterdatafield${filterNumber}`]
            filter.condition = params[`filtercondition${filterNumber}`]
            filter.value     = params[`filtervalue${filterNumber}`]
           
            arr.push(filter);
            filterNumber++;
        }
        
        return arr;
    }
}