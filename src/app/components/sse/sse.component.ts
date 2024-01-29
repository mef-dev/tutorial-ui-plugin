import { Component } from '@angular/core';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';
import { PlatformApiService } from '../../services/platform-api.service';

@Component({
  selector: 'app-sse',
  templateUrl: './sse.component.html',
  styleUrls: ['./sse.component.scss']
})
export class SseComponent {

  public tab: string;
  public messageSseData: string = 'Hello world';
  public recordsOfSSe: any[] = [];

  constructor(private platformApiService: PlatformApiService) {}

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

  public openTab(tab: string): string {
    return this.tab = tab;
  }

}
