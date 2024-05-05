require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const connectDB = require('./server/config/db');
const { models } = require('mongoose');
const path = require("path");
const collection = require("./server/config/config");
const bcrypt = require('bcrypt');

const app = express();

//connectDB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// static files
app.use(express.static('public'));

// Express session
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
        }
    })
);

//flash massages
app.use(flash({ sessionKeyName: 'flashMessage' }));

//Template engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// routers
app.use('/', require('./server/routes/customer'));

app.use('/dosen', require('./server/routes/dosen'));

app.use('/staff', require('./server/routes/staff'));

app.get('/Dashboard', (req, res) => {
    // Kirimkan file login.html sebagai respons
    res.render("Dashboard")
});
// Define routes for login and signup
app.get('/login', (req, res) => {
    // Kirimkan file login.html sebagai respons
    res.sendFile(__dirname + '/views/login.html');
});




app.get("/signup", (req, res) => {

    res.sendFile(__dirname + '/views/signup.html');

});



// Register User
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    // Check if the username already exists in the database
    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

        const userdata = await collection.insertMany(data);
        console.log(userdata);

        res.redirect("/login")
    }
});

// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("User name cannot found")
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            res.redirect("/");
        }
    }
    catch {
        res.send("wrong Details");
    }
});

//handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
});

// Define Port for Application
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
