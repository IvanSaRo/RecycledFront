import { Component, OnInit, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { UsuariosService } from "../usuarios.service";

@Component({
  selector: "app-form-perfil",
  templateUrl: "./form-perfil.component.html",
  styleUrls: ["./form-perfil.component.css"]
})
export class FormPerfilComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  hide = true;
  errores: any[];
  imagenURL: string;
  urlEnviada: EventEmitter<string>;
  showModal: boolean;
  checkMail: boolean;

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService
  ) {
    this.checkMail = false;
    this.showModal = false;
    this.thirdFormGroup = new FormGroup(
      {
        nombre: new FormControl("", [Validators.required]),
        apellidos: new FormControl("", [Validators.required]),
        CCAA: new FormControl("", [Validators.required]),
        foto: new FormControl("", [Validators.required]),
        email: new FormControl("", [
          // Clave del formulario.
          Validators.required,
          Validators.email
          // Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)
        ]),
        password: new FormControl("", [
          Validators.pattern(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)
        ]),
        repite_password: new FormControl()
      },
      [
        // Aquí se metería, como segundo parámetro, los validadores a nivel general en el formulario, en el interior de un array
        this.passwordValidator
      ]
    ); // Validador de password en el FormGroup
    // Lo inicializo y pongo tantas claves como inputs queramos tener en el formulario.
    // El segundo parámetro del form group son los validadores del formulario
    this.errores = [];
    this.imagenURL = "";
  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
  }

  passwordValidator(form) {
    const passwordValue = form.controls.password.value;
    const repitePasswordValue = form.controls.repite_password.value;

    if (passwordValue === repitePasswordValue) {
      return null;
    } else {
      return { passwordValidator: true };
    }
  }

  emitPost($event) {
    // console.log($event.target.value);
    this.imagenURL = $event.target.value;
    this.urlEnviada.emit(this.imagenURL);
    // this.superServicioService.agregarPost($event);
  }
  mostrarImagen() {
    return this.imagenURL;
  }

  onSubmit() {
    this.usuariosService
      .registro(this.thirdFormGroup.value)
      .then(response => {
        console.log(response);
        if (response.error) {
          this.checkMail = true;
        } else {
          this.checkMail = false;
          this.showModal = true;
        }
      })
      .catch(err => {
        this.errores = err.error;
      });
  }
}
//   console.log(this.emailFormControl.value);
