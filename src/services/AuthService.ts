import { UserEntity } from "../database/entities/UserEntity";
import { AppDataSource } from "../DataSource";
import config from "../config/ConfigToken.json";
import jwt from 'jsonwebtoken'
const repo = AppDataSource.getRepository(UserEntity);  

export class AuthService{

    constructor() {      
    }

    public  index = async () =>{ 
         return await repo.manager.find(UserEntity)     
    }
    public  login = async (user:UserEntity) =>{  
      
      const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
      const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
      
      const response = {
        "status": "Logged in",
        "accessToken": token,
        "refreshToken": refreshToken
      }       
      return response
    }
}