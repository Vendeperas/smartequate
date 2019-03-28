import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import {MatButtonModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { SidenavService } from './sidenav-service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    SearchComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
