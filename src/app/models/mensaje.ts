/************ MODELO MENSAJE ************/

/*
___  ___                     _
|  \/  |                    (_)
| .  . | ___ _ __  ___  __ _ _  ___
| |\/| |/ _ \ '_ \/ __|/ _` | |/ _ \
| |  | |  __/ | | \__ \ (_| | |  __/
\_|  |_/\___|_| |_|___/\__,_| |\___|
                           _/ |
                          |__/
*/

export class Mensajes {
  id_men: number;
  texto: string;
  fecha_men: Date;
  fk_conversaciones: number;
  fk_usuario: number;

  constructor(pTexto: string) {
    this.texto = pTexto;
  }
}
