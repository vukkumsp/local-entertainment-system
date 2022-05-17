import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContainerComponent } from './layout/container/container.component';
import { SettingsComponent } from './views/settings/settings.component';
import { HomeComponent } from './views/home/home.component';
import { MoviesComponent } from './views/movies/movies.component';
import { TvseriesComponent } from './views/tvseries/tvseries.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    SettingsComponent,
    HomeComponent,
    MoviesComponent,
    TvseriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
