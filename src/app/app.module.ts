import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxBeanValidationService} from '../../projects/ngx-bean-validation/src/lib/ngx-bean-validation.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule
  ],
  providers: [NgxBeanValidationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
