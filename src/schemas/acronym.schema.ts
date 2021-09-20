import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AcronymDocument = Acronym & Document;

@Schema({ collection: 'acronym' })
export class Acronym {
  @Prop({ required: true, type: String })
  key: string;

  @Prop({ required: true, type: String })
  value: string;
}

export const AcronymSchema = SchemaFactory.createForClass(Acronym);
