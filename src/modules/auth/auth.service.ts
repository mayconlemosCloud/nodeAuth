import jwt from 'jsonwebtoken';
import { UserEntity } from '../../shared/entities/user.entity';
import { AppDataSource } from '../../config/database';
import { env } from '../../config/env';
import { ComparePassword } from '../../shared/utils/crypt';
import { LoginDto } from './dto/login.dto';
import { HttpError } from '../../middlewares/error.middleware';

export class AuthService {
  private repository = AppDataSource.getRepository(UserEntity);

  public async login(data: LoginDto) {
    const user = await this.repository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new HttpError(401, 'Invalid email or password');
    }

    const isAuth = await ComparePassword(data.password, user.password);

    if (!isAuth) {
      throw new HttpError(401, 'Invalid email or password');
    }

    // Omit password from payload
    const { password: _, ...userPayload } = user;

    const accessToken = jwt.sign(userPayload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(userPayload, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    });

    return {
      status: 'Logged in',
      accessToken,
      refreshToken,
    };
  }
}
