import { User } from '../../schemas/user.schema';
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/user')
  createUser(@Body() body: User): Promise<any> {
    return this.userService.createUser(body);
  }
}
