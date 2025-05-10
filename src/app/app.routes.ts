import { Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { BrowserComponent } from './browser/browser.component';
import { VideoComponent } from './video/video.component';
import { PlayerComponent } from './player/player.component';

export const routes: Routes = [
     {
        path: "",
        component: NavComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full', },
            { path: "home", component: HomeComponent },
            { path: "vidoes", component: BrowserComponent },
            { path: "info/:media_type/:id", component:VideoComponent },
            {path:"player/:id",component:PlayerComponent}
        ],
    },
];
