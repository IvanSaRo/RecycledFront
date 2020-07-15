/************ MODELO USUARIO ************/

/*
 _   _                      _
| | | |                    (_)
| | | |___ _   _  __ _ _ __ _  ___
| | | / __| | | |/ _` | '__| |/ _ \
| |_| \__ \ |_| | (_| | |  | | (_) |
 \___/|___/\__,_|\__,_|_|  |_|\___/
*/

export class Usuario {
  id: number; /* Estos id habra que borrarlos, los incluyo solo para pruebas */
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  CCAA: string;
  foto: string;
  fechaRegistro: Date;
  favoritos: string;

  constructor(
    pNombre: string,
    pApellidos: string,
    pEmail: string,
    pPassword: string,
    pCCAA: string,
    pFoto: string,

  ) {
    this.nombre = pNombre;
    this.apellidos = pApellidos;
    this.email = pEmail;
    this.password = pPassword;
    this.CCAA = pCCAA;
    this.foto = pFoto;

  }
}
