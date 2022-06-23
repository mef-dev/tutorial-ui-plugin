import { Component, OnInit } from '@angular/core';
import { PlatformConnectorService } from 'src/app/services/platform-connector.service';
import { PlatformHelper } from 'mef-dev-platform-connector';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-platform-data',
  templateUrl: './platform-data.component.html',
  styleUrls: ['./platform-data.component.scss']
})
export class PlatformDataComponent implements OnInit {

  pluginData: any;
  assetUrl: string;

  constructor(
    private platformConnectorService: PlatformConnectorService
    ) { }

  ngOnInit(): void {
    this.pluginData = this.platformConnectorService.PluginData;
    this.assetUrl = PlatformHelper.getAssetUrl();
  }

}
