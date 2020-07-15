import { Component, OnInit, AfterViewInit } from "@angular/core";
import { UsuariosService } from "../usuarios.service";
import { Usuario } from "../models/usuario";
import { Conversaciones } from "../models/conversacion";
import { MensajeService } from "../mensaje.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-lista-mensajes",
  templateUrl: "./lista-mensajes.component.html",
  styleUrls: ["./lista-mensajes.component.css"]
})
export class ListaMensajesComponent implements OnInit {
  arrUsuarios: Usuario[];
  arrConversaciones: Conversaciones[];
  conversacionIdParaPost: number;
  idUsuario: any;
  con: any;

  constructor(
    private usuariosService: UsuariosService,
    private mensajeService: MensajeService,
    private activateRoute: ActivatedRoute
  ) {
    this.idUsuario = localStorage.getItem("id");
  }

  async ngOnInit() {

    this.activateRoute.params.subscribe(async params => {
      if (params.usuarioId == localStorage.getItem('id') || params.usuarioRecibeId == localStorage.getItem('id')) {
        if (params.usuarioRecibeId != '0') {
          const response = await this.mensajeService.getConversacion(
            params.usuarioId,
            params.usuarioRecibeId
          );
          this.arrConversaciones = response;
          this.con = this.arrConversaciones[0];
          console.log(this.con);
          this.mensajeService.idconversacionpost = this.con.id_con;
        }
      }
    });

    // CARGA LAS CONVERSACIONES
    this.cargaConversaciones();
  }


  async cargaConversaciones() {
    const response = await this.mensajeService.getAllPromise(localStorage.getItem('id'));
    this.arrConversaciones = response;
  }


  // MANEJADOR PULSACIÓN EN CONVERSACIONES

  handleClick(conversacion) {
    // tslint:disable-next-line: max-line-length
    // si logro pasar la id del usuario a quien envío el mensaje podré pasar escribir dentro de esa conversación directamente una vez pulse y se cree o entre a la que ya existe

    this.con = conversacion;
    console.log(this.con);
    this.mensajeService.idconversacionpost = this.con.id_con; // mando la id de la conversacion para poder insertar los mensajes en ella
    this.cargaConversaciones();
  }

  async borrarConversacion(id_con) {
    await this.mensajeService.delete(id_con);

    this.cargaConversaciones();
  }
}
