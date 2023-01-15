import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';

export const verifyJWT = (req: Request, res: Response, next: NextFunction): Response | void => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const jwtToken = token.split('Bearer ')[1];
        const decoded = jwt.verify(jwtToken, config.JWT_TOKEN_KEY);
        const { user, password } = decoded as { user: string; password: string };
        if (user !== config.JWT_TOKEN_USER || password !== config.JWT_TOKEN_PASS) {
            return res.status(401).send('Invalid credentials');
        }
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }

    return next();
};
