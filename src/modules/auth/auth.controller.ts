import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  private authService = new AuthService();

  public login = async (req: Request, res: Response) => {
    const result = await this.authService.login(req.body);
    return res.json(result);
  };
}
