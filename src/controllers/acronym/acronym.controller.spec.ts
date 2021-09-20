import { Test, TestingModule } from '@nestjs/testing';
import { AcronymController } from './acronym.controller';
import { AcronymService } from '../../services/acronym/acronym.service';

describe('AcronymController', () => {
  let acronymController: AcronymController;

  beforeEach(async () => {
    const acronym: TestingModule = await Test.createTestingModule({
      controllers: [AcronymController],
      providers: [AcronymService],
    }).compile();

    acronymController = acronym.get<AcronymController>(AcronymController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(acronymController.getHello()).toBe('Hello World!');
    });
  });
});
