const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secret = "secretkey";

app.get('/', (req, resp) => {
    resp.json({
        message: "a sample api"
    })
});

app.post("/login", (req, resp) => {
    const user = {
        id: 1,
        username: "jaimin",
        email: "abc@gmail.com"
    }

    jwt.sign({ user }, secret, { expiresIn: '300s' }, (err, token) => {
        resp.json({
            token
        })
    })
})


app.post('/profile', verifyToken, (req, resp) => {
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            resp.status(401).send({ result: "invalid token" });
        }
        else {
            resp.json({ message: "profile verified ..!", authData })
        }
    })
})


function verifyToken(req, resp, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }
    else {
        resp.status(403).send({ result: "Token is not valid.!" })
    }
}

app.listen(5000, () => {
    console.log("app is running on 5000 port");
})