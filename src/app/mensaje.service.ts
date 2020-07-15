import { Injectable, OnInit } from "@angular/core";
import { Mensajes } from "./models/mensaje";
import { Conversaciones } from "./models/conversacion";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MensajeDetalleComponent } from "./mensaje-detalle/mensaje-detalle.component";

@Injectable({
  providedIn: "root"
})
export class MensajeService implements OnInit {
  baseUrl: string;
  conv: Conversaciones;
  textoMsg: any;
  idconversacionpost: number;
  idParaPonerMensajesAlPulsar: any;

  ngOnInit() { }

  constructor(private httpClient: HttpClient) {
    this.baseUrl = "https://recycledshop.herokuapp.com/api/mensajes";
  }
  // TRAE DEL BACK TODAS LAS CONVERSACIONES DEL USUARIO

  getAllPromise(pusuarioId): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/${pusuarioId}`).toPromise();
  }

  mensajePost(mensaje): Promise<any> {
    // console.log(mensaje);
    return this.httpClient.post(`${this.baseUrl}`, mensaje).toPromise();
  }

  compruebaConversacion(ids): Promise<any> {
    //console.log(ids);
    /* let httpOptions = {
      headers: new HttpHeaders({
        "content-type": "application/json"
      }),
      body: {
        idcrea: parseInt(ids.idcrea),
        idrecibe: parseInt(ids.idrecibe)
      }
    }; */
    //console.log(httpOptions);
    return this.httpClient
      .get(`${this.baseUrl}/check/` + ids.idcrea + "/" + ids.idrecibe)
      .toPromise();
  }

  getConversacion(idscrea, idsrecibe): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/` + idscrea + '/' + idsrecibe).toPromise();
  }

  //borrar una conversación con el botón de papelera
  // envío la id de la conversacion con el evento click para meterla en la query delete * from conversaciones
  delete(id_conversacion): Promise<any> {
    //httpOptions tiene que ser usado para un delete siempre
    //console.log(id_conversacion);
    let httpOptions = {
      headers: new HttpHeaders({
        "content-type": "application/json"
      }),
      body: {
        idcon: id_conversacion
      }
    };

    return this.httpClient.delete(this.baseUrl, httpOptions).toPromise();
  }
}
