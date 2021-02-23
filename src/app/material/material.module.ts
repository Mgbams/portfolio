import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule } from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatListModule} from '@angular/material/list'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatStepperModule} from '@angular/material/stepper';

const MaterialComponents = [
 MatInputModule,
 MatFormFieldModule,
 MatButtonModule,
 MatIconModule,
 MatGridListModule,
 MatChipsModule,
 MatTabsModule,
 MatListModule,
 MatCardModule,
 MatStepperModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
