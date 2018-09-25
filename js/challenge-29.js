(function($) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax. - OK

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js. - OK

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app". - OK
  */

  var app = (function appController() {
    return {
      init: function init() {
        this.companyInfo();
        this.saveNewCar();
      },

      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },

      getElement: function getElement(element) {
        return $(`[data-js=${element}]`).get();
      },

      getCompanyInfo: function getCompanyInfo() {
        if (!app.requestOk.call(this)) return;

        var response = JSON.parse(this.responseText);
        var $title = app.getElement('title');
        var $tel = app.getElement('phone');
        $title.textContent = response.name;
        $tel.textContent = response.phone;
      },

      requestOk: function requestOk() {
        return this.readyState === 4 && this.status === 200;
      },

      saveNewCar: function saveNewCar() {
        $('[data-js="formCadastro"]').on('submit', this.handleSubmit);
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();

        var $tableCar = app.getElement('table-car');
        $tableCar.appendChild(app.createNewCar());
      },

      createEl: function createEl(element) {
        return document.createElement(element);
      },

      removeRow: function removeRow(event) {
        var $tr = document.getElementById(event.target.id);
        $tr.remove();
      },

      createNewCar: function createNewCar() {
        var id = Math.floor(Math.random() * 1000);
        var $fragment = document.createDocumentFragment();
        var $tr = document.createElement('tr');
        $tr.setAttribute('id', id);

        var $tdImage = this.createEl('td');
        var $image = this.createEl('img');
        var $tdBrand = this.createEl('td');
        var $tdYear = this.createEl('td');
        var $tdPlate = this.createEl('td');
        var $tdCor = this.createEl('td');
        var $tdRemove = this.createEl('td');
        var $buttonRemove = this.createEl('button');

        $image.setAttribute('src', app.getElement('urlImage').value);
        $tdImage.appendChild($image);
        $tdBrand.textContent = app.getElement('brand').value;
        $tdYear.textContent = app.getElement('year').value;
        $tdPlate.textContent = app.getElement('plate').value;
        $tdCor.textContent = app.getElement('color').value;

        $buttonRemove.setAttribute('type', 'button');
        $buttonRemove.setAttribute('id', id);
        $buttonRemove.textContent = 'remover';
        $buttonRemove.addEventListener('click', this.removeRow);
        $tdRemove.appendChild($buttonRemove);

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdCor);
        $tr.appendChild($tdRemove);

        $fragment.appendChild($tr);

        return $fragment;
      },
    };
  })();

  app.init();
})(window.DOM);
