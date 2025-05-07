# UI package with Backend logic (Portal plugin)
> **Prerequisites:** Before you begin, make sure you have installed [nodejs](https://nodejs.org) and [@angular/cli](https://www.npmjs.com/package/@angular/cli)*

> **Note:** This plugin has been tested on the following versions of @angular/cli: [12.2.17](https://www.npmjs.com/package/@angular/cli/v/12.2.17), [13.3.8](https://www.npmjs.com/package/@angular/cli/v/13.3.8), [14.3.0](https://www.npmjs.com/package/@angular/cli/v/14.2.11), [15.2.8](https://www.npmjs.com/package/@angular/cli/v/15.2.8), [16.2.8](https://www.npmjs.com/package/@angular/cli/v/16.2.8)

This repository serves as an extended example of a package within the [mef.dev](https://mef.dev/) platform.

This plugin does **not** include business logic implementation. Its purpose is to demonstrate the Angular project design for interaction with a custom backend within the platform.

The repository is intended to run as a `Portal` type of package together with the package: [tutorial-backend-plugin](https://github.com/mef-dev/tutorial-backend-plugin).

The process of building and uploading packages does not differ from previous guides, except for selecting the `Portal` type of package during registration. This type of package is oriented towards Frontend + Backend operation; therefore, the data for the frontend and backend components should be configured properly.

> Refer to the [guide to register a package into the platform](https://platform.mef.dev/dev_guides/upload_ui_plugin.md).


## @natec/mef-dev-platform-connector
This demo serves as a practical illustration of leveraging the capabilities offered by the [@natec/mef-dev-platform-connector](https://www.npmjs.com/package/@natec/mef-dev-platform-connector) library. 

>Familiarizing yourself with the description of the library and its functionality will greatly aid in understanding the subsequent sections.

## Project name and pluginUIName

The `pluginUIName` serves as the primary identifier for the UI plugin within the platform. You only need to set this value once during registration. If you intend to reuse this repository, the first step is to update the project name and base selector.

In this repository, the project name is`basic-request-demo`. Replace occurrences of this text with your desired pluginUIName.

Important places to update:
* \angular.json
* \package.json (property `name`)
* \src\app\app.component.ts (main component selector)
* \src\index.html (main component selector)
* \src\app\resolvers\platform-connection.resolver.ts (seting options for PlatformHelper)

For more information about the base selector, refer to [this guide](https://platform.mef.dev/dev_guides/first_ui_plugin.md#3-changing-the-base-selector)

## Routes feature

To ensure proper routing functionality, it's essential that all actual paths are contained within the children section. Failure to do so may lead to unpredictable behavior, where navigating within the plugin modifies the entire path, including platform navigation. While this won't render the plugin inoperable, it can make further use of the platform unpredictable.

> **Update:** `PlatformHelper.updatePluginsRoutes(...)` is no longer required. Routes are now registered directly.

```ts
// src/app/app-routing.module.ts
const routes: Routes = [
  {
    path: "",
    children: [
      // insert routes here
    ]
  }
];
```

## Platform Initialization (via APP_INITIALIZER)
Starting from version ^16.4.8, platform initialization and fallback configuration are handled in AppModule using APP_INITIALIZER and APP_BASE_HREF.

Instead of using a resolver, the logic now runs automatically during app startup:

```ts
{
  provide: APP_INITIALIZER,
  deps: [HttpClient, TranslateService],
  useFactory: initPlatform,
  multi: true,
},
{
  provide: APP_BASE_HREF,
  useFactory: PlatformHelper.getAppBasePath,
}
```

This ensures:
* Fallback to sandbox configuration in development mode
* Platform options are loaded before bootstrapping the app
* Base href is properly resolved inside the platform

## environment.ts
Basic Auth fallback is still configured via environment:
```ts
headers: {
  'Authorization': `Basic ${btoa((environment as any).bauth)}`
}
```

## MefDevAuthInterceptor
If you need to add MEF.DEV Platform security headers to any HTTP request, you can achieve this by using the MefDevAuthInterceptor. This interceptor automatically adds headers from the PlatformHelper options.

Here's an example of how to initialize this feature:
```ts
{
  provide: HTTP_INTERCEPTORS,
  useClass: MefDevAuthInterceptor,
  multi: true
},
```
## Assets

After publication, the relative location where Angular assets are stored changes. While debugging on a local machine, the path is , but if the plugin is running under the platform, this path changes. For simple resolving of asset paths, it is recommended to use the [PlatformHelper.getAssetUrl() method](https://www.npmjs.com/package/@natec/mef-dev-platform-connector#general-methods). This method contains URL resolving logic, allowing you to avoid manually changing URLs to assets.

## Translation implementation

Built on [@ngx-translate/core](https://www.npmjs.com/package/@ngx-translate/core). The problem is that plug-in assets in the case of working within the platform are in an unusual location.

To obtain assets, the platform provides their location by @natec/mef-dev-platform-connector.

A custom loader is used for this solution case:
```ts
TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useClass: CustomLoader,
    deps: [HttpClient],
  }
}),
```

## Package scripts

In package.json, there are basic scripts provided for development and publishing purposes.

For more information about these scripts, you can find detailed documentation [here](https://www.npmjs.com/package/@natec/mef-dev-platform-connector#scripts) and [here](https://platform.mef.dev/dev_guides/first_ui_plugin.md#7-build-and-deploy).