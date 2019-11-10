const express = require('express');
const jwt = require('jsonwebtoken');
const app = new express(); 
const secretKey = "login";
const payload =  {
    Title: 'Payload for JWT'
}
app.post('/api/login', verifyToken, (req, res) => {
    res.send("Success");
});

app.get('/api/token', (req, res) => {

    //Sign the payload without Async:
    //var token = jwt.sign(user, 'login');

    //Sign the payload with Async call 
    jwt.sign({payload}, secretKey, (err, token) => {
        res.json({
            Token: token
        });
    });
});

function verifyToken(req, res, next){

    const requestAuthHeader = req.headers['authorization']; 

    if(typeof requestAuthHeader !== 'undefined'){
       const requestAuthHeaderSplit = requestAuthHeader.split(" ");
       const bearer = requestAuthHeaderSplit[1]; 
       try {
        var payload = jwt.verify(bearer, secretKey) 
        next()
       } catch (error) {
        res.sendStatus(403);           
       }

    } else{
        res.sendStatus(403);
    }
}

app.listen(3000, () => console.log('Server started'));  