import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

export const tabPaths = ['plugin-information', 'request-to-platform', 'request-to-plugin-api', 'receive-sse', 'bpmn', 'assets-access'];

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {

  get currentTabIndex(): number {
    return tabPaths.findIndex(x => this.router.url.includes(x))
  }

  constructor(
    private router: Router,
    private translateService: TranslateService
    ) {
  }

  ngOnInit() {
    console.log(this.translateService.instant('Translate instant!'));
  }

  tabsetSelectChange(event: any) {
    const urlList = this.router.url.split('/');
    let newUrl = '/';
    for (let i = 1; i < urlList.length - 1; i++) {
      newUrl += `${urlList[i]}/`;      
    }
    newUrl += tabPaths[event.index]

    this.router.navigateByUrl(newUrl);
  }
}
