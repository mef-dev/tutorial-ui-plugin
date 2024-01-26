import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {

  constructor(private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.translate.instant('test'));
  }

  getTabValue(value: any) {
    switch(value.index) {
      case 0:
        this.router.navigate(['platform-data']);
        break;
      case 1:
        this.router.navigate(['plugin-info']);
        break;
      case 2:
        this.router.navigate(['plugin-api']);
        break;
      case 3:
        this.router.navigate(['sse']);
        break;
      default:
        this.router.navigate(['platform-data']);
        break;
    }
  }

}
