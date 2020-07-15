import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { HttpClientModule } from "@angular/common/http";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RatingModule } from "ng-starrating";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CategoriasMenuComponent } from "./categorias-menu/categorias-menu.component";
import { IndexComponent } from "./index/index.component";
import { CategoriaComponent } from "./categoria/categoria.component";
import { CategoriaDetalleComponent } from "./categoria-detalle/categoria-detalle.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { FormPerfilComponent } from "./form-perfil/form-perfil.component";
import { FormProductoComponent } from "./form-producto/form-producto.component";
import { LoginComponent } from "./login/login.component";
import { ListaMensajesComponent } from "./lista-mensajes/lista-mensajes.component";
import { MensajeDetalleComponent } from "./mensaje-detalle/mensaje-detalle.component";
import { FormMensajeComponent } from "./form-mensaje/form-mensaje.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ShortStringPipe } from "./short-string.pipe";
import { CarouselRecycledComponent } from "./carousel-recycled/carousel-recycled.component";
import { AboutComponent } from "./about/about.component";
import { InfoComponent } from './info/info.component';


const firebaseConfig = {
  apiKey: "AIzaSyBezEpeaHszPmyE4S3-USRpOg1AXYjfop4",
  authDomain: "recycled-706ac.firebaseapp.com",
  databaseURL: "https://recycled-706ac.firebaseio.com",
  projectId: "recycled-706ac",
  storageBucket: "recycled-706ac.appspot.com",
  messagingSenderId: "986380282518",
  appId: "1:986380282518:web:cab19ad0b745c2252d30b7",
  measurementId: "G-2987P6HWYQ"
};

@NgModule({
  declarations: [
    AppComponent,
    CategoriasMenuComponent,
    IndexComponent,
    CategoriaComponent,
    CategoriaDetalleComponent,
    PerfilComponent,
    FormPerfilComponent,
    FormProductoComponent,
    LoginComponent,
    ListaMensajesComponent,
    MensajeDetalleComponent,
    FormMensajeComponent,
    ShortStringPipe,
    CarouselRecycledComponent,
    AboutComponent,
    InfoComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule,
    AngularFireStorageModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatStepperModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }

