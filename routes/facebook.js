const express = require('express');
const router = express.Router();
const FB = require('fb');

router.get('/accounts', (req, res) => {    
    FB.setAccessToken(req.user.accessToken);
    FB.api(
        `/${req.user.user.id}/accounts`,
        'GET',
        {},
        function (response) {

            const accounts = [];
            for (const account of response.data) {
                accounts.push({
                    'id': account.id,
                    'name': account.name,
                    'category': account.category,
                    'accessToken': account.access_token
                });
            }

            res.json({
                success: true,
                data: accounts,
                user: req.user,
                cookies: req.cookies        
            })
        }
    );
});

router.get('/account/:pageId/posts', (req, res) => {    
    const pageAccessToken = req.query.accessToken;
    const pageId = req.params.pageId;
    FB.setAccessToken(pageAccessToken);
    FB.api(
        `/${pageId}/posts?fields=full_picture,message,insights.metric(post_impressions,post_impressions_unique,post_reactions_like_total,post_reactions_love_total, post_reactions_wow_total,post_reactions_haha_total,post_reactions_sorry_total,post_reactions_anger_total)`, // post_reactions_by_type_total 
        'GET',
        {},
        function (response) {
            res.json({
                success: true,
                data: response,
                user: req.user,
                cookies: req.cookies        
            })
        }
    );
});

express.Router

module.exports = router;