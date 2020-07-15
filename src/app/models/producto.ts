/************ MODELO PRODUCTO ************/
/*__________ ___________ _   _ _____ _____ _____
| ___ \ ___ \  _  |  _  \ | | /  __ \_   _|  _  |
| |_/ / |_/ / | | | | | | | | | /  \/ | | | | | |
|  __/|    /| | | | | | | | | | |     | | | | | |
| |   | |\ \\ \_/ / |/ /| |_| | \__/\ | | \ \_/ /
\_|   \_| \_|\___/|___/  \___/ \____/ \_/  \__*/

export class Producto {
  id_prod: number;
  titulo: string;
  descripcion: string;
  precio: number;
  categoria: string;
  estatus: string;
  tipo: string;
  imagen: string;
  fecha_registro: Date;

  constructor(
    pid_prod: number,
    pTitulo: string,
    pDescripcion: string,
    pPrecio: number,
    pCategoria: string,
    pTipo: string,
    pimagen: string,
    pFecha_registro: Date
  ) {
    this.id_prod = pid_prod;
    this.titulo = pTitulo;
    this.descripcion = pDescripcion;
    this.precio = pPrecio;
    this.categoria = pCategoria;
    this.estatus = "Activo";
    this.tipo = pTipo;
    this.imagen = pimagen;
    this.fecha_registro = pFecha_registro;
  }
}
