
# UI package with Backend logic (Portal plugin)
> **Prerequisites:** Before you begin, make sure you have installed [nodejs](https://nodejs.org) and [@angular/cli](https://www.npmjs.com/package/@angular/cli)*

> **Note:** This plugin has been tested on the following versions of @angular/cli: [12.2.17](https://www.npmjs.com/package/@angular/cli/v/12.2.17 "12.2.17"), [13.3.8](https://www.npmjs.com/package/@angular/cli/v/13.3.8 "13.3.8"), [14.3.0](https://www.npmjs.com/package/@angular/cli/v/14.2.11 "14.3.0"), [15.2.8](https://www.npmjs.com/package/@angular/cli/v/15.2.8 "15.2.8"), [16.2.8](https://www.npmjs.com/package/@angular/cli/v/16.2.8 "16.2.8")

This repository serves as an extended example of a package within the [mef.dev](https://mef.dev/) platform.

This plugin does **not** include business logic implementation. Its purpose is to demonstrate the Angular project design for interaction with a custom backend within the platform.

The repository is intended to run as a `Portal` type of package together with the package: [tutorial-backend-plugin](https://github.com/mef-dev/tutorial-backend-plugin).

The process of building and uploading packages does not differ from previous guides, except for selecting the `Portal` type of package during registration. This type of package is oriented towards Frontend + Backend operation; therefore, the data for the frontend and backend components should be configured properly.

> Refer to the [guide to register a package into the platform](https://mef.dev/dev_guides/upload_ui_plugin.md).


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

For more information about the base selector, refer to [this guide](https://mef.dev/dev_guides/first_ui_plugin.md#3-changing-the-base-selector)

## Routes feature

To ensure proper routing functionality, it's essential that all actual paths are contained within the children section. Failure to do so may lead to unpredictable behavior, where navigating within the plugin modifies the entire path, including platform navigation. While this won't render the plugin inoperable, it can make further use of the platform unpredictable.

Additionally, for correct navigation, the base paths should be passed through the updatePluginsRoutes(Routes) method. More details can be found [here](https://mef.dev/dev_guides/first_ui_plugin.md#4-routing-changes).

As a result, the declaration of paths should look as follows:
```
// src/app/app-routing.module.ts
import { PlatformHelper } from  '@natec/mef-dev-platform-connector';
...
// const  routes: Routes = [];
const  routes: Routes = PlatformHelper.updatePluginsRoutes([
  {
    path:"",
      children:[
        // insert routes here
      ]
  }
]);
...
```

## PlatformConnectionResolver

All cooperation with the platform is possible only after initializing platform data in @natec/mef-dev-platform-connector.

When loading this data, PlatformHelper must have initialization options. If the plugin is running in the platform (production mode), this process works automatically. However, if the plugin is being served on a local machine (development mode), you must manually set the basic information about the plugin.

This process occurs specifically in the `src/app/resolvers/platform-connection.resolver.ts` file.

## environment.ts 

In order to send requests, authentication is typically required, often accomplished through token-based authentication in the platform. However, for testing purposes, Basic Auth can be used. You can create the necessary login-password pair for Basic Auth access to the API in the SETTINGS \ CREDENTIALS section of your profile. This section can be accessed by clicking on the user icon in the upper right corner and selecting the SETTINGS menu. Upon clicking the ADD button, you can set the user login and password for Basic Auth.

environment.ts is an excellent place to declare important information for publishing and serving. In the PlatformConnectionResolver, during development mode, we add security headers provided by Basic credentials, which are stored in environment.ts.

```
headers: {
  'Authorization': `Basic ${btoa((environment as any).bauth)}`
}
```
## MefDevAuthInterceptor

If you need to add MEF.DEV Platform security headers to any HTTP request, you can achieve this by using the MefDevAuthInterceptor. This interceptor automatically adds headers from the PlatformHelper options.

Here's an example of how to initialize this feature:

```
// src/app/app.module.ts
{
  provide: HTTP_INTERCEPTORS,
  useClass: MefDevAuthInterceptor,
  multi: true
},
```

## Translation implementation

Built on [@ngx-translate/core](https://www.npmjs.com/package/@ngx-translate/core). The problem is that **plug-in assets in the case of working within the platform are in an unusual location**.

To obtain assets, the platform provides their location by [@natec/mef-dev-platform-connector](https://www.npmjs.com/package/@natec/mef-dev-platform-connector).

A custom loader is used for this solution case:
```
// src/app.module.ts
...
TranslateModule.forRoot({
  loader: {
    provide:  TranslateLoader,
    useClass:  CustomLoader,
    deps: [HttpClient],
  }
}),
...
```

# Package scripts

In package.json, there are basic scripts provided for development and publishing purposes.

For more information about these scripts, you can find detailed documentation [here](https://www.npmjs.com/package/@natec/mef-dev-platform-connector#scripts) and [here](https://www.npmjs.com/package/@natec/mef-dev-platform-connector#scripts).