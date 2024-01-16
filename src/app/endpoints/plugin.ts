import { PlatformHelper } from '@natec/mef-dev-platform-connector';

const info = PlatformHelper?.getPluginData();
let baseApiUrl = `${info?.pluginApiUrl}${info.alias}/`;

if (baseApiUrl.includes('/v0/') || baseApiUrl.includes('/v1/')) {
    baseApiUrl = baseApiUrl.replace(/\/v[01]\//, '/v2/');
}

export const PluginEndpoints = {
    getInfo: `${baseApiUrl}restresource/12`,
    createItem: `${baseApiUrl}restresource/create-item`
};
