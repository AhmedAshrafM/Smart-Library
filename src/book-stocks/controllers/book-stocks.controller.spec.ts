import { Test, TestingModule } from '@nestjs/testing';
import { BookStocksController } from './book-stocks.controller';

describe('BookStocksController', () => {
  let controller: BookStocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookStocksController],
    }).compile();

    controller = module.get<BookStocksController>(BookStocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
