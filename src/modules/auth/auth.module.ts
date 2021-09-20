import { UserService } from './../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { Module } from '@nestjs/common';
// import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../user.module';
import { JwtStrategy } from './jwt.strategy';
import { resolve } from 'path';
import * as dotenv from 'dotenv';

if (!process.env.NODE_ENV) {
  throw new Error('Missing NODE_ENV value');
}

dotenv.config({ path: resolve(`./config/${process.env.NODE_ENV}.env`) });
console.log('process.env.JW_CONSTANT,', process.env.JW_CONSTANT,)
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JW_CONSTANT,

    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }