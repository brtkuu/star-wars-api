import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type swDocument = sw & Document;

@Schema()
export class sw {
  @Prop()
  character: string;

  @Prop()
  episodes: string[];
}

export const swSchema = SchemaFactory.createForClass(sw);
