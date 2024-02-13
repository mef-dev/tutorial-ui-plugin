import { Component, OnInit } from '@angular/core';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';

@Component({
  selector: 'app-sse',
  templateUrl: './sse.component.html',
  styleUrls: ['./sse.component.scss']
})

export class SseComponent implements OnInit {

  public messageSseData: string = 'Hello world';
  public sseAnswersList: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.subscribeToSse();
  }

  public subscribeToSse(): void {
    PlatformHelper.getSseStream().subscribe({
      next:  (x) => this.sseAnswersList.unshift(x),
      error: (e) => console.error(e)
    })
  }

  public sendSseEvent() {
    PlatformHelper.sendSseStream({ msg: this.messageSseData }).subscribe({
      next:  (x) => console.log(x),
      error: (e) => console.error(e)
    })
  }
}
