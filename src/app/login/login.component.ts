import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'angulartoastr';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  invalidPass = false;
  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private location: Location,
    private router: Router) { }

  // Bootstrap Modal Close event
  hide() {
    this.showModal = false;
    this.location.back();
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.showModal = true; // Show-Hide Modal Check


  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.usuariosService.login(this.registerForm.value).then(response => {
        localStorage.setItem('token', response['success']);
        localStorage.setItem('id', response['id'])
        this.showModal = false;

        this.router.navigate(['/users/' + response['id']]);

      })
        .catch(err => {
          this.invalidPass = true;

          console.log(err);
        });
    }
  }



}
