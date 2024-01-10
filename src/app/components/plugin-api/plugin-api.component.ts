import { Component, OnInit } from '@angular/core';
import { PlatformApiService } from '../../services/platform-api.service';

@Component({
  selector: 'app-plugin-api',
  templateUrl: './plugin-api.component.html',
  styleUrls: ['./plugin-api.component.scss']
})
export class PluginApiComponent implements OnInit {

  data: any;

  constructor(private platformApiService: PlatformApiService) { }

  ngOnInit(): void {
    this.platformApiService.get().subscribe((data: any) => {
      this.data = data;
    })

  }

}
