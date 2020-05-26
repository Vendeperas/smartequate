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
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { SelectService } from './select-service';
import { LoginComponent } from './login/login.component';
import { ReloginComponent } from './relogin/relogin.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from './user-service';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OauthGuard } from './oauth-guard';
import { Interceptor } from './interceptor';
import { LoadingService } from './loading-service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    SearchComponent,
    InfoModalComponent,
    CompareComponent,
    SearchModalComponent,
    LoginComponent,
    ReloginComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    MatSnackBarModule,
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
  providers: [ SidenavService,  {provide: AppComponent, useClass: AppComponent}, {provide: SelectService, useClass: SelectService},
    {provide: UserService, useClass: UserService}, {provide: OauthGuard, useClass: OauthGuard},
    {provide: LoadingService, useClass: LoadingService},
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [InfoModalComponent, SearchModalComponent, ReloginComponent]
})
export class AppModule { }
