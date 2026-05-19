import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DoadorService } from '../../services/doador';
import { PedidoService } from '../../services/pedido';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-painel',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel implements OnInit {
  doadores: any[] = [];
  doadoresFiltrados: any[] = [];
  buscaDoador: string = '';
  doadorSelecionado: any = null;
  pedidos: any[] = [];
  produtos: any[] = [];
  totalDoado: number = 0;
  abaSelecionada: string = 'painel';
  mensagem: string = '';
  pedidoAberto: number | null = null;

  constructor(
    private doadorService: DoadorService,
    private pedidoService: PedidoService,
    private produtoService: ProdutoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.doadorService.listar().subscribe((data: any[]) => {
      this.doadores = data;
      this.cdr.detectChanges();
    });
  }

  buscarDoador() {
    if (this.buscaDoador.length < 2) {
      this.doadoresFiltrados = [];
      return;
    }
    this.doadoresFiltrados = this.doadores.filter((d: any) =>
      d.nome.toLowerCase().includes(this.buscaDoador.toLowerCase())
    );
  }

  selecionarDoador(doador: any) {
    this.doadorSelecionado = doador;
    this.buscaDoador = doador.nome;
    this.doadoresFiltrados = [];

    this.produtoService.listar().subscribe((prods: any[]) => {
      this.produtos = prods;
      this.pedidoService.listar().subscribe((data: any[]) => {
        this.pedidos = data.filter((p: any) => p.id_doador === doador.id);
        this.totalDoado = this.pedidos.reduce((acc: number, p: any) => {
          return acc + this.getTotalPedido(p);
        }, 0);
        this.cdr.detectChanges();
      });
    });
  }

  carregarPedidos() {
    this.produtoService.listar().subscribe((prods: any[]) => {
      this.produtos = prods;
      this.pedidoService.listar().subscribe((data: any[]) => {
        this.pedidos = data.filter((p: any) => p.id_doador === this.doadorSelecionado.id);
        this.totalDoado = this.pedidos.reduce((acc: number, p: any) => {
          return acc + this.getTotalPedido(p);
        }, 0);
        this.cdr.detectChanges();
      });
    });
  }

  togglePedido(id: number) {
    this.pedidoAberto = this.pedidoAberto === id ? null : id;
  }

  getTotalPedido(p: any): number {
    const ids = p.id_produtos ?? [p.id_produto];
    return ids.reduce((acc: number, id: number) => {
      const produto = this.produtos.find((prod: any) => prod.id === id);
      return acc + (produto ? (produto.preco ?? produto.valor ?? 0) : 0);
    }, 0);
  }

  getNomeProdutos(p: any): string {
    const ids = p.id_produtos ?? [p.id_produto];
    return ids.map((id: number) => {
      const produto = this.produtos.find((prod: any) => prod.id === id);
      return produto ? produto.nome : 'Produto #' + id;
    }).join(', ');
  }

  alterarPedido(pedido: any) {
    localStorage.setItem('pedido_editar', JSON.stringify({
      id_doador: this.doadorSelecionado.id,
      nome_doador: this.doadorSelecionado.nome,
      id_instituicao: pedido.id_instituicao,
      id_metodo_pgto: pedido.id_metodo_pgto,
      id_pedido: pedido.id
    }));
    window.location.href = '/nova-doacao';
  }
}