const express = require('express');
const path = require('path');

const router = express.Router();
const v = `../modules/${path.basename(__filename, '.js')}`;
const sampleRoutes = require(`${v}/sample/sampleRoute`);

router.use('/', sampleRoutes.sampleRouter);
router.use('/cat', sampleRoutes.sampleRouter);

// Handle Undefined Routes
router.all('/*', (req, res) => {
  return res.status(404).json({
    error: 'URL not found',
  });
});

module.exports = router;
