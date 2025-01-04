const express = require('express');
const router = express();

const { signInCMS } = require('./controller');

router.post('/auth/signin', signInCMS);

module.exports = router;