import {Routes} from '@angular/router';
import {SimpleItemComponent} from './components/simple-item.component';
import {PluginComponent} from './plugin.component';

export const routes: Routes = [
    {
        path: '',
        component: PluginComponent,
        children:
            [
                {path: '', redirectTo: 'simple', pathMatch: 'full'},
                {path: 'simple', component: SimpleItemComponent},

            ]
    },
];

