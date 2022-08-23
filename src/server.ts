import express, {Request ,Response} from 'express'
import bodyParser from "body-parser";
import "reflect-metadata"
import { AuthController, } from "./controlllers/AuthController";
import { UserController } from "./controlllers/UserController";
import { RabbitMqController } from "./controlllers/RabbitMqController";
class Server{
   private app: express.Application;
   private authControlller: AuthController;
   private userControlller: UserController;
   private rabbitMqController: RabbitMqController;
   
    constructor() {
        this.app = express();
        this.configuraion();
        this.authControlller = new AuthController();
        this.userControlller = new UserController();
        this.rabbitMqController = new RabbitMqController();
     
        this.routes()        
    }


    public configuraion(){
        this.app.set('port',process.env.PORT || 3000)
        this.app.use(bodyParser.json())
    }

    public async routes(){        
    
        this.app.use('/api/auth',this.authControlller.router)
        this.app.use('/api/user',this.userControlller.router)
        this.app.use('/api/rabbitmq',this.rabbitMqController.router)
        this.app.get('/ping',(req:Request,res:Response)=>{
            res.send('Pong!')
        })
    }

    public start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log(`Server is listening ${this.app.get('port')} port.`)
        })
    }
}

const server = new Server();
server.start();
