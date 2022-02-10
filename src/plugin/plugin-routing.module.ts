import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SimpleItemComponent} from './components/simple-item.component';
import {PLUGIN_VERSION} from 'src/environments/version';

// TODO: поправити роути для дебагу на локалхості і для публікації
const routes: Routes = [
    {
        path: ``,
        component: SimpleItemComponent,
    },
    {
        path: `item`,
        component: SimpleItemComponent,
    },
    {
        path: `plugins/${PLUGIN_VERSION.name}/item`,
        component: SimpleItemComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PluginRoutingModule {}

export const ROUTES = RouterModule.forRoot(routes);
