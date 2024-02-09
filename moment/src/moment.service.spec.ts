import { MomentService } from './moment.service';
import moment from 'moment';
import { faker } from '@faker-js/faker';
import { MOMENT_TIMES } from './moment.enum';

describe('MomentService', () => {
  let service: MomentService;

  beforeEach(() => {
    service = new MomentService();
  });

  it('should add Time in the date and return string', async () => {
    const result = service.addTime(new Date(), MOMENT_TIMES.HOUR, 1);

    expect(typeof result === 'string').toBe(true);
    expect(moment(result).isValid()).toBe(true);
  });

  it('should subtract Time in the date and return string', async () => {
    const result = service.subtractTime(new Date(), MOMENT_TIMES.HOUR, 1);

    expect(typeof result === 'string').toBe(true);
    expect(moment(result).isValid()).toBe(true);
  });

  it('should validate date and return true', async () => {
    const result = await service.isValidDate(new Date());

    expect(result).toBe(true);
  });

  it('should validate date and return false', async () => {
    const result = await service.isValidDate(faker.color.rgb());

    expect(result).toBe(false);
  });

  it('should set date in the first hour', async () => {
    const result = service.setFirstHour(new Date());

    expect(typeof result === 'string').toBe(true);
    expect(moment(result).isValid()).toBe(true);
  });

  it('should set date in the last hour', async () => {
    const result = service.setLastHour(new Date());

    expect(typeof result === 'string').toBe(true);
    expect(moment(result).isValid()).toBe(true);
  });

  it('should compare date one and two and see if the first date is before the second', async () => {
    const result = service.isBeforeDate(
      new Date(),
      new Date(new Date().setDate(new Date().getDate() + 1)),
    );

    expect(typeof result === 'boolean').toBe(true);
    expect(result).toBe(true);
  });

  it('should compare date one and two and see if the first date is after the second', async () => {
    const result = service.isAfterDate(
      new Date(new Date().setDate(new Date().getDate() + 1)),
      new Date(),
    );

    expect(typeof result === 'boolean').toBe(true);
    expect(result).toBe(true);
  });

  it('should format date', async () => {
    const result = service.formatDate(new Date().toISOString());

    expect(typeof result === 'string').toBe(true);
    expect(moment(result).isValid()).toBe(true);
  });
});
