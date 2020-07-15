import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { LoginComponent } from "./login/login.component";
import { FormPerfilComponent } from "./form-perfil/form-perfil.component";
import { FormProductoComponent } from "./form-producto/form-producto.component";
import { CategoriasMenuComponent } from "./categorias-menu/categorias-menu.component";
import { CategoriaComponent } from "./categoria/categoria.component";
import { CategoriaDetalleComponent } from "./categoria-detalle/categoria-detalle.component";
import { ListaMensajesComponent } from "./lista-mensajes/lista-mensajes.component";
import { MensajeDetalleComponent } from "./mensaje-detalle/mensaje-detalle.component";
import { FormMensajeComponent } from "./form-mensaje/form-mensaje.component";
import { LoginGuard } from "./login.guard";
import { AboutComponent } from "./about/about.component";
import { InfoComponent } from "./info/info.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "index" },

  { path: "index", component: IndexComponent }, // Pagina principal

  { path: "index/menu", component: CategoriasMenuComponent }, // Menú dinámico categorías

  // USUARIOS //
  { path: "users/new", component: FormPerfilComponent }, // Nuevo Usuario
  { path: "users/login", component: LoginComponent }, // Login

  {
    path: "users/:usuarioId",
    component: PerfilComponent,
    canActivate: [LoginGuard], // Perfiles Usuarios
    children: [{ path: "myprofile", component: PerfilComponent }]
  }, // Modificar mi perfil

  // INFO //
  { path: "info/recycling", component: InfoComponent }, // Información sobre Recycling
  { path: "info/upcycling", component: InfoComponent }, // Información sobre Upcycling

  // PRODUCTOS //
  {
    path: "users/:usuarioId/newproducto",
    component: FormProductoComponent,
    canActivate: [LoginGuard]
  }, // Añadir producto

  // LISTAS DE PRODUCTOS

  { path: "items/:categoria/:tipo", component: CategoriaComponent },
  { path: "items/:categoria", component: CategoriaComponent },

  { path: "items/producto", component: CategoriaComponent }, // Ruta Productos
  { path: "items/productos/:tipo", component: CategoriaComponent }, // Ruta Productos -> Filtrado por tipo

  { path: "items/material", component: CategoriaComponent }, // Ruta Materiales
  { path: "items/materiales/:tipo", component: CategoriaComponent }, // Ruta Materiales -> Filtrado por tipo

  { path: "items/general/:busqueda", component: CategoriaComponent }, // Ruta para búsqueda general

  // Un producto en concreto
  { path: "items/detalle/:tipo/:itemId", component: CategoriaDetalleComponent },

  // MENSAJES //

  {
    path: "users/mensajes/:usuarioId/:usuarioRecibeId",
    component: ListaMensajesComponent,
    children: [{ path: ":usuarioRecibeId", component: MensajeDetalleComponent }],
    canActivate: [LoginGuard]
  }, // Lista de Mensajes Usuario
  { path: "users/:usuarioId/new", component: FormMensajeComponent }, // Mensaje Nuevo

  // ABOUT //

  { path: "about", component: AboutComponent },

  // REDIRECT //
  { path: "**", redirectTo: "index" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
