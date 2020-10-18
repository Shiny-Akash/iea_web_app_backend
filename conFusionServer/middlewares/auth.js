const jwt = require('jsonwebtoken')

const authorise = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, 'mysecret', (err, payload) => {
        
        if (err) {
            return res.status(403).send(err.message);
        }

        if (payload.username != req.params.id ){
            return res.status(403).send('Not logged In !');
        }

        req.username = payload.username;
        next();
    })
}

module.exports = authorise;