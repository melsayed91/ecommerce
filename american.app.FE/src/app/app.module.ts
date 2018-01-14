import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material';


// Backend SDKs
import * as authSDK from './common/BE.SDKs/Authorization';
import * as accountSDK from './common/BE.SDKs/AccountManager';

// ------------------------------------

/* Feature Modules */
import { CoreModule } from './core/core.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

// ------------------------------------

/* App Root */
import { AppComponent } from './app.component';

//Layout
import { MainLayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SearchBarComponent } from './layout/search-bar/search-bar.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    MatNativeDateModule,
    authSDK.SDKBrowserModule.forRoot(),
    accountSDK.SDKBrowserModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    MainLayoutComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

