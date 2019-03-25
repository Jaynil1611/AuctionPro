import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatSelectModule, MatRadioModule, MatCardModule,MatStepperModule } from '@angular/material';
import { DataTableComponent } from './data-table/data-table.component';
import { LoginComponent } from './forms/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './forms/sign-up/sign-up.component';

import { UserService } from "./services/user.service";
import { AuthService } from "./services/auth.service";
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DataTableComponent,
    LoginComponent,
    SignUpComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    RouterModule.forRoot([
      {path:"",component:UserProfileComponent},
      {path:"Login",component:LoginComponent},
      {path:"Sign_up",component:SignUpComponent}
    ]),
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule
    ],
  providers: [UserService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
