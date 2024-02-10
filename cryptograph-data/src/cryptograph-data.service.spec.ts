import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { CryptographDataService } from './cryptograph-data.service';
import { InternalServerErrorException } from '@nestjs/common';
import { CryptographDataConfigOptions } from './cryptograph-data.interface';

jest.mock('bcryptjs', () => ({
  async hash(): Promise<string> {
    return 'hashed-password';
  },
  async compare(): Promise<boolean> {
    return true;
  },
}));

describe('CryptographDataService', () => {
  let adapter: CryptographDataService;
  let mockedPassword: string;

  const bcryptError: InternalServerErrorException =
    new InternalServerErrorException();

  const cryptographDataConfigOptions: CryptographDataConfigOptions = {
    numberOfSalt: 12,
  };

  beforeAll(() => {
    mockedPassword = faker.internet.password();
  });

  beforeEach(() => {
    adapter = new CryptographDataService(cryptographDataConfigOptions);
  });

  describe('CryptographDataService', () => {
    it('success - should call encryptData', async () => {
      const hashSpy = jest.spyOn(bcrypt, 'hash');
      await adapter.encryptData(mockedPassword);

      expect(hashSpy).toHaveBeenCalledWith(
        mockedPassword,
        cryptographDataConfigOptions.numberOfSalt,
      );
    });

    it('error - should call encryptData', async () => {
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        throw bcryptError;
      });

      await adapter
        .encryptData(mockedPassword)
        .catch((actualError) => {
          expect(actualError).toBeInstanceOf(InternalServerErrorException);
        })
        .then((result) => expect(result).toBe(undefined));
    });

    it('success - should call compareData and return true', async () => {
      const hashSpy = jest.spyOn(bcrypt, 'compare');
      const result = await adapter.compareData(mockedPassword, mockedPassword);

      expect(hashSpy).toHaveBeenCalledWith(mockedPassword, mockedPassword);
      expect(result).toBe(true);
    });

    it('success - should call compareData and return false', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        return false;
      });

      const hashSpy = jest.spyOn(bcrypt, 'compare');
      const result = await adapter.compareData(mockedPassword, mockedPassword);

      expect(hashSpy).toHaveBeenCalledWith(mockedPassword, mockedPassword);
      expect(result).toBe(false);
    });

    it('error - should call encryptData', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw bcryptError;
      });

      await adapter
        .compareData(mockedPassword, mockedPassword)
        .catch((actualError) => {
          expect(actualError).toBeInstanceOf(InternalServerErrorException);
        })
        .then((result) => expect(result).toBe(undefined));
    });
  });
});
