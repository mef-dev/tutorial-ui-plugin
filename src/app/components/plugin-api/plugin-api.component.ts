import { Component, OnInit } from '@angular/core';
import { PlatformApiService } from '../../services/platform-api.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-plugin-api',
  templateUrl: './plugin-api.component.html',
  styleUrls: ['./plugin-api.component.scss']
})
export class PluginApiComponent implements OnInit {

  getData: Observable<any>;
  postData: any;

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
