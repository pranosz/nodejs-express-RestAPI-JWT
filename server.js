const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// middleware - it's soething between request and response
// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Built-in middleware
// content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// server sttic files
app.use(express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/products', require('./routes/api/products'));

/*
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})*/

app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if(req.accepts('json')) {
        res.json({error: '404 Not Found'});
    } else {
        res.type('txt').send('404 Not Found');
    }
    
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server rinning :) on port ${PORT}`));