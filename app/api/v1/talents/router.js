const express = require('express');
const router = express();

const { index, find, create, update, destroy } = require('./controller');
const {
    authenticateUser,
    authorizeRoles,
} = require('../../../middlewares/auth');

router.get('/talents', authenticateUser(), authorizeRoles('organizer'), index);
router.get('/talents/:id', authenticateUser(), authorizeRoles('organizer'), find);
router.post('/talents', authenticateUser(), authorizeRoles('organizer'), create);
router.put('/talents/:id', authenticateUser(), authorizeRoles('organizer'), update);
router.delete('/talents/:id', authenticateUser(), authorizeRoles('organizer'), destroy);

module.exports = router;