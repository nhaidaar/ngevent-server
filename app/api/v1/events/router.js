const express = require('express');
const router = express();

const { index, find, create, update, destroy } = require('./controller');

router.get('/events', index);
router.get('/events/:id', find);
router.post('/events', create);
router.put('/events/:id', update);
router.delete('/events/:id', destroy);

module.exports = router;