const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./server/routes/user');
const roomRoutes = require('./server/routes/room');
const bookingRoutes = require('./server/routes/booking');
const categoryRoutes = require('./server/routes/categories');
const app = express();
const path = require('path');

mongoose.connect('mongodb+srv://Florine:florine@cluster0-hqmob.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/room/categories', categoryRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/images', express.static(path.join(__dirname, 'server/images')));

module.exports = app;
