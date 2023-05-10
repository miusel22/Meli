const express = require('express');
const axios = require('axios');
const _ = require('lodash');

const app = express();

app.get('/api/items', async (req, res) => {
  const query = req.query.q;

  try {
    res.header('Access-Control-Allow-Origin', '*');
    const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
    const categories = response?.data?.available_filters.find(filter => filter.id === 'category') ?
      response.data.available_filters.find(filter => filter.id === 'category').values.map(category => ({
        id: category.id,
        nameCategory: category.name
      })) :
      response.data.filters.find(filter => filter.id === 'category').values.flatMap(category => category.path_from_root.map((category) => ({
        id: category.id,
        nameCategory: category.name
      })));
    const items = response.data.results.map(result => ({
      id: result.id,
      title: result.title,
      price: {
        currency: result.currency_id,
        amount: Math.floor(result.price),
        decimals: 00
      },
      picture: result.thumbnail,
      condition: result.condition,
      free_shipping: result.shipping.free_shipping,
      country: result.seller_address.city.name,
    }));
    const responseObj = {
      author: {
        name: 'Camila',
        lastname: 'Vélez'
      },
      items,
      categories
    };
    res.json(responseObj);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al buscar productos');
  }
});

app.get('/api/items/:id', async (req, res) => {
  const id = req.params.id;
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const [itemResponse, descriptionResponse] = await Promise.all([
      axios.get(`https://api.mercadolibre.com/items/${id}`),
      axios.get(`https://api.mercadolibre.com/items/${id}/description`)
    ]);
    const item = {
      id: itemResponse.data.id,
      title: itemResponse.data.title,
      category_id: itemResponse.data.category_id,
      price: {
        currency: itemResponse.data.currency_id,
        amount: Math.floor(itemResponse.data.price),
        decimals: 00
      },
      picture: itemResponse.data.thumbnail,
      condition: itemResponse.data.condition,
      link: itemResponse.data.permalink,
      free_shipping: itemResponse.data.shipping.free_shipping,
      sold_quantity: itemResponse.data.sold_quantity,
      description: descriptionResponse.data.plain_text,
    };

    const responseObj = {
      author: {
        name: 'Camila',
        lastname: 'Vélez'
      },
      item
    };
    res.json(responseObj);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener detalles del producto');
  }
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});