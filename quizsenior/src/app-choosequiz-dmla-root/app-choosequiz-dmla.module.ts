import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppChoosequizDmlaRoot } from './app-choosequiz-dmla-root';
import { AppChoosequizDmla } from './app-choosequiz-dmla';

@NgModule({
  declarations: [
    AppChoosequizDmla
  ],
  imports: [
    BrowserModule,
    AppChoosequizDmlaRoot
  ],
  providers: [],
  bootstrap: [AppChoosequizDmla]
})
export class AppChoosequizDmlaModule { }
