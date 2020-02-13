const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const app = express();
const path = require('path');

mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(bodyParser.json());

app.use(favicon(path.join(__dirname, '..', 'frontend', 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname,"..", "frontend", "build")));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//routes accessible without being authenticated are redirected in routes
app.use("/api",  require('./server/routes/publicRoutes'));

//All routes with retricted content pass trough the isAuth middleware to verify authentication
app.use('/api', require('./server/middleware/auth'), require('./server/routes/privateRoutes'));



/*app.use('/api/room/categories', categoryRoutes);
app.use('/auth', userRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/booking', bookingRoutes);*/

module.exports = app;
