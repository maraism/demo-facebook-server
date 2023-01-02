const passport = require('passport');
const express = require('express');
const router = express.Router();
const config = require('../config');

router.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email', 'read_insights', 'pages_read_engagement', 'pages_manage_metadata', 'pages_show_list']
}));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: config.client.url,
        failureRedirect: '/auth/failed'
    }));

router.get("/success", (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            cookies: req.cookies
        });
    } else {
        res.status(401).json({
            success: false,
            message: "user failed to authenticate."
        });
    }
});

router.get("/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate."
    });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});



module.exports = router;