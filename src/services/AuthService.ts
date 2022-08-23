import { UserEntity } from "../database/entities/UserEntity";
import { ComparePassword }  from "../config/Crypt";
import { AppDataSource } from "../DataSource";
import config from "../config/ConfigToken.json";
import jwt from 'jsonwebtoken'
const repo = AppDataSource.getRepository(UserEntity);
  


export class AuthService{

    constructor() {      
    }
  
    public  login = async (user:UserEntity) =>{  
      const userEntity  = (await repo.findOneBy(
        {          
          email:user.email
        }
      ))
      const hash = userEntity?.password ? userEntity?.password : ''
      const isAuth =  await ComparePassword(user.password,hash)    
      if(isAuth){
      const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
      const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
      
      const response = {
        "status": "Logged in",
        "accessToken": token,
        "refreshToken": refreshToken
        
      }       
      return {status:true,response}
      }
      return {status:false,mensage:'Usuário não atenticado'}      
    }
}