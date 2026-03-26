import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { HashPassword } from '../utils/crypt';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await HashPassword(this.password);
    }
  }
}
