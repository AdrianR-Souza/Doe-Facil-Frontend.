import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class InstituicaoService {
  private api = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>(`${this.api}/instituicoes`);
  }

  buscar(id: number) {
    return this.http.get<any>(`${this.api}/instituicoes/${id}`);
  }

  cadastrar(dados: any) {
    return this.http.post<any>(`${this.api}/instituicoes`, dados);
  }
}