import { Injectable } from "@angular/core";
import { Producto } from "./models/producto";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProductosService {
  baseUrl: string;

  arrProductos: Producto[];

  // Filtro busqueda
  textoLoco: string;
  arraySearch: Producto[];

  // id nombre desc preci cate statu tipo fecha
  constructor(private httpClient: HttpClient) {
    this.baseUrl = "https://recycledshop.herokuapp.com/api/productos";
    this.textoLoco = "";
    this.arraySearch = [];
  }

  // FILTRO BARRA DE BÚSQUEDA // // FUNCHIONA CON DUMMIES!!!!!

  // buscarTexto(textoLoco: string): Promise<Producto[]> {
  //   let arrayFiltrado = [];

  //   this.textoLoco = textoLoco;
  //   //console.log(this.textoLoco);

  //   const prom = new Promise<Producto[]>((resolve, reject) => {
  //     const arraySearch = this.arrProductos.filter(item => {
  //       const nombre = item.nombre;

  //       return nombre.toLowerCase().includes(textoLoco.toLowerCase());
  //     });
  //     resolve(arraySearch);
  //     console.log(arraySearch);
  //   });
  //   return prom;
  // }

  // FILTRO BARRA DE BÚSQUEDA //

  buscarTexto(textoLoco: string): Promise<any> {
    this.textoLoco = textoLoco;
    return this.httpClient
      .get(`${this.baseUrl}/nombres/${textoLoco}`)
      .toPromise();
  }

  /************************************************************/

  // TODOS LOS PRODUCTOS //
  getAllPromise(): Promise<Producto[]> {
    const prom = new Promise<Producto[]>((resolve, reject) => {
      resolve(this.arrProductos);
      // console.log(this.arrProductos.length);
    });
    return prom;
  }

  // FILTRAR PRODUCTOS POR ID //
  getByIdPromise(pId: number): Promise<Producto> {
    const prom = new Promise<Producto>((resolve, reject) => {
      resolve(this.arrProductos.find(item => item.id_prod === pId));
    });
    return prom;
  }

  // FILTRAR ITEMS QUE SON MATERIALES //

  getMateriales(): Promise<Producto[]> {
    const prom = new Promise<Producto[]>((resolve, reject) => {
      const arrFiltrado = this.arrProductos.filter(item => {
        // Filtro en minusculas, sin espacio
        const categoriaCompleta = item.categoria;

        return categoriaCompleta.includes("material");
      });
      resolve(arrFiltrado);
    });
    return prom;
  }

  // FILTAR ITEMS QUE SON PRODUCTOS //

  getProductos(): Promise<Producto[]> {
    const prom = new Promise<Producto[]>((resolve, reject) => {
      const arrFiltrado = this.arrProductos.filter(item => {
        // Filtro en minusculas, sin espacio
        const categoriaCompleta = item.categoria;

        return categoriaCompleta.includes("producto");
      });
      resolve(arrFiltrado);
    });
    return prom;
  }

  /****************************************************************************/
  getAll(): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/`).toPromise();
  }

  getTipo(tipo): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/tipo/${tipo}`).toPromise();
  }

  getCategoria(categoria): Promise<any> {
    return this.httpClient
      .get(`${this.baseUrl}/categoria/${categoria}`)
      .toPromise();
  }

  getDetalle(productoId): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/${productoId}`).toPromise();
  }

  getUserProducts(usuarioId): Promise<any> {
    return this.httpClient
      .get(`${this.baseUrl}/usuarios/${usuarioId}`)
      .toPromise();
  }

  registro(form): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/new`, form).toPromise();
  }

  update(form): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/edit`, form).toPromise();
  }

  updateStatus(form): Promise<any> {
    console.log(form);
    return this.httpClient.post(`${this.baseUrl}/editstatus`, form).toPromise();
  }

  delete(idProd): Promise<any> {
    return this.httpClient
      .delete(`${this.baseUrl}/delete/${idProd}`)
      .toPromise();
  }

  // VALORACIONES
  getRate(idProd): Promise<any> {
    return this.httpClient.get(`https://recycledshop.herokuapp.com/api/puntuaciones/producto/${idProd}`).toPromise();
  }

  valorar(form): Promise<any> {
    return this.httpClient.post(`https://recycledshop.herokuapp.com/api/puntuaciones/rateproduct`, form).toPromise();
  }
}
