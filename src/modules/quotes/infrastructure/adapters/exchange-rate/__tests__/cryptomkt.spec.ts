import { InvalidArgumentException } from '@/shared/domain/exceptions/invalid-argument';
import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { CryptoMktExchangeRateAdapterIml } from '../cryptomkt';

describe('CryptoMktExchangeRateAdapterIml', () => {
  let service: CryptoMktExchangeRateAdapterIml;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CryptoMktExchangeRateAdapterIml,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CryptoMktExchangeRateAdapterIml>(
      CryptoMktExchangeRateAdapterIml,
    );
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRate', () => {
    it('should return exchange rate when API call is successful', async () => {
      const mockResponse: any = {
        data: {
          BTC: {
            price: '50000.00',
          },
        },
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));

      const rate = await service.getRate('BTC', 'ARS');

      expect(rate).toBe(50000);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://api.exchange.cryptomkt.com/api/3/public/price/rate',
        {
          params: {
            from: 'BTC',
            to: 'ARS',
          },
        },
      );
    });

    it('should throw InvalidArgumentException when price is not found', async () => {
      const mockResponse: any = {
        data: {
          BTC: {},
        },
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));

      await expect(service.getRate('BTC', 'ARS')).rejects.toThrow(
        new InvalidArgumentException('Sorry, we could not find the rate'),
      );
    });

    it('should throw InvalidArgumentException with API error message on request failure', async () => {
      const errorMessage = 'Invalid currency pair';
      const mockError = {
        response: {
          data: {
            error: {
              message: errorMessage,
            },
          },
        },
      };

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(() => mockError));

      await expect(service.getRate('BTC', 'ARS')).rejects.toThrow(
        new InvalidArgumentException(errorMessage),
      );
    });

    it('should throw InvalidArgumentException with default message when API error has no message', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(() => ({})));

      await expect(service.getRate('BTC', 'ARS')).rejects.toThrow(
        new InvalidArgumentException('Sorry, we could not find the rate'),
      );
    });
  });
});
