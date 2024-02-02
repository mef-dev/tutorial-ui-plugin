import { Component, OnInit } from '@angular/core';
import { PlatformApiService } from '../../services/platform-api.service';
import { Observable } from 'rxjs';
import { PluginDataResponseModel } from '../../models/plugin-data-response.model';

@Component({
  selector: 'app-plugin-info',
  templateUrl: './plugin-info.component.html',
  styleUrls: ['./plugin-info.component.scss']
})
export class PluginInfoComponent implements OnInit {

  pluginData: Observable<PluginDataResponseModel>

  constructor(private platformApiService: PlatformApiService) { }

  ngOnInit(): void {
    this.pluginData = this.platformApiService.getPluginData();
  }

}
