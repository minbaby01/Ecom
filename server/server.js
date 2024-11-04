const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminArticlesRouter = require("./routes/admin/articles-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartsRouter = require("./routes/shop/carts-routes");
const shopAddressRouter = require("./routes/shop/address-routes");

const commonFeatureRouter= require('./routes/common/feature-routes')

mongoose.connect("mongodb+srv://admin:admin1234@cluster0.yypkr.mongodb.net/").then(() => {
    console.log("Connected");
}).catch((err) => {
    console.log(err);
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            "Content-Type",
            "Authorziration",
            "Cache-Control",
            "Expires",
            "Prama"
        ],
        credentials: true
    })
)

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/admin/articles', adminArticlesRouter);

app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/carts', shopCartsRouter);
app.use('/api/shop/address', shopAddressRouter);

app.use('/api/common/feature', commonFeatureRouter);
app.listen(PORT, () => console.log(`Server is run on ${PORT} port`));