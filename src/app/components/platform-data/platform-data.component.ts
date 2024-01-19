import { Component, OnInit } from '@angular/core';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';

@Component({
  selector: 'app-platform-data',
  templateUrl: './platform-data.component.html',
  styleUrls: ['./platform-data.component.scss']
})
export class PlatformDataComponent implements OnInit {

  pluginData: any = {};
  pluginLocalData: any = {};
  assetUrl: string;

  constructor() { }

  ngOnInit(): void {
    PlatformHelper.getPluginData().subscribe(value => {
      console.log('Platform local data: ', PlatformHelper.getPluginLocalData());
      this.pluginLocalData = PlatformHelper.getPluginLocalData();

      this.pluginData = value;
    });
    this.assetUrl = PlatformHelper.getAssetUrl();
    console.log(this.pluginData);
  }

  getTableKeys(value: any): string[] {
    return Object.keys(value);
  }

}
