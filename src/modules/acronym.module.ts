import { AcronymService } from './../services/acronym/acronym.service';
import { AcronymController } from './../controllers/acronym/acronym.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Acronym, AcronymSchema } from 'src/schemas/acronym.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Acronym.name, schema: AcronymSchema }]),
  ],
  controllers: [AcronymController],
  providers: [AcronymService],
})
export class AcronymsModule { }
