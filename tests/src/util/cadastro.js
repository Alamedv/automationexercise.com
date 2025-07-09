import { expect } from "@playwright/test";

export class Endereco {
    constructor(company, endereco, endereco2, pais, estado, cidade, cep, telefone) {
        this.company = company || 'Ubisoft'
        this.endereco = endereco || 'Ubisoft San Francisco'
        this.endereco2 = endereco2 || '300 Mission St 20th floor'
        this.pais = pais || 'United States'
        this.estado = estado || 'San Francisco'
        this.cidade = cidade || 'California'
        this.cep = cep || '94105'
        this.telefone = telefone || '21981803731'

    }
}

export class User {
    constructor(nome, sobrenome, senha, telefone, diaNasc, mesNasc, anoNasc) {
        this.nome = nome
        this.sobrenome = sobrenome
        this.senha = senha
        this.telefone = telefone
        this.diaNasc = diaNasc
        this.mesNasc = mesNasc
        this.anoNasc = anoNasc
        this.mail = this.gerarEmail()
    }



    gerarEmail() {
        const prefixo = 'soho'
        const random = Math.floor(Math.random() * 1000)
        return `${prefixo}${random}@gmail.com`
    }
}
const user = new User(
    'Soho',
    'boyyy',
    '123456789',
    '21981803731',
    '13',
    'August',
    '2000');
const endereco1 = new Endereco('Ubisoft',
    'Ubisoft San Francisco',
    '300 Mission St 20th floor',
    'United States',
    'San Francisco',
    'California',
    '94105',
    '21981803731');

export class HomePage {
    constructor(page) {
        this.user = user;
        this.page = page;
    }

    //step 1, 2, 3
    async acessaHome() {
        await this.page.goto('https://automationexercise.com/');
        await this.page.getByRole('img', { name: 'Website for automation practice' });

    }

    //step 4, 5
    async acessaLogin() {
        await this.page.getByRole('link', { name: 'Signup / Login' }).click();
        await expect(this.page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    }


    //step 6, 7, 8
    async preencheDados() {

        await this.page.getByRole('textbox', { name: 'name' }).fill(user.nome)
        await this.page.locator('[data-qa="signup-email"]').fill(user.mail);
        await this.page.locator('[data-qa="signup-button"]').click();
        await expect(this.page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();
    }


    //step 9, 10, 11
    async preencheDetalhes() {

        await this.page.getByRole('radio', { name: 'Mr.' }).click()
        await this.page.locator('[data-qa="password"]').fill(user.senha);
        await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).click()
        await this.page.getByRole('checkbox', { name: 'Receive special offers from our partners!' }).click()

        await this.page.locator('//*[@id="days"]').selectOption(user.diaNasc);
        await this.page.locator('//*[@id="months"]').selectOption(user.mesNasc);
        await this.page.locator('//*[@id="years"]').selectOption(user.anoNasc);

    }

    //step 12, 13, 14, 15
    async preencheDadosCompletos() {

        await this.page.locator('[data-qa="first_name"]').fill(user.nome);
        await this.page.locator('[data-qa="last_name"]').fill(user.sobrenome);
        await this.page.locator('[data-qa="company"]').fill(endereco1.company);
        await this.page.locator('[data-qa="address"]').fill(endereco1.endereco);
        await this.page.locator('[data-qa="address2"]').fill(endereco1.endereco2);
        await this.page.locator('//*[@id="country"]').selectOption(endereco1.pais);
        await this.page.locator('[data-qa="state"]').fill(endereco1.estado);
        await this.page.locator('[data-qa="city"]').fill(endereco1.cidade);
        await this.page.locator('[data-qa="zipcode"]').fill(endereco1.cep);
        await this.page.locator('[data-qa="mobile_number"]').fill(user.telefone);
        await this.page.getByRole('button', { name: 'Create Account' }).click();
        await expect(this.page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Continue' }).click();

    }

    //step 16, 17, 18
    async deletarConta() {
        await expect(this.page.getByText('Logged in as')).toBeVisible();
        await this.page.getByRole('link', { name: 'Delete Account' }).click();
        await expect(this.page.getByRole('heading', { name: 'Account Deleted!' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Continue' }).click();
    }
}
