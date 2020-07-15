import { Component, OnInit } from "@angular/core";
import * as $ from "node_modules/jquery/dist/jquery.min";
import { Producto } from "../models/producto";
import { ProductosService } from "../productos.service";
import { Router, ActivatedRoute } from "@angular/router";

import { jQuery } from "node_modules/jquery/dist/jquery.min";

@Component({
  selector: "app-carousel-recycled",
  templateUrl: "./carousel-recycled.component.html",
  styleUrls: ["./carousel-recycled.component.css"]
})
export class CarouselRecycledComponent implements OnInit {
  arrProducts: Producto[];

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.arrProducts = [];
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      const response = await this.productosService.getAll();
      this.arrProducts = response;
      //      console.log(this.arrProducts);
    });
  }
}
