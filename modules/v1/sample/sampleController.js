'use strict';
const request = require('request-promise-native');

const CAT_API_KEY = process.env.CAT_API_KEY;
const COOKIE_SESSION_KEY = process.env.COOKIE_SESSION_KEY;
const COOKIE_SESSION_USER = process.env.COOKIE_SESSION_USER;
const COOKIE_ACCESS_ALLOWED_ID = process.env.COOKIE_ACCESS_ALLOWED_ID;

const getSample = (req, res) => {
  return res.status(200).json({ message: 'ok', data: 'ok' });
};

const getCatImagePublicSearch = (req, res) => {
  const catSearchUri = 'https://api.thecatapi.com/v1/images/search';
  // NYI: 8 query params available
  // no query params returns random public image
  const options = {
    method: 'GET',
    uri: catSearchUri,
    headers: {
      'x-api-key': CAT_API_KEY
    },
    json: true,
  };
  console.log('catSearchUri request options:', options);
  request(options)
    .then((resp) => {
      console.log('got the cat response (data array):', resp);
      return res.status(200).json({ message: 'ok', data: resp });
    })
    .catch((err) => {
      console.log('cat err:', err);
      return res.status(400).json({ message: 'unable to complete request' });
    });
};

const getCatImageById = (req, res) => {
  const catbaseUri = 'https://api.thecatapi.com/v1/images';
  // const catUri = `${catbaseUri}/bj4`;
  console.log('req.query', req.query);
  const catUri = req.query.image_id ? `${catbaseUri}/${req.query.image_id}` : `${catbaseUri}/bj4`
  const options = {
    method: 'GET',
    uri: catUri,
    headers: {
      'x-api-key': CAT_API_KEY
    },
    json: true,
  };
  console.log('catUri request options:', options);
  request(options)
    .then((resp) => {
      console.log('got the cat response (data object):', resp);
      return res.status(200).json({ message: 'ok', data: resp });
    })
    .catch((err) => {
      console.log('cat err:', err);
      return res.status(400).json({ message: 'unable to complete request' });
    });
};

const sampleLogin = (req, res) => {
  console.log('sampleLogin req.body', req.body);
  if (!req.body.username || !req.body.password) {
    return res.status(200).clearCookie('accessToken').json({ message: 'Missing credentials', data: 'Missing credentials' });
  }
  const isUserMatch = req.body.username === COOKIE_SESSION_USER && req.body.password === COOKIE_SESSION_KEY ? true : false;
  console.log('sampleLogin isUserMatch:', isUserMatch);
  if (!isUserMatch) {
    console.log('sampleLogin credentials mismatch case');
    return res.status(200).clearCookie('accessToken').json({ message: 'Unauthorized', data: 'Invalid credentials' });
  }
  console.log('sampleLogin credentials ok');
  return res.status(200).cookie('accessToken', COOKIE_ACCESS_ALLOWED_ID).json({ message: 'Authenticated', data: {accessToken: COOKIE_ACCESS_ALLOWED_ID} });
};

const sampleLogout = (req, res) => {
  return res.status(200).clearCookie('accessToken').json({ message: 'Logout Success', data: 'Logout Success' });
};

const sampleLoginCheck = (req, res) => {
  console.log('sampleLoginCheck req.cookies', req.cookies);
  const authenticationStatus = req.cookies && req.cookies.accessToken === COOKIE_ACCESS_ALLOWED_ID ? 'Authenticated' : 'Unauthorized';
  console.log('sampleLoginCheck cookie match check:', authenticationStatus);
  return res.status(200).json({ message: authenticationStatus, data: authenticationStatus });
};

const sampleMethods = {
  getSample,
  getCatImageById,
  getCatImagePublicSearch,
  sampleLogin,
  sampleLoginCheck,
  sampleLogout,
};

module.exports = sampleMethods;
