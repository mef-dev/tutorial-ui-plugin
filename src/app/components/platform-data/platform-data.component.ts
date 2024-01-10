import { Component, OnInit } from '@angular/core';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';
import { PlatformConnectorService } from '../../services/platform-connector.service';

@Component({
  selector: 'app-platform-data',
  templateUrl: './platform-data.component.html',
  styleUrls: ['./platform-data.component.scss']
})
export class PlatformDataComponent implements OnInit {

  pluginData: any;
  assetUrl: string;

  constructor(private platformConnectorService: PlatformConnectorService) { }

  ngOnInit(): void {
    this.pluginData = this.platformConnectorService.PluginData;
    this.assetUrl = PlatformHelper.getAssetUrl();
  }

}
