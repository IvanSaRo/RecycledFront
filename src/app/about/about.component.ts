import { Component, OnInit } from "@angular/core";
import { ProductosService } from "../productos.service";
import { Producto } from "../models/producto";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
