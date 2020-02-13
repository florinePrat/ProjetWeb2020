module.exports = async (req,res,next) => {
    try {
        const jwt = require('jsonwebtoken');
        let bearerToken;
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            console.log('token before verify', bearerHeader);
            jwt.verify(bearerToken, process.env.tokenkey, function (err) {
                if (err) {
                    console.log("Impossible d'accéder à cette page protégée 12");
                    res.sendStatus(403);
                    return false;
                } else {
                    next();
                    return true;
                }
            });
        }
        else
        {
            console.log("Aucun token ");
            res.sendStatus(401);
        }
    } catch(error){
        console.log("try / catch ");
        res.sendStatus(401);
    }
};
