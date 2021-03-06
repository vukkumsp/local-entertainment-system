import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChapterComponent } from './views/chapter/chapter.component';
import { HomeComponent } from './views/home/home.component';
import { MovieComponent } from './views/movie/movie.component';
import { MoviesComponent } from './views/movies/movies.component';
import { SeriesComponent } from './views/series/series.component';
import { SettingsComponent } from './views/settings/settings.component';
import { TvseriesComponent } from './views/tvseries/tvseries.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movie/:name', component: MovieComponent },
  { path: 'tvseries', component: TvseriesComponent },
  { path: 'tvseries/:name', component: SeriesComponent },
  { path: 'tvseries/:series/:chapter', component: ChapterComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '',   redirectTo: '/tvseries', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
