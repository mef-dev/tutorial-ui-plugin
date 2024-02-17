import { Component, OnInit } from '@angular/core';
import { PlatformApiService } from 'src/app/services/platform-api.service';

@Component({
  selector: 'app-bpmn',
  templateUrl: './bpmn.component.html',
  styleUrls: ['./bpmn.component.scss']
})
export class BpmnComponent implements OnInit {
  
  constructor(private platformApiService: PlatformApiService) {}

  status: 'inProgress' | 'nullResp' | 'errorResp' | 'ok';  
  resp: any = null;

  ngOnInit(): void {
    this.status = 'inProgress';
    this.platformApiService.executeStandartBpmn({ hello: 'World' }).subscribe({
      next: (v) => {
        console.log(v);
        this.resp = v;
        this.status = v ? 'ok' : 'nullResp';
      },
      error: (e) => {
        console.error(e);
        this.resp = e;
        this.status = 'errorResp';
      }
    })
  }
}
