import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; 

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token." });
        }
        req.user = user;
        console.log("Request user", req.user);
        next(); 
    });
};

export default authenticateToken
