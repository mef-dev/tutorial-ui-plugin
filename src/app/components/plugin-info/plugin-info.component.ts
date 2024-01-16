import { Component, OnInit } from '@angular/core';
import { PlatformApiService } from '../../services/platform-api.service';

@Component({
  selector: 'app-plugin-info',
  templateUrl: './plugin-info.component.html',
  styleUrls: ['./plugin-info.component.scss']
})
export class PluginInfoComponent implements OnInit {

  data: any;

  constructor(private platformApiService: PlatformApiService) { }

  ngOnInit(): void {
    this.platformApiService.getInfo().subscribe((data: any) => {
          this.data = data;
    });
  }

}
