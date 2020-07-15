import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ProductosService } from '../productos.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import 'firebase/storage';


@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {

  title = 'angulartoastr';
  showProducts: boolean;
  showMaterials: boolean;
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  tipoNombre: string;
  tipo: EventEmitter<string>;
  userId: any;
  showId: boolean;
  filePath: any;
  ref: any;

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: FormBuilder,
    private productosService: ProductosService,
    private location: Location,
    private router: Router,
    private storage: AngularFireStorage) {
    this.userId = localStorage.getItem('id');
    this.showId = false;
  }

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  url: string;







  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required]],
      // tslint:disable-next-line: max-line-length
      precio: ['', [Validators.required, Validators.pattern(/^[$]?[0-9]*(\.)?[0-9]?[0-9]?$/)]], tipo: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      imagen: [''],
      fk_usuarios: [this.userId]
    });

    this.showModal = true; // Show-Hide Modal Check
  }

  // Sube foto
  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    this.filePath = `products/product_${id}`;
    this.ref = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = this.ref.getDownloadURL())).subscribe();
  }

  // CIERRA MODAL
  hide() {
    // BORRA LA PUTA FOTO
    var storageRef = firebase.storage().ref();
    var imagesRef = storageRef.child(this.filePath);

    // Delete the file
    imagesRef.delete().then(function () {
      console.log('bien')
    }).catch(function (error) {
      console.log(error);
    });


    this.showModal = false;
    this.showProducts = false;
    this.showMaterials = false;
    this.location.back();

  }

  emit($event) {
    this.tipoNombre = $event.target.value;
    // this.superServicioService.agregarPost($event);
  }


  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  onSubmit() {
    console.log(this.filePath)
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.url = document.getElementById("1").innerHTML;
      this.productosService.registro({
        'titulo': this.registerForm.value.titulo,
        'descripcion': this.registerForm.value.descripcion,
        'precio': this.registerForm.value.precio,
        'tipo': this.registerForm.value.tipo,
        'categoria': this.registerForm.value.categoria,
        'imagen': this.url,
        'fk_usuarios': this.registerForm.value.fk_usuarios,
        'id_foto': this.filePath
      }).then(response => {
        this.showModal = false;
        this.router.navigate(['/items/productos/' + this.tipoNombre]);

      })
        .catch(err => {
          console.log(err);
        });
    }
  }

  handleClick1() {
    this.showProducts = true;
    this.showMaterials = false;
  }




  handleClick2() {
    this.showProducts = false;
    this.showMaterials = true;
  }


}
