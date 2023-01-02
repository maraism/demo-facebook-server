const express = require('express');
const router = express.Router();
const config = require('../config');

var token = config.facebookAuth.HUB_VERIFY_TOKEN;


router.get('/webhook', function (req, res) {
    if (
        req.query['hub.mode'] == 'subscribe' &&
        req.query['hub.verify_token'] == token
    ) {
        res.send(req.query['hub.challenge']);
    } else {
        res.sendStatus(400);
    }
});

router.post('/webhook', function (req, res) {

    if (!req.isXHubValid()) {
        console.log('Warning - request header X-Hub-Signature not present or invalid');
        res.sendStatus(401);
        return;
    }

    if (req.body.object === 'page') {
        clients.forEach(client => client.response.write(`data: ${JSON.stringify(req.body.entry)}\n\n`));
    } else {
        clients.forEach(client => client.response.write(`data: ${JSON.stringify([])}\n\n`));
    }
    res.sendStatus(200);
});

let clients = [];
function eventsHandler(request, response, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);

    const data = `data: ${JSON.stringify([])}\n\n`;
    response.write(data);

    const clientId = Date.now();
    const newClient = {
        id: clientId,
        response
    };

    clients.push(newClient);

    request.on('close', () => {
        clients = clients.filter(client => client.id !== clientId);
    });
}

router.get('/events', eventsHandler);

module.exports = router;