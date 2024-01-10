import { PlatformHelper, PluginLocalData } from '@natec/mef-dev-platform-connector';
import { environment } from '../../environments/environment';

const info: PluginLocalData = PlatformHelper.getPluginData();

const api =
    environment.production ?
        info.pluginApiUrl.replace('/api/v1/', '/api/v0/') : `${environment.apiUrl}/api/v0/`;


export const PluginEndpoints = {
    getInfo: `${api}${info.pluginApiUrl}${info.alias}/plugins/${info.pluginMefName}/version.json?detaillevel=detailed`,
    get: `${api}${info.pluginApiUrl}${info.alias}/testplugin`,
}
