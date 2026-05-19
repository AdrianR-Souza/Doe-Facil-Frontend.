import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DoadorService {
  private api = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>(`${this.api}/doador`);
  }

  buscar(id: number) {
    return this.http.get<any>(`${this.api}/doador/${id}`);
  }

  cadastrar(dados: any) {
    return this.http.post<any>(`${this.api}/doador`, dados);
  }

  atualizar(id: number, dados: any) {
    return this.http.put<any>(`${this.api}/doador/${id}`, dados);
  }
  deletar(id: number) {
  return this.http.delete<any>(`${this.api}/doador/${id}`);
}
}