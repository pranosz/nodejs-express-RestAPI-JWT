const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname});
    res.sendFile(path.join(__dirname,'..', 'views', 'index.html'));
 });
 
 router.get('/dashboard(.html)?', (req, res) => {
     res.sendFile(path.join(__dirname,'..', 'views', 'dashboard.html'));
  })
 
  router.get('/cos(.html)?', (req, res) => {
     res.redirect(301,'/index.html');
 })

module.exports = router;