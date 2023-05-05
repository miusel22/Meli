const express = require('express');
const axios = require('axios');

const app = express();

// Endpoint para buscar productos
app.get('/api/items', async (req, res) => {
  const query = req.query.q;

  try {
    res.header('Access-Control-Allow-Origin', '*');
    const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
    const categories = response.data.filters[0]?.values[0]?.path_from_root.map(category => category.name) || [];
    const items = response.data.results.map(result => ({
      id: result.id,
      title: result.title,
      price: {
        currency: result.currency_id,
        amount: Math.floor(result.price),
        decimals: (result.price % 1).toFixed(2).substring(2)
      },
      picture: result.thumbnail,
      condition: result.condition,
      free_shipping: result.shipping.free_shipping
    }));
    console.log("el resultado")

    const responseObj = {
      author: {
        name: 'Nombre del autor',
        lastname: 'Apellido del autor'
      },
      categories,
      items
    };
    res.json(responseObj);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al buscar productos');
  }
});

// Endpoint para obtener detalles de un producto
app.get('/api/items/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const [itemResponse, descriptionResponse] = await Promise.all([
      axios.get(`https://api.mercadolibre.com/items/${id}`),
      axios.get(`https://api.mercadolibre.com/items/${id}/description`)
    ]);
    const item = {
      id: itemResponse.data.id,
      title: itemResponse.data.title,
      price: {
        currency: itemResponse.data.currency_id,
        amount: Math.floor(itemResponse.data.price),
        decimals: (itemResponse.data.price % 1).toFixed(2).substring(2)
      },
      picture: itemResponse.data.pictures[0]?.url || itemResponse.data.thumbnail,
      condition: itemResponse.data.condition,
      free_shipping: itemResponse.data.shipping.free_shipping,
      sold_quantity: itemResponse.data.sold_quantity,
      description: descriptionResponse.data.plain_text
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