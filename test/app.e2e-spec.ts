import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';
import { INestApplication } from '@nestjs/common';

describe('StarWarsAPI', () => {
  let app: INestApplication;
  let appService: AppService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useValue(appService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET allcharacters`, () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect({
        data: appService.getCharacters(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
