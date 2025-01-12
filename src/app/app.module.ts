import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';  // 引入 CalendarModule
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [    
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    BrowserAnimationsModule,
    CalendarModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    InputNumberModule,
    AccordionModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
