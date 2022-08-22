import { Repository } from "typeorm";
import { UserEntity } from "../database/entities/UserEntity";
import { AppDataSource } from "../DataSource";

const repo = AppDataSource.getRepository(UserEntity);  

export class UserService {

    constructor() {      
    }

    public create = async (user:UserEntity) =>{ 
         return await repo.save(user)
    } 
    
    public update = async (id:number,user:UserEntity) =>{ 
         const respose:any = await repo.findBy({id})         
         return respose?.affected == 1 ? await repo.update(id,user) : []
    } 


    public remove = async (id:number) =>{          
          const respose = await repo.findBy({id})
          return await repo.remove(respose)
    }

     public get = async () =>{ 
         return await repo.find()
    }

     public getById = async (id:number) =>{ 
         return await repo.findBy({id})
    }

}