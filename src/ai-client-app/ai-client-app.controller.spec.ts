import { Test, TestingModule } from '@nestjs/testing';
import { AiClientAppController } from './ai-client-app.controller';

describe('AiClientAppController', () => {
  let controller: AiClientAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiClientAppController],
    }).compile();

    controller = module.get<AiClientAppController>(AiClientAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
