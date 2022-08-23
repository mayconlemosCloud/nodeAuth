import { Connection,Channel, connect, Message } from "amqplib";

export default class Rabbitmq{
    private conn: Connection;
    private channel: Channel;

    
    constructor(private uri:string) {              
    }

    async startRabbitmq(): Promise<void> {
        this.conn = await connect(this.uri);
        this.channel = await this.conn.createChannel();

    }
    
    async publishInQueue(queue:string,message:string){      
        if(!this.conn){
            await this.startRabbitmq()
        }
        return this.channel.sendToQueue(queue,Buffer.from(message))
    }

    async consumeQueue(queue:string,callback: (message: Message) =>void){
        if(!this.conn){
            await this.startRabbitmq()
        }
        return this.channel.consume(queue,(message:any)=>{
                callback(message)
                this.channel.ack(message)
        })
    }
}