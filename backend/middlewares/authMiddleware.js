import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid Token" });
    }
};

export const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access Denied" });
    next();
};
