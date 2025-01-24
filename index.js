import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Correctly define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
    const currentDateTime = new Date().toISOString();
    console.log(`${currentDateTime} | ${req.method} | ${req.path}`);
    next();
});

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'public')));

// Define routes
app.get("/", (req, res) => {
    res.send("Welcome to GlowDerma - Your Skincare Journey Begins Here");
});

app.get("/about", (req, res) => {
    res.send("<h3>We are a premium skincare brand committed to bringing you dermatologist-approved, clean beauty products</h3>");
});

app.get("/contact", (req, res) => {
    res.send({
        "email": "care@glowderma.com",
        "instagram": "http://instagram.com/glowderma",
        "consultation": "http://glowderma.com/book-appointment"
    });
});

app.get("/services", (req, res) => {
    res.send("Services provided by Skinfinity.");
});

let orders = [
    { id: 1, product: 'Anti-Aging Serum', quantity: 2 },
    { id: 2, product: 'Vitamin C Moisturizer', quantity: 1 },
    { id: 3, product: 'Hyaluronic Acid', quantity: 3 }
];

app.get("/orders/:orderID", (req, res) => {
    const orderID = parseInt(req.params.orderID);
    const order = orders.find(order => order.id === orderID);
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404).send("Order Not Found");
    }
});

let products = [
    { id: 11, name: "Retinol Serum", price: 1200, availableQty: 50 },
    { id: 12, name: "Niacinamide Solution", price: 800, availableQty: 30 },
    { id: 14, name: "Peptide Moisturizer", price: 1500, availableQty: 100 },
    { id: 15, name: "Glycolic Acid Toner", price: 900, availableQty: 20 }
];

app.get("/products", (req, res) => {
    const { name, maxPrice } = req.query;
    let filteredProducts = products;

    if (name) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (maxPrice) {
        filteredProducts = filteredProducts.filter(product =>
            product.price <= parseInt(maxPrice, 10)
        );
    }

    res.status(200).json(filteredProducts);
});

app.get("/products/:pid", (req, res) => {
    const pid = parseInt(req.params.pid);
    let product = products.find(p => p.id === pid);

    if (product) {
        res.status(200).json({
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "availableQty": product.availableQty
        });
    } else {
        res.status(404).send("Product Not Found");
    }
});

let shoppingCart = [];
app.get("/cart", (req, res) => {
    res.status(200).json(shoppingCart);
});

app.post("/cart", (req, res) => {
    const { id, name, price, qty } = req.body;
    if (id && name && price && qty) {
        shoppingCart.push({ id, name, price, qty });
        res.status(201).json({ message: "Successfully added item to cart", data: { id, name, price, qty } });
    } else {
        res.status(400).json({ error: "Please ensure all fields are provided" });
    }
});

app.get("/policy", (req, res) => {
    res.send("Policy Information");
});

app.get("/image", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'demo.png'));
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send("We don't have this page yet!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Sorry! Something went wrong");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
