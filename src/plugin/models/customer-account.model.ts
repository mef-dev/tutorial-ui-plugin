import {Deserializable} from '../interfaces/deserializable.model';

export class CustomerAccountModel implements Deserializable {
    ACCOUNT: string;
    ACCOUNT_ID: number;
    ACCOUNT_STATUS_CLOSED: number;
    ACCOUNT_TYPES: string;
    CLI_OKPO: string;
    CLIENT_NAME: string;
    NUM_QTY: number;
    Total: number;
    ABN_ID: number;
    lang?: string;
    IsExternalID?: number;
    CLIENT_CONTRACT?: string;
    BILL_NO?: string;
    CustomAttributes?: any;
    Format?: any;
    IDType?: any;
    Id?: any;
    IsCoerced?: any;
    Lang?: any;
    Name?: any;
    ParentId?: any;
    // tslint:disable-next-line:variable-name
    status_metadata?: any;
    status?: any;

    deserialize(input: any): this {
        this.ACCOUNT = input.account;
        this.ACCOUNT_ID = input.accounT_ID;
        this.ACCOUNT_STATUS_CLOSED = input.accounT_STATUS_CLOSED;
        this.ACCOUNT_TYPES = input.accounT_TYPES;
        this.CLI_OKPO = input.clI_OKPO;
        this.CLIENT_NAME = input.clienT_NAME;
        this.NUM_QTY = input.nuM_QTY;
        this.Total = input.total;
        this.ABN_ID = input.abN_ID;
        return this;
    }
}
