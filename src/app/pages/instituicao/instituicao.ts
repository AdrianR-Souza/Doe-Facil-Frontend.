import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InstituicaoService } from '../../services/instituicao';
import { PedidoService } from '../../services/pedido';
import { ProdutoService } from '../../services/produto';
import { DoadorService } from '../../services/doador';

@Component({
  selector: 'app-instituicao',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './instituicao.html',
  styleUrl: './instituicao.css',
})
export class Instituicao implements OnInit {
  email: string = '';
  senha: string = '';
  mensagem: string = '';
  instituicaoLogada: any = null;
  mostrarCadastro: boolean = false;
  instituicoes: any[] = [];
  pedidos: any[] = [];
  produtos: any[] = [];
  doadores: any[] = [];
  totalRecebido: number = 0;
  totalItens: number = 0;

  constructor(
    private instituicaoService: InstituicaoService,
    private pedidoService: PedidoService,
    private produtoService: ProdutoService,
    private doadorService: DoadorService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.instituicaoService.listar().subscribe((data: any[]) => {
      this.instituicoes = data;
      this.cdr.detectChanges();
    });
    this.produtoService.listar().subscribe((data: any[]) => {
      this.produtos = data;
      this.cdr.detectChanges();
    });
    this.doadorService.listar().subscribe((data: any[]) => {
      this.doadores = data;
      this.cdr.detectChanges();
    });
  }

  entrar() {
    if (!this.email || !this.senha) {
      this.mensagem = 'Preencha todos os campos!';
      return;
    }

    const inst = this.instituicoes.find((i: any) =>
      i.email === this.email && i.cnpj.toString().slice(-4) === this.senha
    );

    if (inst) {
      this.instituicaoLogada = inst;
      this.mensagem = '';
      this.carregarPedidos();
    } else {
      this.mensagem = 'E-mail ou senha incorretos!';
      this.cdr.detectChanges();
    }
  }

  carregarPedidos() {
    this.pedidoService.listar().subscribe((data: any[]) => {
      this.pedidos = data.filter((p: any) => p.id_instituicao === this.instituicaoLogada.id);
      this.totalItens = this.pedidos.reduce((acc: number, p: any) => {
        return acc + (p.id_produtos?.length ?? 1);
      }, 0);
      this.totalRecebido = this.pedidos.reduce((acc: number, p: any) => {
        const ids = p.id_produtos ?? [p.id_produto];
        return acc + ids.reduce((s: number, id: number) => {
          const prod = this.produtos.find((pr: any) => pr.id === id);
          return s + (prod ? (prod.preco ?? prod.valor ?? 0) : 0);
        }, 0);
      }, 0);
      this.cdr.detectChanges();
    });
  }

  getNomeDoador(id_doador: number): string {
    const doador = this.doadores.find((d: any) => d.id === id_doador);
    return doador ? doador.nome : 'Doador #' + id_doador;
  }

  getNomeProdutos(p: any): string {
  const ids = p.id_produtos ?? [p.id_produto];
  const contagem: { [key: number]: number } = {};
  
  ids.forEach((id: number) => {
    contagem[id] = (contagem[id] || 0) + 1;
  });

  return Object.entries(contagem).map(([id, qtd]) => {
    const prod = this.produtos.find((pr: any) => pr.id === Number(id));
    const nome = prod ? prod.nome : 'Produto #' + id;
    return qtd > 1 ? `${nome} x${qtd}` : nome;
  }).join(' + ');
}

  getTotalPedido(p: any): number {
    const ids = p.id_produtos ?? [p.id_produto];
    return ids.reduce((acc: number, id: number) => {
      const prod = this.produtos.find((pr: any) => pr.id === id);
      return acc + (prod ? (prod.preco ?? prod.valor ?? 0) : 0);
    }, 0);
  }

  verEstoque: boolean = false;
  menuAberto: boolean = false;

getEstoque(): any[] {
  const contagem: { [key: number]: number } = {};
  
  this.pedidos.forEach((p: any) => {
    const ids = p.id_produtos ?? [p.id_produto];
    ids.forEach((id: number) => {
      contagem[id] = (contagem[id] || 0) + 1;
    });
  });

  return Object.entries(contagem).map(([id, qtd]) => {
    const prod = this.produtos.find((pr: any) => pr.id === Number(id));
    return {
      nome: prod ? prod.nome : 'Produto #' + id,
      quantidade: qtd
    };
  });
}

verDoacoes: boolean = false;
buscaDoacoes: string = '';

get pedidosFiltrados(): any[] {
  if (!this.buscaDoacoes) return this.pedidos;
  return this.pedidos.filter((p: any) => {
    const nomeDoador = this.getNomeDoador(p.id_doador).toLowerCase();
    const produtos = this.getNomeProdutos(p).toLowerCase();
    const busca = this.buscaDoacoes.toLowerCase();
    return nomeDoador.includes(busca) || produtos.includes(busca);
  });
}
verPerfil: boolean = false;
verNotificacoes: boolean = false;
editandoPerfil: boolean = false;
mensagemPerfil: string = '';

salvarPerfil() {
  this.instituicaoService.atualizar(this.instituicaoLogada.id, this.instituicaoLogada).subscribe({
    next: () => {
      this.mensagemPerfil = 'Dados atualizados com sucesso!';
      this.editandoPerfil = false;
      this.cdr.detectChanges();
    },
    error: () => {
      this.mensagemPerfil = 'Erro ao atualizar dados.';
      this.cdr.detectChanges();
    }
  });
}
}