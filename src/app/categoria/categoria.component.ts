import { Component, OnInit } from "@angular/core";
import { ProductosService } from "../productos.service";
import { Producto } from "../models/producto";
import { Producto_user } from "../models/producto_user";
import { Router, ActivatedRoute } from "@angular/router";
import { ThrowStmt } from "@angular/compiler";
import { MensajeService } from "../mensaje.service";

@Component({
  selector: "app-categoria",
  templateUrl: "./categoria.component.html",
  styleUrls: ["./categoria.component.css"]
})
export class CategoriaComponent implements OnInit {
  // Elementos del DOM todo guapos (Recycled Card)

  buyButton: any;
  bottom: any;
  remove: any;
  producto: any;
  categoria: string;
  tipo: string;

  arrProductos: Producto_user[];

  idLocalStorage: string;

  // Ruta actual
  rutaActual: string;

  // Precio
  precio: number;

  // Filtros
  filtros: string;

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private mensajeService: MensajeService
  ) {
    this.categoria = "";
    this.tipo = "";
    // Me subscribo a los cambios de ruta
    router.events.subscribe(val => {
      // console.log(val);
      this.idLocalStorage = localStorage.getItem("id");
    });

    // Variables para animar tarjetas
    this.buyButton = document.getElementsByClassName("buy"); // Boton comprar
    this.bottom = document.getElementsByClassName("bottom"); // Boton de la tarjeta
    this.remove = document.getElementsByClassName("remove"); // Boton de borrado

    // Array de Productos
    this.arrProductos = [];

    // Ruta actual de la app
    this.rutaActual = this.router.url;

    // Precio
    this.precio = 0;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      if (params.tipo === undefined) {
        const response = await this.productosService.getCategoria(
          params.categoria
        );
        this.categoria = params.categoria;
        this.arrProductos = response;
      } else if (params.categoria === "general") {
        const response = await this.productosService.buscarTexto(params.tipo);
        this.arrProductos = response;
      } else {
        const response = await this.productosService.getTipo(params.tipo);
        this.arrProductos = response;
        this.categoria = params.categoria;
        this.tipo = params.tipo;
      }
    });
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

  /* FUNCIONES PARA REALIZAR MOVIMIENTOS DEL MENÚ LATERAL DE FILTRADO */

  abrirFiltros() {
    document.getElementById("filtrosSide").style.transform = "translateX(0px)";
    document.getElementById("filtrosSide").style.boxShadow =
      "5px 20px 30px rgba(40, 70, 42, 0.2)";
    document.getElementById("movecontainer").style.transform =
      "translateX(300px)";
    // console.log("Proyecto Hasselhoff ha sido deprecated satisfactoriamente")
  }

  cerrarFiltros() {
    document.getElementById("filtrosSide").style.transform =
      "translateX(-400px)";
    document.getElementById("filtrosSide").style.boxShadow = "none";
    document.getElementById("movecontainer").style.transform =
      "translateX(0px)";
  }

  /* FILTROS LOCOS */

  async filtrosLocos($event) {
    let filtro = $event.target.value;

    switch (filtro) {
      // case "todos":
      //   if (this.rutaActual === "/items/productos") {
      //     this.arrProductos = await this.productosService.getProductos();
      //     this.filtros = "Productos";
      //   } else if (this.rutaActual === "/items/materiales") {
      //     this.arrProductos = await this.productosService.getMateriales();
      //     this.filtros = "Materiales";
      //   }
      //   break;

      case "ascendente":
        this.arrProductos.sort(this.ordenarPrecioAsc);
        break;
      case "descendente":
        this.arrProductos.sort(this.ordenarPrecioDes);
        break;
      case "nuevos":
        this.arrProductos.sort(this.ordenarFechaAsc);
        break;
      case "viejos":
        this.arrProductos.sort(this.ordenarFechaDes);
        break;
      case "alfabetico":
        this.arrProductos.sort(this.ordenarNombreAsc);

        break;
    }
  }

  /* ORDENAR PRODUCTOS MEGAFUNCIÓN DE LA MUERTE */

  ordenarNombreAsc(a, b) {
    if (a.nombre > b.nombre) {
      return 1;
    }
    if (a.nombre < b.nombre) {
      return -1;
    }
    // a es igual que b
    return 0;
  }

  ordenarFechaAsc(a, b) {
    if (a.fecha_registro < b.fecha_registro) {
      return 1;
    }
    if (a.fecha_registro > b.fecha_registro) {
      return -1;
    }
    // a es igual que b
    return 0;
  }
  ordenarFechaDes(a, b) {
    if (a.fecha_registro > b.fecha_registro) {
      return 1;
    }
    if (a.fecha_registro < b.fecha_registro) {
      return -1;
    }
    // a es igual que b
    return 0;
  }

  ordenarPrecioAsc(a, b) {
    if (a.precio > b.precio) {
      return 1;
    }
    if (a.precio < b.precio) {
      return -1;
    }
    // a es igual que b
    return 0;
  }

  ordenarPrecioDes(a, b) {
    if (a.precio < b.precio) {
      return 1;
    }
    if (a.precio > b.precio) {
      return -1;
    }
    // a es igual que b
    return 0;
  }

  async click(id) {
    //console.log(id);
    const resultado = await this.mensajeService.compruebaConversacion({
      idcrea: this.idLocalStorage,
      idrecibe: id
    });
    this.mensajeService.idParaPonerMensajesAlPulsar = id;
    this.router.navigate(["users/mensajes/" + localStorage.getItem("id") + '/' + id]);
    //console.log(resultado);
  }
}

/*****************************************************/
