import { Component, OnInit } from '@angular/core';
import { PlatformApiService } from '../../services/platform-api.service';
import { Observable } from 'rxjs';
import { WorkflowDTO } from '../../models/workflow.dto';

@Component({
  selector: 'app-plugin-info',
  templateUrl: './plugin-info.component.html',
  styleUrls: ['./plugin-info.component.scss']
})
export class PluginInfoComponent implements OnInit {

  pluginData: Observable<WorkflowDTO>

  constructor(private platformApiService: PlatformApiService) { }

  ngOnInit(): void {
    this.pluginData = this.platformApiService.pluginPostRequest();
  }

}
