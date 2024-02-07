import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {

  private tabPaths = ['plugin-information', 'request-to-platform', 'request-to-plugin-api', 'receive-sse'];
  public currentTabIndex = 0;

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private translateService: TranslateService
      ) {}

  ngOnInit() {
    console.log(this.translateService.instant('test'));
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveTabFromURL();
    });
  }

  private updateActiveTabFromURL() {
    const currentRelativePath = this.activatedRoute.snapshot.firstChild?.routeConfig?.path;
    if (currentRelativePath) {
      this.currentTabIndex = this.tabPaths.indexOf(currentRelativePath);
      if (this.currentTabIndex === -1) {
        this.currentTabIndex = 0;
      }
    } else {
      this.currentTabIndex = 0;
    }
  }

  getTabValue(event: any) {
    if (event.index !== this.currentTabIndex) {
      this.currentTabIndex = event.index;
      this.navigateToTab(event.index);
    }
  }

  private navigateToTab(index: number) {
    const newPath = this.tabPaths[index];
    this.router.navigate([newPath], { relativeTo: this.activatedRoute });
  }



}
