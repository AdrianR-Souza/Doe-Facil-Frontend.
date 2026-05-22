import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PagamentoService {
  private api = 'http://127.0.0.1:5001';

  constructor(private http: HttpClient) {}

  confirmar(id_metodo_pgto: number) {
    return this.http.post<any>(`${this.api}/metodo_pgto`, { id_metodo_pgto });
  }

  listarMetodos() {
    return this.http.get<any[]>(`${this.api}/metodo_pgto`);
  }
}