
# Creation of UI package with Backend logic

> *Prerequisites. Before you begin, you have got to install [nodejs](https://nodejs.org) and [@angular/cli](https://www.npmjs.com/package/@angular/cli)*

> *Note. Tested on the following versions of @angular/cli: [12.2.17](https://www.npmjs.com/package/@angular/cli/v/12.2.17 "12.2.17"), [13.3.8](https://www.npmjs.com/package/@angular/cli/v/13.3.8 "13.3.8"), [14.3.0](https://www.npmjs.com/package/@angular/cli/v/14.2.11 "14.3.0"), [15.2.8](https://www.npmjs.com/package/@angular/cli/v/15.2.8 "15.2.8"), [16.1.0](https://www.npmjs.com/package/@angular/cli/v/16.1.0 "16.1.0")*
 
> Any UI platform package does not lose the ability to run locally with the command `ng serve`. This mode of operation is characterized by the lack of capabilities provided by the platform "on the air". The functionality presented here helps to keep partial capabilities for this operation mode.

This repository is an extended example of the package within the [mef.dev](https://mef.dev/) platform. Design-wise, we recommend using this example after covering **[the process of creating the basic plugin](https://mef.dev/dev_guides/first_ui_plugin.md)**.

This plugin will **not** have business logic implementation. Its purpose is to explain the Angular project design for interaction with a custom backend within the platform.

The repository is designed to run as `Portal` type of package together with the package example: [tutorial-backend-plugin](https://github.com/mef-dev/tutorial-backend-plugin).

## Portal type of package

The process of building and uploading packages does not differ from previous guides, except selecting the `Portal` type of package by registration. This type of package is oriented to Frontend + Backend operation, respectively, the data for the front and back component should be configured properly.

## class PlatformConnectorService

Designed to easy handling HTTP requests. Its purpose is to implement the HTTP sending service to a transparent and close to Angular-developer form (using [HttpClient](https://angular.io/api/common/http/HttpClient#httpclient)).   

The implementation service helps to use [Dependency injection](https://angular.io/guide/dependency-injection). Moreover, in the case of local running, the service will provide its own implementation of the `IHttpService` interface, for this example that is the `HttpService` implementation.

## interface IHttpService

It is a wrapper for standard HTTP requests. The platform provides a class that implements this service to send requests on behalf of the platform. It can also be implemented as your own in any convenient form.

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

## npm scripts
```
// package.json
...
"scripts": {
	"ng": "ng",
	"start": "npm run generate-version-file && ng serve",
	"build": "npm run generate-version-file && ng build",
	"watch": "npm run generate-version-file && ng build --watch --configuration development",
	"test": "ng test",
	"generate-version-file": "npm explore @natec/mef-dev-platform-connector -- npm run generate-version-file",
	"build:plugin": "npm run generate-version-file && ng build --prod --output-hashing none --single-bundle",
	"build:plugin:watch": "ng build --output-hashing none --single-bundle --watch --optimization=false"
},
...
```

### generate-version-file

The command use the script from [@natec/mef-dev-platform-connector](https://www.npmjs.com/package/@natec/mef-dev-platform-connector) to generate the version specification file for the package. 

It is included into all methods are genereting new versions of packages.
Execution result is used by assets and environments:
 ```
// src/environments/environment.ts

import { PLUGIN_VERSION } from  './version;
export  const  environment = {
	production:  false,
	version:  PLUGIN_VERSION.version // <--
};
 ```

### build:plugin
Script for generation a build of package version. 


### build:plugin:watch
Script for generation a build of debug package version, in uninterrupted mode, and *without code optimization*. Can be used for debug.

# Useful links

> *Guide to register package into the platform: https://mef.dev/dev_guides/upload_ui_plugin.md *
