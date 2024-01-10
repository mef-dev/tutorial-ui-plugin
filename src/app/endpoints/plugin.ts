import { PlatformHelper, PluginLocalData } from '@natec/mef-dev-platform-connector';

const info: PluginLocalData = PlatformHelper.getPluginData();

export const PluginEndpoints = {
    getInfo: `${info.pluginApiUrl}${info.alias}/plugins/${info.pluginMefName}/version.json?detaillevel=detailed`,
    get: `${info.pluginApiUrl}${info.alias}/testplugin`,
}
