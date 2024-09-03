const jwt = require('jsonwebtoken');

const SECRET = 'jwt_secret';

const auth = async (req, res, next) => {

    const token = req.cookies?.token;
    if (!token) {
        res.status(401).send('Access denied. Please log in to continue');
        return;
    }
    
    try {
        const decoded = await jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send('Invalid token');
    }
}

module.exports = auth;