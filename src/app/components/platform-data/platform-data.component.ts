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

  getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

}
