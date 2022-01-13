const express = require('express'); 
const mongoose = require('mongoose'); 
const Product = require('./models/Product');
const bodyParser = require('body-parser'); 
const { fetchProducts } = require('./scraper'); 

require('dotenv').config(); 
const app = express(); 

// Router instance 
const router = express.Router(); 

// Middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', router); 

// Routes 
router.get('/', (req, res) => {
    res.send('Welcome to Lego Starwars Api!').status(200); 
}); 

router.get('/products', async (req, res) => {
    // if req.query object is empty 
    if (Object.keys(req.query).length === 0) {
        const products = await Product.find({}); // find all products
        try {
            if (products.length === 0) return res.send('products not found').status(404); 
            res.send(products).status(200);
        } catch (error) {
            res.status(500).send(error);
        }   
    } 
    if (req.query.page && req.query.limit) { // find all products with pagination
        const field = {}; 
        paginatedResults(field, req, res);
    } 
    // filter products 
    if (req.query.availability) {
        const availability = req.query.availability;  
        // case insensitive search 
        const products = await Product.find({ availability: availability}).collation(
          { locale: 'en', strength: 2 }
        );

        try {
            if (products.length === 0) return res.status(404).send(`The products with availability "${availability}" was not found`); 
            res.send(products).status(200); 
        } catch(err) {
            res.status(500).send(err);
        }
    }
    if (req.query.price) {
        const price = req.query.price;  
        // case insensitive search 
        const products = await Product.find({ price: { $lte: price }});

        try {
            if (products.length === 0) return res.status(404).send(`The products with availability "${price}" was not found`); 
            res.send(products).status(200); 
        } catch(err) {
            res.status(500).send(err);
        }
    }
    if (req.query.reviews) {
        const reviews = req.query.reviews;  
        // case insensitive search 
        const products = await Product.find({ reviews: { $gte: parseInt(reviews) } });

        try {
            if (products.length === 0) return res.status(404).send(`The products with reviews "${reviews}" was not found`); 
            res.send(products).status(200); 
        } catch(err) {
            res.status(500).send(err);
        }
    }
});

async function paginatedResults(field, req, res) {
    const products = await Product.find(field);

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit); 

    const startIndex = (page - 1) * limit; 
    const endIndex = page * limit; 

    const results = {};

    if (endIndex < products.length) {
        results.next = {
            page: page + 1,
            limit: limit,
        } 
    }

    if (startIndex > 0) {
        results.prev = {
            page: page - 1,
            limit: limit,
        }
    }

    results.products = products.slice(startIndex, endIndex); 
    res.send(results); 
}

// db instance 
const db = mongoose.connection; 

// Connect to MongoDB 
mongoose.connect(`${process.env.DB_CONNECTION}`, async () => {
    console.log('successfully connected to MongoDB');
});

// Insert initial data 
db.once('open', async () => {
    if (await Product.countDocuments().exec() > 0) return 
    const products = await fetchProducts(); 
    products.forEach(async (product) => {
        const productData = await Product.create({
            set: product.set,
            item_id: parseInt(product.item_id),
            reviews: parseInt(product.reviews),
            rating: product.rating,
            availability: product.availability, 
            price: parseInt(product.price),
            images: product.images,
            ages: product.ages,
            pieces: parseInt(product.pieces),
        });
        await productData.save();
    });
    console.log('Products inserted!');
}); 

const PORT = 9000; 

app.listen(PORT, () => console.log(`server running on PORT ${PORT}...`));