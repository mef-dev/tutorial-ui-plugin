import {Routes} from '@angular/router';
import {SimpleItemComponent} from './components/simple-item.component';
import {PluginComponent} from './plugin.component';

// TODO: поправити роути для дебагу на локалхості і для публікації
export const routes: Routes = [
    {
        path: '',
        component: PluginComponent,
        children:
            [
                {path: '', redirectTo: 'item', pathMatch: 'full'},
                {path: 'item', component: SimpleItemComponent},
            ]
    },
];

