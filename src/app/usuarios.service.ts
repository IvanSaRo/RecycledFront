import { Injectable } from '@angular/core';
import { Usuario } from './models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  baseUrl: string;

  arrUsuarios: Usuario[];

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://recycledshop.herokuapp.com/api/usuarios';
  }

  getAllPromise(): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}`).toPromise();
  }

  registro(form): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/register`, form).toPromise();
  }

  login(form): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, form).toPromise();
  }

  getUser(pId): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/${pId}`).toPromise();
  }

  update(form): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/edit`, form).toPromise();
  }

  updateFav(form): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/fav`, form).toPromise();
  }

  checkMail(pEmail): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/email`, pEmail).toPromise();
  }

  getUserAdmin(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('token')
      })
    };
    return this.httpClient.get(`${this.baseUrl}/usuario/1`, httpOptions).toPromise();
  }

  // VALORACIONES
  getRate(idUser): Promise<any> {
    return this.httpClient.get(`https://recycledshop.herokuapp.com/api/puntuaciones/user/${idUser}`).toPromise();
  }

  getValoraciones(idUser): Promise<any> {
    return this.httpClient.get(`https://recycledshop.herokuapp.com/api/puntuaciones/res/${idUser}`).toPromise();
  }

  valorar(form): Promise<any> {
    return this.httpClient.post(`https://recycledshop.herokuapp.com/api/puntuaciones/rateuser`, form).toPromise();
  }

  nuevoComentario(form): Promise<any> {
    return this.httpClient.post(`https://recycledshop.herokuapp.com/api/puntuaciones/comment`, form).toPromise();
  }

}
