import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        next('Authorization header missing')
    }

    try {
        const token = authHeader.split(' ')[1]
        const payload = JWT.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId }
        next()
    } catch (error) {
        next('Authorization failed')
    }
}

export default userAuth;
