import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto';
import { InstituicaoService } from '../../services/instituicao';
import { PedidoService } from '../../services/pedido';
import { PagamentoService } from '../../services/pagamento';
import { DoadorService } from '../../services/doador';

@Component({
  selector: 'app-nova-doacao',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './nova-doacao.html',
  styleUrl: './nova-doacao.css',
})
export class NovaDoacao implements OnInit {
  produtos: any[] = [];
  instituicoes: any[] = [];
  doadores: any[] = [];
  doadoresFiltrados: any[] = [];
  produtosSelecionados: any[] = [];
  instituicaoSelecionada: number = 0;
  idDoador: number = 0;
  buscaDoador: string = '';
  doadorSelecionado: any = null;
  metodo: number = 1;
  mensagem: string = '';
  pedidoEditando: number | null = null;

  constructor(
    private produtoService: ProdutoService,
    private instituicaoService: InstituicaoService,
    private pedidoService: PedidoService,
    private pagamentoService: PagamentoService,
    private doadorService: DoadorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.produtoService.listar().subscribe((data: any[]) => {
      this.produtos = data.map((p: any) => ({ ...p, preco: p.preco ?? p.valor ?? 0 }));
      this.cdr.detectChanges();
    });
    this.instituicaoService.listar().subscribe((data: any[]) => {
      this.instituicoes = data;
      this.cdr.detectChanges();
    });
    this.doadorService.listar().subscribe((data: any[]) => {
      this.doadores = data;
      this.cdr.detectChanges();
    });
    const editar = localStorage.getItem('pedido_editar');
    if (editar) {
      const dados = JSON.parse(editar);
      this.idDoador = dados.id_doador;
      this.buscaDoador = dados.nome_doador;
      this.doadorSelecionado = { id: dados.id_doador, nome: dados.nome_doador };
      this.instituicaoSelecionada = dados.id_instituicao;
      this.metodo = dados.id_metodo_pgto;
      this.pedidoEditando = dados.id_pedido;
      localStorage.removeItem('pedido_editar');
      this.cdr.detectChanges();
    }
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
    this.idDoador = doador.id;
    this.buscaDoador = doador.nome;
    this.doadoresFiltrados = [];
  }

  selecionarProduto(produto: any) {
    const index = this.produtosSelecionados.findIndex((p: any) => p.id === produto.id);
    if (index >= 0) {
      this.produtosSelecionados.splice(index, 1);
    } else {
      this.produtosSelecionados.push({ ...produto, quantidade: 1 });
    }
  }

  isSelecionado(produto: any): boolean {
    return this.produtosSelecionados.some((p: any) => p.id === produto.id);
  }

  get total(): number {
    return this.produtosSelecionados.reduce((acc: number, p: any) => acc + (p.preco * p.quantidade), 0);
  }

  confirmar() {
  if (!this.idDoador || !this.instituicaoSelecionada || this.produtosSelecionados.length === 0) {
    this.mensagem = 'Preencha todos os campos!';
    return;
  }

  const metodoInt = Number(this.metodo);
  this.pagamentoService.confirmar(metodoInt).subscribe();

  const id_produtos: number[] = [];
  this.produtosSelecionados.forEach((p: any) => {
    for (let q = 0; q < p.quantidade; q++) {
      id_produtos.push(p.id);
    }
  });

  this.pedidoService.criar({
    id_doador: Number(this.idDoador),
    id_produtos: id_produtos,
    id_instituicao: Number(this.instituicaoSelecionada),
    id_metodo_pgto: metodoInt
  }).subscribe({
    next: () => this.mensagem = 'Doação realizada com sucesso! ❤️',
    error: (err: any) => this.mensagem = 'Erro: ' + (err.error?.error || 'Tente novamente.')
  });
}
}