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
        this.loadListCar();
        this.saveNewCar();
      },

      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'company.json', true);
        ajax.send();
        ajax.onreadystatechange = this.getCompanyInfo;
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

        var $url = app.getElement('urlImage').value;
        var $brand = app.getElement('brand').value;
        var $year = app.getElement('year').value;
        var $plate = app.getElement('plate').value;
        var $cor = app.getElement('color').value;

        var ajax = new XMLHttpRequest();
        ajax.open('POST', 'http://localhost:3000/car');
        ajax.setRequestHeader(
          'Content-Type',
          'application/x-www-form-urlencoded',
        );
        ajax.send(
          `image=${$url}&brandModel=${$brand}&year=${$year}&plate=${$plate}&color=${$cor}`,
        );

        ajax.onreadystatechange = function() {
          if (ajax.readyState === 4) {
            var $tableCar = app.getElement('table-car');
            var count = $tableCar.children.length;
            for (let i = 0; i < count; i++) {
              $tableCar.children[0].remove();
            }
            app.loadListCar();
          }
        };
      },

      createEl: function createEl(element) {
        return document.createElement(element);
      },

      removeRow: function removeRow(event) {
        var $tr = document.getElementById(event.target.id);
        $tr.remove();
      },

      loadListCar: function loadListCar() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://localhost:3000/car');
        ajax.send();
        ajax.onreadystatechange = this.getDataCar;
      },

      getDataCar: function getDataCar() {
        if (!app.requestOk.call(this)) return;

        var response = JSON.parse(this.responseText);
        var $tableCar = app.getElement('table-car');
        response.map(car => {
          $tableCar.appendChild(app.createNewCar(car));
        });
      },

      createNewCar: function createNewCar(car) {
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

        $image.setAttribute('src', car.image);
        $tdImage.appendChild($image);
        $tdBrand.textContent = car.brandModel;
        $tdYear.textContent = car.year;
        $tdPlate.textContent = car.plate;
        $tdCor.textContent = car.color;

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
