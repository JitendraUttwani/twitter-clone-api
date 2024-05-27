const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        console.log(req)
        console.log(req.params.id);
        console.log(authHeader);
        const token = authHeader && authHeader.split(' ')[1];
        console.log(token);
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized',
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Authentication failed',
                });
            }
            req.userId = user.userId;
            next();
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        })
    }
  
}

module.exports = {
    authenticateToken,
}