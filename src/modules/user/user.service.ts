import { UserEntity } from '../../shared/entities/user.entity';
import { AppDataSource } from '../../config/database';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpError } from '../../middlewares/error.middleware';

export class UserService {
  private repository = AppDataSource.getRepository(UserEntity);

  public async create(data: CreateUserDto) {
    const exists = await this.repository.findOne({
      where: { email: data.email },
    });

    if (exists) {
      throw new HttpError(400, 'Email already in use');
    }

    const user = this.repository.create(data);
    await this.repository.save(user);

    // Omit password from response
    const { password: _, ...result } = user;
    return result;
  }

  public async list() {
    return await this.repository.find({
      select: ['id', 'name', 'email'],
    });
  }

  public async getById(id: number) {
    const user = await this.repository.findOne({
      where: { id },
      select: ['id', 'name', 'email'],
    });

    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    return user;
  }

  public async update(id: number, data: Partial<CreateUserDto>) {
    const user = await this.getById(id);
    this.repository.merge(user as UserEntity, data);
    await this.repository.save(user as UserEntity);
    return user;
  }

  public async remove(id: number) {
    const user = await this.getById(id);
    await this.repository.remove(user as UserEntity);
    return { message: 'User deleted successfully' };
  }
}
