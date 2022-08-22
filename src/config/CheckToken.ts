import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/ConfigToken.json";

export const checkAuthToken = function(req: Request, res: Response, next: NextFunction) {
		const token = <string>req.headers.authorization;	
		let jwtPayload;
		try {
			// check if access token is valid
			jwtPayload = <any>jwt.verify(token, config.secret);			
			
		} catch (error) {
			res.status(401).send();
			return;
		}finally{
			console.log(`check`)
		}
		next();
	
};