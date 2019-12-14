const express = require('express');
const sampleCtr = require('./sampleController');
const sampleMiddleware = require('./sampleMiddleware');
const sampleRouter = express.Router();


sampleRouter.get('/', sampleCtr.getSample);
sampleRouter.get('/cat-image', sampleCtr.getCatImageById);
sampleRouter.get('/cat', [sampleMiddleware.sessionChecker], sampleCtr.getCatImagePublicSearch);
sampleRouter.get('/login', sampleCtr.sampleLoginCheck);
sampleRouter.post('/login', sampleCtr.sampleLogin);
sampleRouter.get('/logout', sampleCtr.sampleLogout);

module.exports = { sampleRouter };
