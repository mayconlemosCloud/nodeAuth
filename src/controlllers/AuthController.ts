import { Router,Response,Request  } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController{

    public router: Router;
    private authService :AuthService;
    constructor() {      
        this.router = Router();
        this.authService = new AuthService();
        this.routes();
    }
  
    public login =async (req:Request,res:Response) => {
        res.json(await this.authService.login(req.body))
    }

    public routes(){     
        this.router.post('/login',this.login)
    }
}