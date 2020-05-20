var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var router = express.Router();

const { 
    getUserByValue,
    registerUser 
} = require('../../dal/auth');

const salt = process.env.SALT;
const privateKey = process.env.PRIVATE_KEY;

router.post('/login', async function (req, res) {
    try {
        const body = req.body;
        const dbUser = await getUserByValue('email', body.email);
        if(dbUser.length === 0){
            res.status(401).send('Login Failed');
            console.log(`${body.email} doesn't exist`);
        } else if (dbUser.length > 1) {
            res.status(500).send('Login Failed');
            console.log(`${body.email} exists more than once`);
        } else {
            console.log('body', body);
            console.log('dbUser', dbUser);
            bcrypt.compare(body.password, dbUser[0].password, function (err, result) {
                if(err) throw err;
                if(!result){
                    res.status(401).send('Login Failed');
                    console.log(`Provided password for ${body.email} doesn't match `);
                } else {
                    jwt.sign({ expires: '2020-06-30', _id: dbUser[0]._id }, 
                        privateKey, 
                        { algorithm: 'HS512' }, 
                        function (err, token) {
                            if(err) throw err;
                            console.log(body.email, token);
                            res.set('authentication', token);
                            res.send();
                        }
                    ); 
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Issue, Check Server Logs');
    };
})

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



