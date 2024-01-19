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

    const objectToSend = {
      name: 'walkdog'
    }

    this.platformApiService.createItem(objectToSend).subscribe(value => {
      this.data = value;
    })

  }

  getTableKeys(): string[] {
    return Object.keys(this.data);
  }


}
