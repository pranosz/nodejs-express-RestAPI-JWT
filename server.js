const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

// Built-in middleware
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));



app.get('/index(.html)?', (req, res) => {
   // res.sendFile('./views/index.html', {root: __dirname});
   res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/dashboard(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
 })

app.get('/cos(.html)?', (req, res) => {
    res.redirect(301,'/index.html');
})

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'dashboard.html'));
})

app.listen(PORT, () => console.log(`Server rinning :) on port ${PORT}`));