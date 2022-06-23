import { Component, OnInit } from '@angular/core';
import { PlatformConnectorService } from 'src/app/services/platform-connector.service';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';

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
