import { Test, TestingModule } from '@nestjs/testing';
import { BookStocksService } from './book-stocks.service';

describe('BookStocksService', () => {
  let service: BookStocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookStocksService],
    }).compile();

    service = module.get<BookStocksService>(BookStocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
