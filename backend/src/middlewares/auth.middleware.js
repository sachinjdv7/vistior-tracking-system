import jwt from "jsonwebtoken"

const isUserLoggedIn = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized request' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ message: "Unauthorized: Invalid token" });
    }
}

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
}

export { isUserLoggedIn, isAdmin };