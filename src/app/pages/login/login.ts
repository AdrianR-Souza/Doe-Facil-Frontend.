import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DoadorService } from '../../services/doador';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  ultimosDigitos: string = '';
  mensagem: string = '';

  constructor(
    private doadorService: DoadorService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  entrar() {
    if (!this.email || !this.ultimosDigitos) {
      this.mensagem = 'Preencha todos os campos!';
      return;
    }

    if (this.ultimosDigitos.length !== 4) {
      this.mensagem = 'Digite os 4 últimos dígitos do telefone!';
      return;
    }

    this.doadorService.listar().subscribe((doadores: any[]) => {
      const doador = doadores.find((d: any) =>
        d.email === this.email &&
        d.telefone.replace(/\D/g, '').slice(-4) === this.ultimosDigitos
      );

      if (doador) {
        localStorage.setItem('doador_logado', JSON.stringify(doador));
        this.router.navigate(['/nova-doacao']);
      } else {
        this.mensagem = 'E-mail ou senha incorretos!';
        this.cdr.detectChanges();
      }
    });
  }
}