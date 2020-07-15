export class Conversaciones {
  /* id: number;
  CCAA: string;
  foto: string;
  nombre: string;
  apellidos: string;

  id_men: number;
  texto: string;
  fecha_men: Date; */

  id_con: number;
  idcrea: number;
  nombrecrea: string;
  fotocrea: string;
  ccaacrea: string;
  idrecibe: string;
  nombrerecibe: string;
  fotorecibe: string;
  ccaarecibe: string;
  mensajes: [];
  constructor(
    /* pid: number,
    pCCAA: string,
    pfoto: string,
    pnombre: string,
    papellidos: string,

    pId_men: number,
    pTexto: string,
    pFecha_men: Date */

    pNombrecrea: string,
    pFototcrea: string,
    pCcaacrea: string,
    pNombrerecibe: string,
    pFotorecibe: string,
    pCcaarecibe: string,
    pMensajes: []
  ) {
    /* this.id = pid;
    this.CCAA = pCCAA;
    this.foto = pfoto;
    this.nombre = pnombre;
    this.apellidos = papellidos;

    this.id_men = pId_men;
    this.texto = pTexto;
    this.fecha_men = pFecha_men; */

    this.nombrecrea = pNombrecrea;
    this.fotocrea = pFototcrea;
    this.ccaacrea = pCcaacrea;
    this.nombrerecibe = pNombrerecibe;
    this.fotorecibe = pFotorecibe;
    this.ccaarecibe = pCcaarecibe;
    this.mensajes = pMensajes;
  }
}
