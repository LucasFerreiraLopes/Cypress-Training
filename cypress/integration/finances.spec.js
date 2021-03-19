/// <reference types="cypress"/>

import { format, prepareLocalStorage } from "../support/utils";

context("Dev Finances Agilizei", () => {
  beforeEach(() => {
    cy.visit('https://devfinance-agilizei.netlify.app', {
        onBeforeLoad: (win) => {
            prepareLocalStorage(win)
        }
    })

  });

  it("Cadastrar Entradas", () => {
    cy.get("#transaction .button").click(); // id + classe
    cy.get("#description").type("Salario"); //id
    cy.get("[name=amount]").type(1300); // atributos
    cy.get("[type=date]").type("2021-03-18"); //atributos
    cy.get("button").contains("Salvar").click(); //tipo e valor
    cy.get("#data-table tbody tr").should("have.length", 3); // Assert para verificar tamanho da tabela =1
  });

  // Cadastrar Saídas

  it("Cadastrar Saídas", () => {
    cy.get("#transaction .button").click(); // id + classe
    cy.get("#description").type("Salario"); //id
    cy.get("[name=amount]").type(-880); // atributos
    cy.get("[type=date]").type("2021-03-18"); //atributos
    cy.get("button").contains("Salvar").click(); //tipo e valor
    cy.get("#data-table tbody tr").should("have.length", 3); // Assert para verificar tamanho da tabela =1
  });
  // Remover entradas e saídas

  it("Remover entradas e saídas", () => {
    

    //estratégia 1: voltar para elemento pai, e avançar para um td img attr
    cy.get("td.description")
      .contains('Salario')
      .parent()
      .find("img[onclick*=remove]")
      .click();

    //estratégia 2: buscar todos os irmãos, e buscar o quem img + attr
    cy.get("td,description")
      .contains('McDonalds')
      .siblings()
      .children("img[onclick*=remove]")
      .click();
    cy.get("#data-table tbody tr").should("have.length", 0);
  });

  it("Validar saldo com diversas transações", () => {

    // capturar as linhas com as transações e as colunas com valores
    // capturar o texto dessa colunas
    // formatar esses valores das linhas

    // somar os valores de entradas e saidas
    // capturar o texto do total
    // comparar a soma de entradas e saidas com o total

    let incomes = 0;
    let expenses = 0;

    cy.get("#data-table tbody tr").each(($el, index, $list) => {
      cy.get($el)
        .find("td.income, td.expense")
        .invoke("text")
        .then((text) => {
          if (text.includes("-")) {
            expenses = expenses + format(text)
          } else {
            incomes = incomes + format(text)
          }

          cy.log(`entradas`, incomes);
          cy.log(`saidas`, expenses);
        });
    });

    cy.get('#totalDisplay').invoke('text').then(text => {
        let formattedTotalDisplay = format(text)
        let expectedTotal = incomes + expenses

        expect(formattedTotalDisplay).to.eq(expectedTotal)

    })

  });
});

// Entender o fluxo manual
// Mapear os elementos que vamos interagir
// descrever as interações com o cypress
// adicionar as asserções que precisamos
