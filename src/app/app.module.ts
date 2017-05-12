import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { FirebaseService} from './services/firebase.service'
import { FlashMessagesModule} from 'angular2-flash-messages';
import {Ng2PaginationModule} from 'ng2-pagination';

export const firebaseConfig = {
  apiKey: 'AIzaSyAPdEMvKFjA7M2frMcLrfAzJ8aLpVObxzo',
  authDomain: 'testweb-64db5.firebaseapp.com',
  databaseURL: 'https://testweb-64db5.firebaseio.com',
  storageBucket: 'testweb-64db5.appspot.com',
  messagingSenderId: '906107651475'
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { ClientsComponent } from './clients/clients.component';
import { StockComponent } from './stock/stock.component';
import { ShipComponent } from './ship/ship.component';
import { ClientComponent } from './client/client.component';
import { AddclientComponent } from './addclient/addclient.component';
import { EditclientComponent } from './editclient/editclient.component';
import { ProductComponent } from './product/product.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';

const appRoutes: Routes = [
  {path:'',component:HomeComponent},
  {path:'addclient',component:AddclientComponent},
  {path:'editclient/:id',component:EditclientComponent},
  {path:'clients',component:ClientsComponent},
  {path:'client/:id',component:ClientComponent},
  {path:'products',component:ProductsComponent},
  {path:'ship',component:ShipComponent},
  {path:'stock',component:StockComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProductsComponent,
    ClientsComponent,
    StockComponent,
    ShipComponent,
    ClientComponent,
    AddclientComponent,
    EditclientComponent,
    ProductComponent,
    AddproductComponent,
    EditproductComponent
  ],
  imports: [
    BrowserModule,
    Ng2PaginationModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
