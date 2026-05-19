import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PagamentoService } from '../../services/pagamento';

@Component({
  selector: 'app-pagamento',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './pagamento.html',
  styleUrl: './pagamento.css',
})
export class Pagamento {
  metodoSelecionado: number = 1;
  mensagem: string = '';
  confirmado: boolean = false;

  constructor(private pagamentoService: PagamentoService) {}

  confirmar() {
    this.pagamentoService.confirmar(this.metodoSelecionado).subscribe({
      next: (data: any) => {
        this.mensagem = data.mensagem;
        this.confirmado = true;
      },
      error: () => {
        this.mensagem = 'Erro ao confirmar pagamento.';
      }
    });
  }
}