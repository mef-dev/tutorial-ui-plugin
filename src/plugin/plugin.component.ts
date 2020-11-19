import { Component, Input, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  template: ` <router-outlet *ngIf="serviceOk"></router-outlet> `,
})
export class PluginComponent {
  serviceOk = false;
  constructor(private router: Router) 
  {
    this.router.navigate([window.location.pathname]);
  }

  ngOnInit() {
    this.serviceOk = true;
  }
}
