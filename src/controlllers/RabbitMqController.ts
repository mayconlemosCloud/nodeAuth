import { Router,Response,Request  } from "express";
import Rabbitmq from "../config/Rabbitmq";


export class RabbitMqController{
    public router: Router;    
    private serverRabbitmq: Rabbitmq;
    constructor() {      
        this.router = Router();     
        this.serverRabbitmq = new Rabbitmq('amqp://guest:guest@18.231.181.145:5672');
        this.routes();
    }    


    public publish = async(req:Request,res:Response)=>{
        await this.serverRabbitmq.startRabbitmq()
        await this.serverRabbitmq.publishInQueue(req.params.queue,JSON.stringify(req.body))
        res.send({status:true,message:req.body})
    }

    public consume = async(req:Request,res:Response)=>{  
       let msg
       await this.serverRabbitmq.startRabbitmq()      
        await this.serverRabbitmq.consumeQueue(req.params.queue,(message)=>{
            msg = message.content.toString()
        })
        res.send(msg)     
    }

    public routes(){    
        this.router.post('/publish/:queue',this.publish)   
        this.router.post('/consume/:queue',this.consume)   
    }
}