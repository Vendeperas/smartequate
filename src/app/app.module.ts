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
import { NgProgressModule } from '@ngx-progressbar/core';
import { HttpClientModule } from '@angular/common/http';
import { InfoModalComponent } from './info-modal/info-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { DataTablesModule } from 'angular-datatables';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { CompareComponent } from './compare/compare.component';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    SearchComponent,
    InfoModalComponent,
    CompareComponent,
    SearchModalComponent,
    FooterComponent
  ],
  imports: [
    MatSliderModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatTooltipModule,
    DataTablesModule,
    MatCardModule,
    MatExpansionModule,
    MatDialogModule,
    HttpClientModule,
    NgProgressModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ SidenavService,  {provide: AppComponent, useClass: AppComponent}],
  bootstrap: [AppComponent],
  entryComponents: [InfoModalComponent, SearchModalComponent]
})
export class AppModule { }
