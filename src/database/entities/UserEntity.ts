import { BeforeInsert, BeforeUpdate, Column,Entity,PrimaryGeneratedColumn } from "typeorm";
import { GeneratePassword }  from "../../config/Crypt";

@Entity('User')
export class UserEntity{       
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ unique: true })
    email:string

    @Column()
    password:string

    @BeforeInsert()  
    @BeforeUpdate()
    async setPassword(password:string) {            
        this.password = await GeneratePassword(password || this.password);
    }

 }