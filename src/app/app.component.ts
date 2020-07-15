import { Component } from "@angular/core";
import { ProductosService } from "./productos.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Producto } from "./models/producto";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Recycled";
  showNewProduct: boolean;
  idUser: string;

  textoBusqueda: string;

  arrProducts: Producto[];

  idLocalStorage: string;

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.showNewProduct = false;

    setInterval(() => this.checkUser(), 1000);

    this.textoBusqueda = "";

    this.arrProducts = [];

    this.idLocalStorage = localStorage.getItem("id");
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      const response = await this.productosService.getAll();
      this.arrProducts = response;
      //console.log(this.arrProducts);
    });
  }

  handleClick($event) {
    $event.preventDefault();
    this.showNewProduct = !this.showNewProduct;
  }
  checkUser() {
    if (localStorage.getItem("id") === null) {
      this.idUser = "0";
    } else {
      this.idUser = localStorage.getItem("id");
    }
  }

  /* FUNCIÓN DE BÚSQUEDA PARA EMITIR TEXTO LOCO A SERVICIO */
  buscarTexto() {
    let textoLoco = this.textoBusqueda.toLowerCase();

    this.productosService.buscarTexto(textoLoco);
    this.router.navigate(["/items/general", textoLoco]);
  }
  /* FUNCIÓN DE BÚSQUEDA AL PULSAR ENTER */
  enterBuscar($event) {
    if ($event.key == "Enter") {
      this.buscarTexto();
    }
  }
}
