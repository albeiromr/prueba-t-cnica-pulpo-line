import { Routes } from '@angular/router';
import { DashboardComponent } from './shared/pages/dashboard/dashboard.component';
import { WheatherComponent } from './clima/pages/weather/weather.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';
import { RouterConstans } from './shared/constants/router.constants';
import { HistoryComponent } from './historial/pages/history/history.component';

export const routes: Routes = [
    { path: "", redirectTo: RouterConstans.weather, pathMatch: 'full' },
    {
        path: "dashboard", component: DashboardComponent, children: [
            { path: "", redirectTo: RouterConstans.weather, pathMatch: 'full' },
            { path: "clima", component: WheatherComponent },
            { path: "historial", component: HistoryComponent }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];
