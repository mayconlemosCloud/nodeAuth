import { Router,Response,Request  } from "express";
import { AuthService } from "../services/AuthService";
import {checkAuthToken} from "../config/CheckToken";

export class AuthController{

    public router: Router;
    private authService :AuthService;
    constructor() {      
        this.router = Router();
        this.authService = new AuthService();
        this.routes();
    }

    public index =async (req:Request,res:Response) => {              
        res.send(await this.authService.index());
    }
    public login =async (req:Request,res:Response) => {
        res.json(await this.authService.login(req.body))
    }

    public routes(){
        this.router.get('/',[checkAuthToken],this.index)
        this.router.post('/login',this.login)
    }
}