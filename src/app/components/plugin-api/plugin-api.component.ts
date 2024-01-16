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
    const sendData = {
      name: "walk dog"
    }

    this.platformApiService.createItem(sendData).subscribe((data: any): void => {
      this.data = data;
    });

  }
}
