import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material';
import { environment } from '../environments/environment';

// Backend SDKs
import * as authSDK from './common/BE.SDKs/Authorization';
import * as accountSDK from './common/BE.SDKs/AccountManager';
import * as attachmentSDK from './common/BE.SDKs/attachment';
import * as sysCodeSDK from './common/BE.SDKs/sysCodes';
import * as productSDK from './common/BE.SDKs/Products';
import * as quotationSDK from './common/BE.SDKs/quotations';
import * as messagingSDK from './common/BE.SDKs/Messaging';

authSDK.LoopBackConfig.setBaseURL('//' + environment.baseUrl + ':1111')
accountSDK.LoopBackConfig.setBaseURL('//' + environment.baseUrl + ':2222')
attachmentSDK.LoopBackConfig.setBaseURL('//' + environment.baseUrl + ':5000')
sysCodeSDK.LoopBackConfig.setBaseURL('//' + environment.baseUrl + ':5555')
productSDK.LoopBackConfig.setBaseURL('//' + environment.baseUrl + ':7777')
quotationSDK.LoopBackConfig.setBaseURL('//' + environment.baseUrl + ':3333')
messagingSDK.LoopBackConfig.setBaseURL('//' + environment.baseUrl + ':3000')

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
    CoreModule,
    AppRoutingModule,
    MatNativeDateModule,
    authSDK.SDKBrowserModule.forRoot(),
    accountSDK.SDKBrowserModule.forRoot(),
    sysCodeSDK.SDKBrowserModule.forRoot(),
    attachmentSDK.SDKBrowserModule.forRoot(),
    productSDK.SDKBrowserModule.forRoot(),
    quotationSDK.SDKBrowserModule.forRoot(),
    messagingSDK.SDKBrowserModule.forRoot()
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

