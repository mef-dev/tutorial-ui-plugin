import { Component, OnInit } from '@angular/core';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';
import { PlatformApiService } from '../../services/platform-api.service';
import { SseResponseModel } from '../../models/sse-response-model';
import { SseBodyModel } from '../../models/sse-body,model';

@Component({
  selector: 'app-sse',
  templateUrl: './sse.component.html',
  styleUrls: ['./sse.component.scss']
})

export class SseComponent implements OnInit {

  public messageSseData: string = 'Hello world';
  public sseAnswersList: SseResponseModel[] = [];

  constructor(private platformApiService: PlatformApiService) {}

  ngOnInit(): void {
    this.subscribeToSse();
  }

  public subscribeToSse(): void {
    PlatformHelper.getSseStream().subscribe(value => {
      console.log(value);
      this.sseAnswersList.push(value);
    }, (error) => {
      console.error(error);
    });
  }

  public sendSseEvent() {

    const sendBody: SseBodyModel = new SseBodyModel(this.messageSseData, PlatformHelper.PluginDataSync.pluginID);

    this.platformApiService.sendSseEvent(sendBody).subscribe(value => {
      console.log(value)
    })
  }

}
