import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { InstituicaoService } from '../../services/instituicao';
import { PedidoService } from '../../services/pedido';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  totalDoacoes: number = 0;
  totalOngs: number = 0;
  menuAberto: boolean = false;
  instituicoes: any[] = [];
  ongSelecionada: any = null;
  verOngs: boolean = false;

  constructor(
    private instituicaoService: InstituicaoService,
    private pedidoService: PedidoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.instituicaoService.listar().subscribe((data: any[]) => {
      this.totalOngs = data.length;
      this.instituicoes = data;
      this.cdr.detectChanges();
    });
    this.pedidoService.listar().subscribe((data: any[]) => {
      this.totalDoacoes = data.length > 0 ? data[data.length - 1].id : 0;
      this.cdr.detectChanges();
    });
  }

  navegarPara(rota: string) {
    this.menuAberto = false;
    this.router.navigate([rota]);
  }
}