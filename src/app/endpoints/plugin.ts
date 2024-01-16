import { environment } from '../../environments/environment';

export const PluginEndpoints = {
    getInfo: `${environment.apiUrl}/api/v2/${environment.alias}/restresource/12`,
    createItem: `${environment.apiUrl}/api/v2/${environment.alias}/restresource/create-item`
};
