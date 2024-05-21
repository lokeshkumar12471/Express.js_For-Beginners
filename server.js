const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello World!<h1>');
})

const products = [
    {
        id: '1',
        name: 'iphone',
        price: 50000,
    },
    {
        id: '2',
        name: 'nokia',
        price: 30000,
    },
    {
        id: '3',
        name: 'redmi',
        price: 20000,
    }
];

//create a product
app.post('/addproducts', (req, res) => {
    const { id, name, price } = req.body;
    console.log(id, name, price);
    return res.send('data added successfully');
})

//display a product
app.get('/products', (req, res) => {
    res.json(products);
})

//display single product
app.get('/products/:id', (req, res) => {
    const newData = products.filter(item => item.id.toString() === req.params.id);
    return res.json(newData);
})

//update a product
app.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const productUpdates = req.body;
    const product = products.find(product => product.id === productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    Object.assign(product, productUpdates);
    console.log(product);
    return res.json({ message: 'Product updated successfully' });
});

app.listen(8000, () => console.log('Server Running......'));

//delete a product
app.delete('/products/:id', (req, res) => {
    const newData = products.filter(item => item.id.toString() === req.params.id);
    if (!newData) {
        return res.status(404).json({ message: 'Product not found' });
    } else {
        console.log(newData);
        return res.send('data deleted successfully');
    }
    return res.json(newData);
})