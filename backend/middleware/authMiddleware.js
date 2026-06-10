import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({
                message: 'No token provided',
            })
        }

        // remove Bearer 
        const token = authHeader.split(' ')[1]

        // verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        // attach user data
        req.user = user

        next()

    } catch (error) {
        res.status(401).json({
            message: 'Invalid token',
        })
    }
};

export default authMiddleware