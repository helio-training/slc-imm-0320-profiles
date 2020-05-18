var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
const { registerUser } = require('../../dal/auth');

const salt = process.env.SALT;

router.post('/register', function (req, res) {
    try {
        const saltRounds = +salt;
        const body = req.body;
        const myPlaintextPassword = body.password;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if(err){
                throw err;
            }
            bcrypt.hash(myPlaintextPassword, salt, async function (err, hash) {
                if (err) {
                    throw err;
                }
                body.password = hash;
                const data = await registerUser(req.body);
                res.send(data);
            });
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Issue, Check Server Logs');
    };
});

module.exports = router;



