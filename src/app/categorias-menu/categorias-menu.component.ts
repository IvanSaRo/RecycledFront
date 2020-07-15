import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias-menu',
  templateUrl: './categorias-menu.component.html',
  styleUrls: ['./categorias-menu.component.css']
})
export class CategoriasMenuComponent implements OnInit {

  catProductos: boolean;
  catMateriales: boolean;

  constructor() {
    this.catProductos = false;
    this.catMateriales = false;
  }

  ngOnInit(): void {
  }

  seleccion($event) {
    $event.preventDefault();
    this.catMateriales = false;
    this.catProductos = !this.catProductos;
  }

  seleccion2($event) {
    $event.preventDefault();
    this.catProductos = false;
    this.catMateriales = !this.catMateriales;
  }

}
