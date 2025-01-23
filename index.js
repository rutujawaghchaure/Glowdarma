import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

let products = [
  {id: 1,name: "Hydrating Serum",price: "$25",description: "A lightweight serum that deeply hydrates and plumps the skin."},
  {id: 1,name: "Vitamin C Cream",price: "$30",description: "Brightens skin tone and reduces the appearance of dark spots."},
  { id: 3, name: "Toner", price: "$15", description: "Balances skin pH and tightens pores." },
  { id: 4, name: "Face Masks", price: "$30", description: "Detoxifies and refreshes the skin." },
  { id: 5, name: "Cleanser", price: "$18", description: "Gently cleanses and removes impurities." }
];

app.get("/", (req, res) => {
  res.send("Welcome to GlowDerma - Your Skincare Journey Begins Here.");
})

app.get("/About", (req, res) => {
  res.send("<h3>We are a premium skincare brand committed to bringing you dermatologist-approved, clean beauty products</h3>");
});

app.get("/Contact", (req, res) => {
  res.json({
    "email": "care@glowderma.com",
    "instagram": "http://instagram.com/glowderma",
    "consultation": "http://glowderma.com/book-appointment"
  })
})

app.get("/products", (req, res) => {
  res.json(products);
})

app.get("/products/:pid", (req, res) => {
  let pid = parseInt(req.params.pid);
  let product = products.find(x => x.id === pid);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send("Product not found.");
  }
})

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
  });

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
})