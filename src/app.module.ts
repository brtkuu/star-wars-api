import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { sw, swSchema } from './api.schema';
import { SWApi } from './app.api';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/star-wars-api'),
    MongooseModule.forFeature([{ name: sw.name, schema: swSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, SWApi],
})
export class AppModule {}
