declare var PLUGIN_MODE: boolean | undefined;

export let IS_PLUGIN_MODE: boolean;
try {
    IS_PLUGIN_MODE = PLUGIN_MODE;
} catch (ex) {
    IS_PLUGIN_MODE = false;
}
