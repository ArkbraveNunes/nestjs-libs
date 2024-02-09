import { Injectable } from '@nestjs/common';

@Injectable()
export class MaskingDataService {
  maskPhoneNumber(
    phone: string,
    firstDigitsPosition: number = 3,
    lastDigitsPosition: number = -3,
    substringValue: string = '*',
  ): string {
    const firstDigits = phone.slice(0, firstDigitsPosition);
    const lastDigits = phone.slice(lastDigitsPosition, phone.length);

    return firstDigits
      .padEnd(phone.length, substringValue)
      .substring(0, phone.length - lastDigits.length)
      .concat(lastDigits);
  }
}
