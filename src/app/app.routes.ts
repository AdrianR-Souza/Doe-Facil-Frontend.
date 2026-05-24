import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Alimentos } from './pages/alimentos/alimentos';
import { Painel } from './pages/painel/painel';
import { NovaDoacao } from './pages/nova-doacao/nova-doacao';
import { Pagamento } from './pages/pagamento/pagamento';
import { Perfil } from './pages/perfil/perfil';
import { Suporte } from './pages/suporte/suporte';
import { Cadastro } from './pages/cadastro/cadastro';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';
import { Instituicao } from './pages/instituicao/instituicao';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'alimentos', component: Alimentos },
  { path: 'painel', component: Painel },
  { path: 'nova-doacao', component: NovaDoacao },
  { path: 'pagamento', component: Pagamento },
  { path: 'perfil', component: Perfil },
  { path: 'suporte', component: Suporte },
  { path: 'cadastro', component: Cadastro },
  { path: 'admin', component: Admin },
  { path: 'login', component: Login },
  { path: 'instituicao', component: Instituicao },
  { path: '**', redirectTo: '' }
];