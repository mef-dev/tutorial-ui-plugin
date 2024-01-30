import { Component, Input, OnChanges } from '@angular/core';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';
import { PlatformApiService } from '../../services/platform-api.service';

@Component({
  selector: 'app-sse',
  templateUrl: './sse.component.html',
  styleUrls: ['./sse.component.scss']
})
export class SseComponent implements OnChanges {

  public messageSseData: string = 'Hello world';
  public recordsOfSSe: any[] = [];

  constructor(private platformApiService: PlatformApiService) {}

  @Input() currentTab: number;

  ngOnChanges() {
      if (this.currentTab === 3) {
        this.subscribeToSse();
    }
  }

  public subscribeToSse(): void {
    PlatformHelper.getSseStream().subscribe(value => {
      console.log(value);
      this.recordsOfSSe.push(value);
    }, (error) => {
      console.error(error);
    });
  }

  public sendSseEvent() {

    const sendBody = {
      message: this.messageSseData,
      ServiceId: 160021,
      OrganizationId: 1,
    }

    this.platformApiService.sendSseEvent(sendBody).subscribe(value => {
      console.log(value)
    })
  }

}
