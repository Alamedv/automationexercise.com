// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from './src/util/cadastro';


test('Deve fazer login', async ({ page }) => {
  const paginaInicial = new HomePage(page)

  


  await paginaInicial.acessaHome();
  await paginaInicial.acessaLogin();
  await paginaInicial.preencheDados();
  await paginaInicial.preencheDetalhes()
  await paginaInicial.preencheDadosCompletos()
  await paginaInicial.deletarConta()


});