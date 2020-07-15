import { Component, OnInit } from "@angular/core";
import { ProductosService } from "../productos.service";
import { UsuariosService } from "../usuarios.service";
import { Router } from "@angular/router";
import { Producto } from "../models/producto";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit {
  // Elementos del DOM todo guapos (Recycled Card)

  buyButton: any;
  bottom: any;
  remove: any;
  producto: any;

  arrProd: Producto[];

  constructor(
    private router: Router,
    private productosService: ProductosService
  ) {}

  async ngOnInit() {
    this.arrProd = await this.productosService.getAllPromise();
    //console.log(this.arrProd);
  }

  /* FUNCIONES PARA MOVIMIENTO DE MENÚS EN TARJETA */

  superClassOn(e) {
    //console.log(this.bottom);
    //console.log('El protocolo Hasselhoff ha sido activado')

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

  checkLogin() {
    if (localStorage.getItem("id")) {
      this.router.navigate(["/users/" + localStorage.getItem("id")]);
    } else {
      this.router.navigate(["/users/new"]);
    }
  }
}
