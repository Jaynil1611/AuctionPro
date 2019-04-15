import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ProductsComponent } from "./products/products.component";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatSelectModule, MatRadioModule, MatCardModule,MatStepperModule,MatTabsModule,MatDatepickerModule,MatNativeDateModule, MatSnackBarModule, MatChipsModule, MatBottomSheet, MatBottomSheetModule } from '@angular/material';
import { DataTableComponent } from './data-table/data-table.component';
import { LoginComponent } from './forms/login/login.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SignUpComponent } from './forms/sign-up/sign-up.component';

import { UserService } from "./services/user.service";
import { AuthService } from "./services/auth.service";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuctionAdminComponent,BottomSheetOverviewExampleSheet } from './auction-admin/auction-admin.component';
import { AuctionComponent } from './auction/auction.component';
import { AuctionService } from './services/auction.service';
import { WebsocketService } from './services/websocket.service';
import { ProductService } from './services/product.service';
import { AuctionAdminService } from './services/auction-admin.service';
import { HomeComponent } from './home/home.component';
import { AuctionViewComponent } from './auction/auction-view/auction-view.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DataTableComponent,
    ProductsComponent,
    LoginComponent,
    SignUpComponent,
    UserProfileComponent,
    AuctionAdminComponent,
    AuctionComponent,
    BottomSheetOverviewExampleSheet,
    HomeComponent,
    AuctionViewComponent
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
    MatBottomSheetModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DragDropModule,
    MatStepperModule,
    MatTabsModule,
    MatChipsModule,
    RouterModule.forRoot([
      {path:"",component:HomeComponent},
      {path:"Profile",component:UserProfileComponent},
      {path:"Login",component:LoginComponent},
      {path:"Sign_up",component:SignUpComponent},
      {path:"AuctionAdmin",component:AuctionAdminComponent},
      {path:"Auction",component:AuctionComponent},
      {path :"Products",component: ProductsComponent},
      {path :"AuctionView/:id" , component:AuctionViewComponent},
      {path :"**",redirectTo:"Profile"}
    ]),
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    HttpClientModule
    ],
    entryComponents: [AuctionAdminComponent, BottomSheetOverviewExampleSheet],
  providers: [UserService,AuthService,AuctionService,WebsocketService,ProductService,AuctionAdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
