import { Component, OnInit } from '@angular/core';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-platform-data',
  templateUrl: './platform-data.component.html',
  styleUrls: ['./platform-data.component.scss']
})
export class PlatformDataComponent implements OnInit {

  pluginData: any = {};
  pluginLocalData: any = {};
  assetUrl: string;
  mode: string;

  constructor() { }

  ngOnInit(): void {
    this.mode = environment.production ? 'production' : 'development'
    PlatformHelper.getPluginData().subscribe(value => {
      console.log('Platform local data: ', PlatformHelper.getPluginLocalData());
      this.pluginLocalData = PlatformHelper.getPluginLocalData();

      this.pluginData = value;
    });
    this.assetUrl = PlatformHelper.getAssetUrl();
  }

}
