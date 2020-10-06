import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpInterceptorProviders } from './core/interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppConfig } from './core/services/appconfig.service';
import { CommonDataService } from './core/services/common-data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { ToastrModule } from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import { SelectedCellComponent } from './shared/components/selected-cell/selected-cell.component';

@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    FormsModule,
    SharedModule
  ],
  entryComponents: [
    SelectedCellComponent
 ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConfig], multi: true },
    HttpInterceptorProviders,
    CommonDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function initConfig(config: AppConfig) { return () => config.load() }
