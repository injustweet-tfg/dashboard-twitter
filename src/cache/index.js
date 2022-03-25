// Server

const express = require('express');
const app = express();

const cors = require("cors");
// require("dotenv").config({ path: "./config.env" });

// Settings
const port = process.env.PORT || 5000;

// Midedlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tweets', require('./routes/tweets'));
const dbo = require("./db/conn");


app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
}
);