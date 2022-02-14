import {Routes} from '@angular/router';
import {SimpleItemComponent} from './components/simple-item.component';
import {PLUGIN_VERSION} from 'src/environments/version';

// TODO: поправити роути для дебагу на локалхості і для публікації
export const routes: Routes = [
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

