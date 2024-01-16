import { environment } from '../../environments/environment';

export const PluginEndpoints = {
    getInfo: `${environment.apiUrl}${environment.alias}/restresource/12`,
    createItem: `${environment.apiUrl}${environment.alias}/restresource/create-item`
};
