const jwt = require('jsonwebtoken')

const IsAdmin = (req, res, next) => {
    try {

        // console.log("welcome to middleware");
        let token = req.get("Authorization")

        if (!token) {
            res.status(400).send({ message: "you are not allowed" })
        } else {
            let decordedToken = jwt.verify(token, "SECRET") //2eme parametre houwa cle mt3 cryptage

            if (!decordedToken) {
                res.status(400).send({ message: "you are not allowed" })

            } else {

                if (decordedToken.role == "admin") {
                    next()
                }
                else {
                    res.status(400).send({ message: "you are not allowed" })
                }

            }

        }

        //console.log(token)
        //res.status(400).send ({message:"you are not allowed"}) kn manèotch next() w n7ot hedhy taffichili welcome to middleware
        //next()
    }
    catch (error) {
        res.status(400).send({ message: "you are not correct" ,error})
    }
}

module.exports = IsAdmin