const express = require('express')
const app = express()

const axios = require('axios')

const cors = require('cors')

require('dotenv').config()

app.use(cors())

let headers = {
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': process.env.X_SHOPIFY_ACCESS_TOKEN,
}

app.get('/products', async (req, res) => {
  await axios
    .get(
      'https://my-scube-store.myshopify.com/admin/api/2024-04/products.json',
      {
        headers: headers,
      },
    )
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
})

app.get('/shop', async (req, res) => {
  await axios
    .get('https://my-scube-store.myshopify.com/admin/api/2024-04/shop.json', {
      headers: headers,
    })
    .then((response) => {
      //   let data = response.data
      //   console.log(data, 'data')
      //   res.send({
      //     data: data,
      //   })
      res.send(JSON.stringify(response.data))
    })
    .catch((error) => {
      console.log(error)
    })
})

app.get('/customers', async (req, res) => {
  await axios
    .get(
      'https://my-scube-store.myshopify.com/admin/api/2024-04/customers.json',
      {
        headers: headers,
      },
    )
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
})

app.get('/events', async (req, res) => {
  await axios
    .get(
      'https://my-scube-store.myshopify.com/admin/api/2024-04/events.json',
      {
        headers: headers,
      },
    )
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
})

app.get('/store', async (req, res) => {
  await axios
    .get('https://my-scube-store.myshopify.com/admin/api/2024-04/store.json', {
      headers: headers,
    })
    .then((response) => {
      //   let data = response.data
      //   console.log(data, 'data')
      //   res.send({
      //     data: data,
      //   })
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
})

app.get('/orders', async (req, res) => {
  await axios
    .get('https://my-scube-store.myshopify.com/admin/api/2024-04/orders.json', {
      headers: headers,
    })
    .then((response) => {
      //   let data = response.data
      //   console.log(data, 'data')
      //   res.send({
      //     data: data,
      //   })
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
})

app.listen(3333, () => {
  console.log('server running at port 3333')
})
