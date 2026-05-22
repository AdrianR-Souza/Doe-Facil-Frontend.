import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private api = 'http://127.0.0.1:5001';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>(`${this.api}/pedido`);
  }

  buscar(id: number) {
    return this.http.get<any>(`${this.api}/pedido/${id}`);
  }

  criar(dados: any) {
    return this.http.post<any>(`${this.api}/pedido`, dados);
  }

  atualizar(id: number, dados: any) {
  return this.http.put<any>(`${this.api}/pedido/${id}`, dados);
}
adicionar(dados: any) {
  return this.http.post<any>(`${this.api}/produto`, dados);
}

deletar(id: number) {
  return this.http.delete<any>(`${this.api}/produto/${id}`);
}
}