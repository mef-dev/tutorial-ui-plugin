import { Component, OnInit } from '@angular/core';
import { PlatformApiService } from '../../services/platform-api.service';
import { Observable } from 'rxjs';
import { PluginEndpointsResponseModel } from '../../models/plugin-endpoints-response.model';

@Component({
  selector: 'app-plugin-api',
  templateUrl: './plugin-api.component.html',
  styleUrls: ['./plugin-api.component.scss']
})
export class PluginApiComponent implements OnInit {

  getData: Observable<PluginEndpointsResponseModel>;
  postData: PluginEndpointsResponseModel;

  constructor(private platformApiService: PlatformApiService) { }

  ngOnInit(): void {
    const objectToSend = {
      name: 'walkdog'
    }

    this.getData = this.platformApiService.get();
    this.platformApiService.createItem(objectToSend).subscribe(value => {
      this.postData = value;
    })
  }

}
