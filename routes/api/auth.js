var express = require('express');
var router = express.Router();
const { registerUser } = require('../../dal/auth');

router.post('/register', async function (req, res) {
    try {
        const data = await registerUser(req.body);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Issue, Check Server Logs');
    };
});

module.exports = router;



