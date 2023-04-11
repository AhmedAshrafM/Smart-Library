import { Test, TestingModule } from '@nestjs/testing';
import { AiClientAppService } from './ai-client-app.service';

describe('AiClientAppService', () => {
  let service: AiClientAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiClientAppService],
    }).compile();

    service = module.get<AiClientAppService>(AiClientAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
