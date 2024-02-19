import { Component } from '@angular/core';
import { PlatformHelper } from '@natec/mef-dev-platform-connector';

@Component({
  selector: 'app-assets-access',
  templateUrl: './assets-access.component.html',
  styleUrls: ['./assets-access.component.scss']
})
export class AssetsAccessComponent {

  // Variant 1
  get assetUrl():string{
    return PlatformHelper.getAssetUrl()
  } 

  // Variant 2
  PlatformHelper = PlatformHelper;

  // Variant 3
  formatedAssetUrl: string = PlatformHelper.getAssetUrl() + '/images/program_cycle_fin.jpg';

  constructor(){}

}
