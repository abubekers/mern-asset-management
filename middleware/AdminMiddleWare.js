const { verify } = require("jsonwebtoken");
const { ADMIN_ROLES,BUSSINES_ROLES } = require("../config/utils");


const validateAdminUserRole = (req, res, next) => {

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
                if(ADMIN_ROLES.includes(validToken.user_type)){
                    return next();
                }else{
                    return res.status(403).status(403).json({message: "You are not Authorized for this task!"})
                }
            }
        } catch (err) {

            return res.status(403).json({ message: err.name });
        }
    }
}

const validateSuperAdmin = (req, res, next) => {

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
                if (validToken.user_type == "SUPERADMIN") {
                    return next();
                } else {
                    return res.status(403).json({ message: "You are not Authorized for this task!" })
                }
            }
        } catch (err) {

            return res.status(403).json({ message: err.name });
        }
    }
}


const validateBusinesRole = (req, res, next) => {

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
                if(BUSSINES_ROLES.includes(validToken.user_type)){
                    return next();
                }else{
                    return res.status(403).status(403).json({message: "You are not Authorized for this task!"})
                }
            }
        } catch (err) {

            return res.status(403).json({ message: err.name });
        }
    }
};

module.exports = { validateAdminUserRole,validateSuperAdmin};