const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {

    const header = req.headers.authorization;

    if (!header) {
        return res.status(403).json({ message: "Authentication header is not provided" });
    }
    const accessToken = header.split("Bearer ")[1];

    if (!accessToken) {
        return res.status(403).json({ message: "Authentication Tokens are not provided" });
    } else {
        try {
            const validToken = verify(accessToken, process.env.JWT_TOKEN_SECRET_KEY);
            req.user = validToken;
            if (validToken) {
                return next();
            }
        } catch (err) {

            return res.status(403).json({ message: err.name });
        }
    }
}
module.exports = { validateToken };