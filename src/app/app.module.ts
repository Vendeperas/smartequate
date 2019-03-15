import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import {MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    SearchComponent
  ],
  imports: [
    MatButtonModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
