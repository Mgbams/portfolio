import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips'; 
import {MatTabsModule} from '@angular/material/tabs'; 

const MaterialComponents = [
 MatInputModule,
 MatFormFieldModule,
 MatButtonModule,
 MatIconModule,
 MatGridListModule,
 MatChipsModule,
 MatTabsModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
