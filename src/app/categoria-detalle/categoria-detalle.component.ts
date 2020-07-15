import { Component, OnInit } from "@angular/core";
import { Producto } from "../models/producto";
import { ProductosService } from "../productos.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Producto_user } from "../models/producto_user";
import { Router } from "@angular/router";
import { UsuariosService } from "../usuarios.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { StarRatingComponent } from "ng-starrating";
import { MensajeService } from '../mensaje.service';

@Component({
  selector: "app-categoria-detalle",
  templateUrl: "./categoria-detalle.component.html",
  styleUrls: ["./categoria-detalle.component.css"]
})
export class CategoriaDetalleComponent implements OnInit {
  idItem: Producto_user;

  activoButton: boolean;

  arrProductos: Producto_user[];

  totalstar: number;

  idLocalStorage: string;

  // Elementos del DOM todo guapos (Recycled Card)

  buyButton: any;
  bottom: any;
  remove: any;
  fav: boolean;
  rate: number;
  evaluaciones: number;
  checkRate: string;
  itemId: number;

  constructor(
    private activateRoute: ActivatedRoute,
    private productosService: ProductosService,
    private location: Location,
    private router: Router,
    private usuariosService: UsuariosService,
    private _snackBar: MatSnackBar,
    private mensajeService: MensajeService
  ) {
    this.rate = 0;
    this.checkRate = "";
    this.evaluaciones = 0;
    this.fav = false;
    this.totalstar = 5;
    this.activoButton = true;
    this.idLocalStorage = localStorage.getItem("id");

    // Array de Productos
    this.arrProductos = [];

    // Variables para animar tarjetas
    this.buyButton = document.getElementsByClassName("buy"); // Boton comprar
    this.bottom = document.getElementsByClassName("bottom"); // Boton de la tarjeta
    this.remove = document.getElementsByClassName("remove"); // Boton de borrado
  }

  async ngOnInit() {
    this.activateRoute.params.subscribe(async params => {
      const response = await this.productosService.getDetalle(params.itemId);
      const response2 = await this.productosService.getTipo(params.tipo);

      this.itemId = params.itemId;
      this.valoracion();

      this.arrProductos = response2;
      this.idItem = response;

      this.favoritos();
    });
  }

  async favoritos() {
    if (localStorage.getItem("id") != null) {
      const response3 = await this.usuariosService.getUserAdmin();
      let arrFav: number[]

      arrFav = [];
      arrFav = JSON.parse("[" + response3.favoritos + "]");

      // this.fav = response3.favoritos.includes(this.idItem.id_prod);
      this.fav = arrFav.includes(this.idItem.id_prod);
    }
  }

  async valoracion() {
    const response4 = await this.productosService.getRate(this.itemId);
    if (response4 != null) {
      let valoracion: number;
      valoracion = 0;
      for (let i = 0; i < response4.length; i++) {
        valoracion += parseInt(response4[i].valoracion);
        this.checkRate += response4[i].id_user + ",";
      }
      this.rate = Math.round(valoracion / response4.length);
      this.evaluaciones = response4.length;
    }
  }

  // Botón para dejar producto Activo/Deprecated
  botonazo() {
    this.activoButton = !this.activoButton;
    console.log(this.activoButton);
  }

  // Para volver atrás en la URL
  goBack() {
    this.location.back();
  }

  async addFav($event) {
    $event.preventDefault();
    if (localStorage.getItem("id") === null) {
      this.router.navigate(["/users/login"]);
    } else if (this.fav === true) {
      this._snackBar.open(
        "Ya tienes éste producto agregado a tu lista 🗒",
        "cerrar",
        {
          duration: 2000
        }
      );
    } else {
      const response3 = await this.usuariosService.getUserAdmin();
      console.log(response3.favoritos);
      const response4 = await this.usuariosService.updateFav({
        id: localStorage.getItem("id"),
        favoritos: response3.favoritos + "," + this.idItem.id_prod
      });
      this.favoritos();
      this._snackBar.open(
        "El producto se ha añadido a tus favoritos 💚",
        "cerrar",
        {
          duration: 2000
        }
      );
    }
  }

  // Mensaje
  async clickMensaje() {

    const resultado = await this.mensajeService.compruebaConversacion({
      idcrea: this.idLocalStorage,
      idrecibe: this.idItem.id
    });

    this.router.navigate(["users/mensajes/" + localStorage.getItem("id") + '/' + this.idItem.id]);

  }

  async clickMensaje2(id) {

    const resultado = await this.mensajeService.compruebaConversacion({
      idcrea: this.idLocalStorage,
      idrecibe: id
    });

    this.router.navigate(["users/mensajes/" + localStorage.getItem("id") + '/' + id]);

  }



  // VALORACION DEL PRODUCTO

  async onRate($event: {
    oldValue: number;
    newValue: number;
    starRating: StarRatingComponent;
  }) {
    if (localStorage.getItem("id") === null) {
      this.router.navigate(["/users/login"]);
    } else if (this.checkRate.includes(localStorage.getItem("id"))) {
      this.router
        .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
        .then(() => {
          this.router.navigate([
            "/items/detalle/" + this.idItem.tipo + "/" + this.idItem.id_prod
          ]);
          this._snackBar.open("Ya has valorado éste producto 😉", "cerrar", {
            duration: 2000
          });
        });
    } else {
      const response = await this.productosService.valorar({
        id_user: localStorage.getItem("id"),
        id_prod: this.idItem.id_prod,
        valoracion: $event.newValue
      });
      this.valoracion();
      this._snackBar.open("Gracias por valorar el producto! 👍", "cerrar", {
        duration: 2000
      });
    }
  }

  /* FUNCIONES PARA MOVIMIENTO DE MENÚS EN TARJETA */

  superClassOn(e) {
    for (let bot of this.bottom) {
      bot.className = "bottom clicked";
    }
  }

  superClassOff(e) {
    // console.log(this.bottom);
    // console.log("La matriz bidimensional subatómica ha sido truncada");

    for (let bot of this.bottom) {
      bot.className = "bottom";
    }
  }
}

/*****************************************************/
