/************ MODELO PRODUCTO ************/
/*__________ ___________ _   _ _____ _____ _____
| ___ \ ___ \  _  |  _  \ | | /  __ \_   _|  _  |
| |_/ / |_/ / | | | | | | | | | /  \/ | | | | | |
|  __/|    /| | | | | | | | | | |     | | | | | |
| |   | |\ \\ \_/ / |/ /| |_| | \__/\ | | \ \_/ /
\_|   \_| \_|\___/|___/  \___/ \____/ \_/  \__*/

export class Producto_user {
    id_prod: number;
    titulo: string;
    descripcion: string;
    precio: number;
    categoria: string;
    estatus: string;
    tipo: string;
    imagen: string;
    fecha_registro: Date;
    valoracion: number;
    id_foto: string;

    id: number;
    CCAA: string;
    foto: string;
    nombre: string;
    apellidos: string;

    constructor(
        pid_prod: number,
        ptitulo: string,
        pDescripcion: string,
        pPrecio: number,
        pCategoria: string,
        pTipo: string,
        pimagen: string,
        pFecha_registro: Date,

        pid: number,
        pCCAA: string,
        pfoto: string,
        pnombre: string,
        papellidos: string
    ) {
        this.id_prod = pid_prod;
        this.titulo = ptitulo;
        this.descripcion = pDescripcion;
        this.precio = pPrecio;
        this.categoria = pCategoria;
        this.estatus = "Activo";
        this.tipo = pTipo;
        this.imagen = pimagen;
        this.fecha_registro = pFecha_registro;
        this.id = pid;
        this.CCAA = pCCAA;
        this.foto = pfoto;
        this.nombre = pnombre;
        this.apellidos = papellidos;
    }
}
