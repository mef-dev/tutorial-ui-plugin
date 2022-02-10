import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SimpleItemComponent} from './components/simple-item.component';
import {PluginComponent} from './plugin.component';

const routes: Routes = [
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

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class PluginRoutingModule {}
