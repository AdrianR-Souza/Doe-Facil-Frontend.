import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../services/pedido';
import { PagamentoService } from '../../services/pagamento';

@Component({
  selector: 'app-pagamento',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './pagamento.html',
  styleUrl: './pagamento.css',
})
export class Pagamento implements OnInit {
  metodoSelecionado: number = 1;
  mensagem: string = '';
  confirmado: boolean = false;
  pedidoPendente: any = null;

  constructor(
    private pedidoService: PedidoService,
    private pagamentoService: PagamentoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const dados = localStorage.getItem('pedido_pendente');
    if (dados) {
      this.pedidoPendente = JSON.parse(dados);
    } else {
      this.router.navigate(['/nova-doacao']);
    }
  }

  confirmar() {
    if (!this.pedidoPendente) return;

    this.pagamentoService.confirmar(this.metodoSelecionado).subscribe({
      next: (data: any) => {
        this.pedidoService.criar({
          id_doador: this.pedidoPendente.id_doador,
          id_produtos: this.pedidoPendente.id_produtos,
          id_instituicao: this.pedidoPendente.id_instituicao,
          id_metodo_pgto: this.metodoSelecionado
        }).subscribe({
          next: () => {
            localStorage.removeItem('pedido_pendente');
            this.mensagem = data.mensagem;
            this.confirmado = true;
            this.cdr.detectChanges();
          },
          error: (err: any) => {
            this.mensagem = 'Erro ao registrar pedido: ' + (err.error?.error || 'Tente novamente.');
            this.cdr.detectChanges();
          }
        });
      },
      error: () => {
        this.mensagem = 'Erro ao confirmar pagamento.';
        this.cdr.detectChanges();
      }
    });
  }
}