import { AppController } from './../controllers/app/app.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AcronymsModule } from './acronym.module';
import { resolve } from 'path';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';

if (!process.env.NODE_ENV) {
  throw new Error('Missing NODE_ENV value');
}

dotenv.config({ path: resolve(`./config/${process.env.NODE_ENV}.env`) });

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}`,
    ),
    AcronymsModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
