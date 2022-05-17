import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { MoviesComponent } from './views/movies/movies.component';
import { SettingsComponent } from './views/settings/settings.component';
import { TvseriesComponent } from './views/tvseries/tvseries.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'tvseries', component: TvseriesComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '',   redirectTo: '/settings', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
