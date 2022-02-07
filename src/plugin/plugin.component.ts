import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'plugin-root',
    templateUrl: './plugin.component.html'
})

export class PluginComponent implements OnInit {
    serviceOk = false;

    constructor(private router: Router) {
        this.router.navigate([window.location.pathname]);
    }

    ngOnInit() {
        this.serviceOk = true;
    }
}
