
# UI plugin

> Перед початком потрібно встановити [nodejs](https://nodejs.org/) та [@angular/cli](https://www.npmjs.com/package/@angular/cli)

Даний репозиторій є розширеним варіантом архітектури плагіна для платформи [mef.dev](https://mef.dev/). Для кращого розуміння мотвів та рішень, радимо ознайомитись з [просесом створення базового плагіна](https://mef.dev/dev_guides/first_ui_plugin.php). 

Плагін **не** матиме реалізацій коду. Його мета- окреслення базової архітектури проекту та надання прикладів реалізації стандартних засобів розробки Angular-аплікацій. 

Протестовано на таких версіях @angular/cli: [12.2.17](https://www.npmjs.com/package/@angular/cli/v/12.2.17 "12.2.17"), [13.3.8](https://www.npmjs.com/package/@angular/cli/v/13.3.8 "13.3.8") 

Будь який плагін для платформи не втрачає можливості запускатися локально за допомогою команди `ng serve`. Цей режим роботи характеризується відсутністю засобів, що надає платформа. Функціонал представлений тут, допомагає зберегти часткову працездатність в такому режимі. 

## class  PlatformConnectorService
Призначений для зручної роботи з відправленням HTTP запитів. Його задачею є привести отрмання сервісу для відправлення запитів в зрозумілій та близькій для Angular-розробника формі(за допомогою  [HttpClient](https://angular.io/api/common/http/HttpClient#httpclient "Link to this heading")).   

Формат сервісу допомагає використовувати [Dependency injection](https://angular.io/guide/dependency-injection). Крім того, в випадку локального запуску сервіс може надавати власну реалізацію інтерфейсу `IHttpService`, в данній реалізації це `HttpService`.

## interface IHttpService
Являє собою обгортку для зтандартних HTTP запитів. Платформа надає клас що реалізує даний сервіс для відправлення запитів від імені платформи. Також його можна реалізовувати власними силами в любій зручній формі.

## Реалізація перекладу
Збудована на основі [@ngx-translate/core](https://www.npmjs.com/package/@ngx-translate/core). Проблема заключається в тому, що **ассети плагіна у випадку роботи в межах платформи знаходяться не в стандартному місці розміщення**. 

Для отримання ассетів платформа за допомогою [@natec/mef-dev-platform-connector](https://www.npmjs.com/package/@natec/mef-dev-platform-connector), надає місце їх розміщення. 

Для вирішення використовуєтья кастомний лоадер:
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

## npm скрипти
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
Команда використовує скрипт з  [@natec/mef-dev-platform-connector](https://www.npmjs.com/package/@natec/mef-dev-platform-connector), який генерує файли із специфікацією конкретної версією плагіну. 

Він добавлений в усі методи, що генерують нові версії аплікації.

Результати його виконання використовують ассети, також енвайропменти:
 ```
// src/environments/environment.ts

import { PLUGIN_VERSION } from  './version;
export  const  environment = {
	production:  false,
	version:  PLUGIN_VERSION.version // <--
};
 ```

### build:plugin
Скрипт для генерації збірки плагіну. 


### build:plugin:watch
Скрипт для генерації збірки плагіну, в безперебійному режимі, та *без оптимізації коду*. Може використовуватись для відладки.