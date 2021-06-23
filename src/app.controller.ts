import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UpdateWriteOpResult } from 'mongoose';
import { swDocument } from './api.schema';
import { AppService } from './app.service';

@Controller('/api/characters/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData(): Promise<swDocument[] | string> {
    return await this.appService.getCharacters();
  }

  @Get('/:id')
  async getDataById(
    @Param() params: Record<'id', string>,
  ): Promise<swDocument | string> {
    return await this.appService.getCharactersById(params.id);
  }

  @Post('/add')
  async createData(
    @Query() query: Record<string, string | string[]>,
  ): Promise<swDocument | string> {
    try {
      return await this.appService.createCharacter(
        query.character as string,
        query.episodes as string[],
      );
    } catch (e) {
      return (e as Error).message;
    }
  }

  @Put('/update/:id')
  async updateData(
    @Param() params: Record<'id', string>,
    @Query() query: Record<'episodes' | 'character', string | string[]>,
  ): Promise<UpdateWriteOpResult | string> {
    if (query.character || query.episodes) {
      return 'You did not provide any values';
    }
    try {
      return await this.appService.updateCharacter(
        params.id,
        query.character as string,
        query.episodes as string[],
      );
    } catch (e) {
      return (e as Error).message;
    }
  }

  @Delete('/delete/:id')
  async deleteData(
    @Param() params: Record<'id', string>,
  ): Promise<swDocument[] | string> {
    return await this.appService.deleteCharacter(params.id as string);
  }
}
