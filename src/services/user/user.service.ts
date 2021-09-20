import { User, UserDocument } from './../../schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  createUser(user: User): Promise<any> {
    return this.userModel.create(user);
  }

  async findUser(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    return user;
  }
}
