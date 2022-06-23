import { Component } from '@angular/core';

@Component({
  selector: 'test-app', // selector is pluginUIName(in platform)
  template: `<router-outlet></router-outlet>`
})
export class AppComponent{
  title = 'platform-connector';
  constructor(  ){
  }
}
