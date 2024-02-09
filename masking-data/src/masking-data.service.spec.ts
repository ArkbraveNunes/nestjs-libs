import { MaskingDataService } from './masking-data.service';
import { faker } from '@faker-js/faker';

describe('MaskingDataService', () => {
  let service: MaskingDataService;

  beforeEach(() => {
    service = new MaskingDataService();
  });

  it('should call MaskingDataService - masking phone number', async () => {
    const result = await service.maskPhoneNumber(faker.phone.number());

    expect(typeof result === 'string').toBe(true);
  });
});
