import { Injectable } from '@nestjs/common';
import { swDocument } from './api.schema';
import { SWApi } from './app.api';

@Injectable()
export class AppService {
  constructor(private readonly swApi: SWApi) {}

  async getCharacters(): Promise<swDocument[] | string> {
    try {
      return await this.swApi.getCharacters();
    } catch (e) {
      return (e as Error).message;
    }
  }

  async getCharactersById(id: string): Promise<swDocument | string> {
    try {
      return await this.swApi.getCharactersById(id);
    } catch (e) {
      return (e as Error).message;
    }
  }

  async createCharacter(
    character: string,
    episodes: string[],
  ): Promise<swDocument> {
    return await this.swApi.createCharacter(character, episodes);
  }

  async deleteCharacter(id: string): Promise<swDocument[] | string> {
    return await this.swApi.deleteCharacter(id);
  }

  async updateCharacter(id: string, character?: string, episodes?: string[]) {
    return await this.swApi.updateCharacter(id, character, episodes);
  }
}
