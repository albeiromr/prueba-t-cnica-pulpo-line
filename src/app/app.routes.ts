import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WelcomeBackComponent } from './pages/home/welcome-back.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RouterConstans } from './shared/constants/router.constants';

export const routes: Routes = [
    { path: "", redirectTo: RouterConstans.home, pathMatch: 'full' },
    {
        path: "dashboard", component: DashboardComponent, children: [
            { path: "", redirectTo: RouterConstans.home, pathMatch: 'full' },
            { path: "welcome-back", component: WelcomeBackComponent }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];
