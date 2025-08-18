const express = require('express');
const router = express.Router();
const passport = require('../../../servicios/passport');
const { googleCallback } = require('../controladores/googleAuth');

router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/callback', passport.authenticate('google', { session: false }), googleCallback);

module.exports = router;
