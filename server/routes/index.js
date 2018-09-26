'use strict';

var express = require('express');
var router = express.Router();
var data = [
  {
    image: 'http://predialprimus.com.br/imoveis/venda/4294/15.jpg',
    brandModel: 'hyundai',
    year: 2010,
    plate: 'LPQ4493',
    color: 'gray',
  },
  {
    image: 'http://predialprimus.com.br/imoveis/venda/4294/16.jpg',
    brandModel: 'hyundai',
    year: 2010,
    plate: 'LPQ4493',
    color: 'gray',
  },
  {
    image: 'http://predialprimus.com.br/imoveis/venda/4294/19.jpg',
    brandModel: 'hyundai',
    year: 2010,
    plate: 'LPQ4493',
    color: 'gray',
  },
  {
    image: 'http://predialprimus.com.br/imoveis/venda/4294/21.jpg',
    brandModel: 'hyundai',
    year: 2010,
    plate: 'LPQ4493',
    color: 'gray',
  },
];

router.get('/', function(req, res) {
  res.json(data);
});

router.post('/', function(req, res) {
  data.push({
    image: req.body.image,
    brandModel: req.body.brandModel,
    year: req.body.year,
    plate: req.body.plate,
    color: req.body.color,
  });
  res.json({ message: 'success' });
});

module.exports = router;
