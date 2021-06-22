import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { sw, swDocument } from './api.schema';

@Injectable()
export class SWApi {
  constructor(@InjectModel(sw.name) private swModel: Model<swDocument>) {}

  async getCharacters(): Promise<swDocument[]> {
    return await this.swModel.find();
  }

  async getCharactersById(id: string): Promise<swDocument> {
    return await this.swModel.findById(id);
  }

  async createCharacter(
    character: string,
    episodes: string[],
  ): Promise<swDocument> {
    const existingItem = await this.swModel.find({ character: character });
    if (existingItem.length) {
      throw Error('Item exists');
    }
    return await this.swModel.create({
      character: character,
      episodes: episodes,
    });
  }

  async deleteCharacter(id: string): Promise<swDocument[] | string> {
    try {
      await this.swModel.deleteMany({ _id: id });
      return this.swModel.find();
    } catch (e) {
      return (e as Error).message;
    }
  }

  async updateCharacter(
    id: string,
    character?: string,
    episodes?: string[],
  ): Promise<UpdateWriteOpResult> {
    const object = await this.swModel.findById(id);

    const updated = {
      character: character ? character : object.character,
      episodes: episodes ? episodes : object.episodes,
    };
    return await this.swModel.updateOne({ _id: id }, updated);
  }
}
