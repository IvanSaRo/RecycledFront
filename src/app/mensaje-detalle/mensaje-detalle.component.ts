import { Component, OnInit, Input } from "@angular/core";
import { MensajeService } from "../mensaje.service";
import { Conversaciones } from "../models/conversacion";
import { FormsModule } from "@angular/forms";
import { Mensajes } from "../models/mensaje";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-mensaje-detalle",
  templateUrl: "./mensaje-detalle.component.html",
  styleUrls: ["./mensaje-detalle.component.css"]
})
export class MensajeDetalleComponent implements OnInit {
  @Input() conversacion: any;
  idUsuario: any;
  mensaje: any;
  conversacionInit: any;

  constructor(private mensajeService: MensajeService, private activateRoute: ActivatedRoute) {
    this.idUsuario = localStorage.getItem("id");
    /* this.mensaje = {
      texto: this.mensajeService.textoMsg,
      fk_conversaciones: this.mensajeService.idconversacionpost,
      fk_usuario: this.idUsuario
    }; */
  }


  ngOnInit(): void {

  }

  click(mensaje) {
    //console.log(this.conversacion);
    this.conversacion.mensajes.push({
      texto: mensaje,
      fk_conversaciones: this.mensajeService.idconversacionpost,
      fk_usuario: parseInt(localStorage.getItem("id"))
    });

    this.mensajeService.mensajePost({
      texto: mensaje,
      fk_conversaciones: this.mensajeService.idconversacionpost,
      fk_usuario: parseInt(localStorage.getItem("id"))
    });
  }

  enter($event) {
    if ($event.key == "Enter") {
      this.conversacion.mensajes.push({
        texto: $event.target.value,
        fk_conversaciones: this.mensajeService.idconversacionpost,
        fk_usuario: parseInt(localStorage.getItem("id"))
      });

      this.mensajeService.mensajePost({
        texto: $event.target.value,
        fk_conversaciones: this.mensajeService.idconversacionpost,
        fk_usuario: parseInt(localStorage.getItem("id"))
      });
    }
  }
}
