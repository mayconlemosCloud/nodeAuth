import { Router,Response,Request  } from "express";
import { UserEntity } from "../database/entities/UserEntity";
import { UserService } from "../services/UserService";

export class UserController{
    public router: Router;
    private userService :UserService;
    constructor() {      
        this.router = Router();
        this.userService = new UserService();
        this.routes();
    }

    public create =async (req:Request,res:Response) => {  
        const user = req.body as UserEntity    
        const respose = await this.userService.create(user)      
        res.send(respose);
    }
     
    public update =async (req:Request,res:Response) => {  
        const user = req.body as UserEntity   
        const id = parseInt(req.params.id) 
        const respose = await this.userService.update(id,user)      
        res.send(respose);
    }

    public remove =async (req:Request,res:Response) => { 
        res.send(await this.userService.remove(parseInt(req.params.id)));
    }

    public get =async (req:Request,res:Response) => {        
        res.send(await this.userService.get());
    }

    public getById =async (req:Request,res:Response) => {        
        res.send(await this.userService.getById(parseInt(req.params.id)));
    }

    public routes(){
        this.router.post('/',this.create)
        this.router.put('/:id',this.update)
        this.router.delete('/:id',this.remove)
        this.router.get('/',this.get)
        this.router.get('/:id',this.getById)
        
    }
}