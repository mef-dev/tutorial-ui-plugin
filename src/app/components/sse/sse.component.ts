import { Component } from '@angular/core';
import { SseConnectionStatus } from '../../enums/sse-connection-status';
import { Observable } from 'rxjs';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';
import { PlatformApiService } from '../../services/platform-api.service';

@Component({
  selector: 'app-sse',
  templateUrl: './sse.component.html',
  styleUrls: ['./sse.component.scss']
})
export class SseComponent {

  public tab: string;
  public stream: Observable<any>;
  public subscribeSseStatus: SseConnectionStatus = SseConnectionStatus.disabled;

  constructor(private platformApiService: PlatformApiService) {}

  public subscribeToSse(): void {
    PlatformHelper.getSseStream().subscribe(value => {
      this.subscribeSseStatus = SseConnectionStatus.estabilished;
      this.stream = value;
      console.log(this.stream)
    }, (error) => {
      this.subscribeSseStatus = SseConnectionStatus.disabled;
      console.error(error);
    });
  }

  public sendSseEvent() {
    this.platformApiService.sendSseEvent(123, 'Hello').subscribe(value => {
      console.log(value)
    })
  }

  public openTab(tab: string): string {
    return this.tab = tab;
  }

  protected readonly SseConnectionStatus = SseConnectionStatus;
}
