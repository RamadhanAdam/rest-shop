# 🚀 ORDER MANAGEMENT SYSTEM 📦  

> **A simple, fast, and efficient Express.js API for managing orders & products.**  
> **Handles CRUD operations, ensures product validation before order creation, and uses MongoDB as a database.**  

---

## ⚙️ SETUP & INSTALLATION  

🔹 **Clone the Repository**  
```sh
git clone https://github.com/yourusername/order-management-system.git
cd order-management-system
```

🔹 **Install Dependencies**  
```sh
npm install express mongoose body-parser multer morgan
npm install --save-dev nodemon
```

🔹 **Set Up Environment Variables**  
Create a `.env` file and add:  
```sh
MONGO_URI=mongodb://localhost:27017/your-database
```

🔹 **Run the Server**  
```sh
npm start  # Production Mode  
npm run dev  # Development Mode  
```

---

## 🛠️ API ENDPOINTS  

📌 **ORDERS**  
```sh
# Get all orders
GET /orders

# Get a specific order by ID
GET /orders/:orderId

# Create a new order (Requires existing product)
POST /orders
Body: { "productId": "123456", "quantity": 2 }

# Delete an order by ID
DELETE /orders/:orderId
```

📌 **PRODUCTS**  
```sh
# Get all products
GET /products

# Get a product by ID
GET /products/:productId

# Create a product
POST /products
Body: { "name": "Laptop", "price": 999.99 }

# Update a product by ID
PATCH /products/:productId
Body: { "price": 899.99 }

# Delete a product by ID
DELETE /products/:productId
```

---

## 💁️‍️ MODELS  

📦 **Product Model** (`models/product.js`)  
```javascript
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);
```

🛒 **Order Model** (`models/order.js`)  
```javascript
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Order', orderSchema);
```

---

## 🚨 ERROR HANDLING  

- **400 Bad Request** → Invalid input data  
- **404 Not Found** → Resource does not exist  
- **500 Internal Server Error** → Something broke 😢  

---

## 💻 COMMANDS  

```sh
npm start      # Run server (production)
npm run dev    # Run server (development)
npm test       # Run tests (if implemented)
npm run lint   # Check code quality
```

```sh
npm install bcrypt #Hashing library
```

```sh
npm install jsonwebtoken ## JWT Token -> always add --save to add an entry to package.json
```
---

## 🤝 CONTRIBUTING  

Want to improve this project? 🚀  

1️⃣ **Fork** the repo  
2️⃣ **Clone** it:  
```sh
git clone https://github.com/yourusername/order-management-system.git
```
3️⃣ **Create a new branch**:  
```sh
git checkout -b feature-name
```
4️⃣ **Make your changes & commit**:  
```sh
git commit -m "Added feature-name"
```
5️⃣ **Push & open a Pull Request!** 🚀  

---

## 🐟 LICENSE  
🗄 **MIT License** – Use, modify, and distribute freely.  

---

### 🎉 READY TO ORDER? RUN IT NOW!  
```sh
npm start
```
🔥 **Happy coding!** 🚀  

