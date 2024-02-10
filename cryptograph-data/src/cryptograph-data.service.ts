import bcrypt from 'bcryptjs';
import { CRYPTOGRAPH_DATA } from './cryptograph-data.enum';
import { Inject } from '@nestjs/common';
import { CryptographDataConfigOptions } from './cryptograph-data.interface';

export class CryptographDataService {
  constructor(
    @Inject(CRYPTOGRAPH_DATA.CRYPTOGRAPH_DATA_CONFIG_OPTIONS)
    private readonly cryptographDataConfigOptions: CryptographDataConfigOptions,
  ) {}

  async encryptData(password: string): Promise<string> {
    return bcrypt.hash(
      password,
      this.cryptographDataConfigOptions.numberOfSalt,
    );
  }

  async compareData(
    dataDecrypted: string,
    dataEncrypted: string,
  ): Promise<boolean> {
    return bcrypt.compare(dataDecrypted, dataEncrypted);
  }
}
