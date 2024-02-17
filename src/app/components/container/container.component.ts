import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {

  private tabPaths = ['plugin-information', 'request-to-platform', 'request-to-plugin-api', 'receive-sse', 'bpmn'];
  get currentTabIndex(): number {
    return this.tabPaths.findIndex(x => this.router.url.includes(x))
  }

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute
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
    newUrl += this.tabPaths[event.index]

    this.router.navigateByUrl(newUrl);
  }
}
