import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
  private userService = new UserService();

  public create = async (req: Request, res: Response) => {
    const result = await this.userService.create(req.body);
    return res.status(201).json(result);
  };

  public list = async (req: Request, res: Response) => {
    const result = await this.userService.list();
    return res.json(result);
  };

  public getById = async (req: Request, res: Response) => {
    const result = await this.userService.getById(Number(req.params.id));
    return res.json(result);
  };

  public update = async (req: Request, res: Response) => {
    const result = await this.userService.update(Number(req.params.id), req.body);
    return res.json(result);
  };

  public remove = async (req: Request, res: Response) => {
    const result = await this.userService.remove(Number(req.params.id));
    return res.json(result);
  };
}
