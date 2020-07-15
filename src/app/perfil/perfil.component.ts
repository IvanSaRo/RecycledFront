import { Component, OnInit } from "@angular/core";
import { ProductosService } from "../productos.service";
import { UsuariosService } from "../usuarios.service";
import { Router } from "@angular/router";
import { StarRatingComponent } from "ng-starrating";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import 'firebase/storage';

import { Producto } from "../models/producto";
import { Usuario } from "../models/usuario";
import { ActivatedRoute } from "@angular/router";
import { Producto_user } from "../models/producto_user";
import { Valoracion } from "../models/valoracion";
import { MensajeService } from '../mensaje.service';

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.css"]
})
export class PerfilComponent implements OnInit {
  // Elementos del DOM todo guapos (Recycled Card)
  buyButton: any;
  bottom: any;
  remove: any;

  showModal: boolean;

  showModal2: boolean;

  showValoraciones: boolean;

  totalstar: number;

  arrProductosUser: Producto_user[];

  showEdit: boolean;

  showEdit2: boolean;

  showProd: boolean;

  showFav: boolean;

  arrUsuarios: Usuario[];

  userProfile: Usuario;

  numeroDeProductos: number;

  vendido: boolean;

  estatus: string;

  usuarioId: string;

  arrFavId: number[];

  arrFavoritos: Producto_user[];

  rate: number;
  evaluaciones: number;
  checkRate: string;
  userRateId: number;

  arrValoraciones: Valoracion[];

  idLocalStorage: string;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(
    private productosService: ProductosService,
    private usuariosService: UsuariosService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private mensajeService: MensajeService,
    private storage: AngularFireStorage
  ) {
    this.arrValoraciones = [];

    this.arrProductosUser = [];

    this.arrFavoritos = [];

    this.arrUsuarios = [];

    this.numeroDeProductos = 0;

    this.showEdit = false;
    this.showEdit2 = true;

    this.totalstar = 5;

    this.rate = 0;

    this.evaluaciones = 0;

    this.checkRate = "";

    this.showFav = true;

    this.showProd = true;

    this.showModal = false;

    this.showModal2 = false;

    this.vendido = true;

    this.showValoraciones = true;

    this.idLocalStorage = localStorage.getItem("id");

    // Variables para animar tarjetas
    this.buyButton = document.getElementsByClassName("buy"); // Boton comprar
    this.bottom = document.getElementsByClassName("bottom"); // Boton de la tarjeta
    this.remove = document.getElementsByClassName("remove"); // Boton de borrado
  }

  async ngOnInit() {
    this.activateRoute.params.subscribe(async params => {
      this.usuarioId = params.usuarioId;

      this.getUser();
      this.getProducts();
      this.valoracionUser();
      this.comments();
      this.favList();
    });
  }

  // Obtiene el perfil
  async getUser() {
    const response = await this.usuariosService.getUser(this.usuarioId);
    this.userProfile = response;
  }

  // Obtiene los productos del usuario
  async getProducts() {
    const response2 = await this.productosService.getUserProducts(
      this.usuarioId
    );
    this.arrProductosUser = response2;
    if (this.arrProductosUser != null) {
      this.numeroDeProductos = this.arrProductosUser.length;
    }
  }

  // Agrega los favoritos y habilita opciones de admin
  async favList() {
    const response3 = await this.usuariosService.getUserAdmin();
    // Chequea si eres admin y pilla la lista de favoritos
    if (this.usuarioId == response3.id) {
      this.showEdit = true;
      this.showEdit2 = false;
      this.arrFavId = JSON.parse("[" + response3.favoritos + "]");
      this.arrFavoritos = [];

      // Carga los productos favoritos
      for (let i = 0; i < this.arrFavId.length; i++) {
        const response4 = await this.productosService.getDetalle(
          this.arrFavId[i]
        );
        if (response4 != null) this.arrFavoritos.push(response4);
      }
    } else {
      this.showEdit = false;
    }
  }

  // Comprueba los comentarios
  async comments() {
    const response5 = await this.usuariosService.getValoraciones(
      this.usuarioId
    );
    if (response5 != null) {
      this.arrValoraciones = response5;
    } else {
      this.arrValoraciones = [];
    }
  }

  // Recupera la valoración del usuario.
  async valoracionUser() {
    const response4 = await this.usuariosService.getRate(this.usuarioId);
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

  // Sube foto
  onUpload(e, item) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `${item.id_foto}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  // Actualiza producto
  onSubmit(formValues) {
    this.productosService
      .update(formValues)
      .then(response => {
        this.showModal = false;
        this.getProducts();
        this._snackBar.open("Has actualizado el producto ✅", "cerrar", {
          duration: 2000
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Borra producto
  delete(item) {
    if (confirm("¿Quieres borrar el producto?")) {
      this.productosService
        .delete(item.id_prod)
        .then(response => {
          // BORRA LA PUTA FOTO
          var storageRef = firebase.storage().ref();
          var imagesRef = storageRef.child(item.id_foto);

          imagesRef.delete().then(function () {
            console.log('bien')
          }).catch(function (error) {
            console.log(error);
          });
          /////////
          this.getProducts();
          this._snackBar.open("Has borrado el producto 🗑", "cerrar", {
            duration: 2000
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  // Vende el producto
  status(item) {
    if (item.estatus === "activo") {
      this.productosService
        .updateStatus({
          estatus: "vendido",
          id_prod: item.id_prod
        })
        .then(response => {
          this.getProducts();
          this._snackBar.open(
            "Enhorabuena! Has cerrado una venta! Vamos a por otra 👏",
            "cerrar",
            {
              duration: 2000
            }
          );
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.productosService
        .updateStatus({
          estatus: "activo",
          id_prod: item.id_prod
        })
        .then(response => {
          this.getProducts();
          this._snackBar.open(
            "Al final no lo has vendido? No pasa nada, lo volvemos a poner en venta! 💪",
            "cerrar",
            {
              duration: 2000
            }
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  // Actualiza Perfil
  onSubmit2(formValues) {
    this.usuariosService
      .update(formValues)
      .then(response => {
        this.showModal2 = false;
        this.getUser();
        this._snackBar.open("Has actualizado tu perfil ✅", "cerrar", {
          duration: 2000
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Agrega un nuevo comentario al perfil

  onSubmit3(formComentario) {
    if (localStorage.getItem("id") === this.userProfile.id.toString()) {
      this._snackBar.open(
        "Lo sentimos, pero no puedes dejarte mensajes a ti mismo/a 😅",
        "cerrar",
        {
          duration: 2000
        }
      );
    } else if (formComentario.value["resenia"] === "") {
      this._snackBar.open("Debes mandar algo de texto", "cerrar", {
        duration: 2000
      });
    } else {
      this.usuariosService.nuevoComentario({
        id_user: localStorage.getItem("id"),
        id_user2: this.userProfile.id,
        resenia: formComentario.value["resenia"]
      });
      this.comments();
      this._snackBar.open("Gracias por escribir tu valoración 😄", "cerrar", {
        duration: 2000
      });
    }
  }

  // Borra favorito
  deleteFav(item) {
    const index = this.arrFavId.indexOf(item.id_prod);
    if (index > -1) {
      this.arrFavId.splice(index, 1);
    }
    this.usuariosService
      .updateFav({
        id: localStorage.getItem("id"),
        favoritos: this.arrFavId.toString()
      })
      .then(response => {
        this.favList();
        this._snackBar.open(
          "Se ha borrado el articulo de tu lista de favoritos 💔",
          "cerrar",
          {
            duration: 2000
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }

  // VALORA USUARIO

  async onRate($event: {
    oldValue: number;
    newValue: number;
    starRating: StarRatingComponent;
  }) {
    if (localStorage.getItem("id") === this.userProfile.id.toString()) {
      this.router
        .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
        .then(() => {
          this.router.navigate(["/users/" + this.userProfile.id]);
          this._snackBar.open("No puedes valorar tu perfil 😅", "cerrar", {
            duration: 2000
          });
        });
    } else if (this.checkRate.includes(localStorage.getItem("id"))) {
      this.router
        .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
        .then(() => {
          this.router.navigate(["/users/" + this.userProfile.id]);
          this._snackBar.open("Ya has valorado éste perfil 😉", "cerrar", {
            duration: 2000
          });
        });
    } else {
      const response = await this.usuariosService.valorar({
        id_user: localStorage.getItem("id"),
        id_user2: this.userProfile.id,
        valoracion: $event.newValue
      });
      this.valoracionUser();
      this._snackBar.open("Gracias por valorar al usuario 👍", "cerrar", {
        duration: 2000
      });
    }
  }

  // Abre modal edit perfil
  editProfile($event) {
    $event.preventDefault();
    this.showModal2 = true;
  }

  // Cierra modal edit perfil
  cerrar2() {
    this.showModal2 = false;
  }

  // Abre modal edit product
  edit() {
    this.showModal = true;
  }

  // Cierra modal edit product
  cerrar() {
    this.showModal = false;
  }

  // Muestra Favoritos
  showFavorite($event) {
    $event.preventDefault();
    this.showProd = false;
    this.showFav = true;
    this.showValoraciones = false;
  }

  // Muestra Productos
  showProducts($event) {
    $event.preventDefault();
    this.showProd = true;
    this.showFav = false;
    this.showValoraciones = false;
  }

  // Muestra Todo
  showAll($event) {
    $event.preventDefault();
    this.showProd = true;
    this.showFav = true;
    this.showValoraciones = true;
  }

  // Muestra valoraciones
  valoraciones($event) {
    $event.preventDefault();
    this.showProd = false;
    this.showFav = false;
    this.showValoraciones = true;
  }

  // Mensaje
  async clickMensaje() {

    const resultado = await this.mensajeService.compruebaConversacion({
      idcrea: this.idLocalStorage,
      idrecibe: this.usuarioId
    });

    this.router.navigate(["users/mensajes/" + localStorage.getItem("id") + '/' + this.usuarioId]);

  }

  async clickMensaje2(id) {


    const resultado = await this.mensajeService.compruebaConversacion({
      idcrea: this.idLocalStorage,
      idrecibe: id
    });

    this.router.navigate(["users/mensajes/" + localStorage.getItem("id") + '/' + id]);

  }

  navigateUser($event, itemId) {
    $event.preventDefault();
    this.router
      .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
      .then(() => {
        this.router.navigate(["/users/" + itemId.id]);
      });
  }

  /* FUNCIONES PARA MOVIMIENTO DE MENÚS EN TARJETA */

  superClassOn(e) {
    for (let bot of this.bottom) {
      bot.className = "bottom clicked";
    }
  }

  salir() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }

  superClassOff(e) {
    for (let bot of this.bottom) {
      bot.className = "bottom";
    }
  }
}
