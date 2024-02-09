import moment from 'moment';
import { Injectable } from '@nestjs/common';

import { MOMENT_DATE_FORMAT, MOMENT_TIMES } from './moment.enum';

@Injectable()
export class MomentService {
  addTime(date: any, type: MOMENT_TIMES, value: number): string {
    return moment(date).add(value, type).toISOString();
  }

  subtractTime(date: any, type: MOMENT_TIMES, value: number): string {
    return moment(date).subtract(value, type).toISOString();
  }

  isValidDate(date: any, format: string = 'YYYY-MM-DD'): boolean {
    return moment(date, format, true).isValid();
  }

  setFirstHour(dateParameter: any): string {
    const date = moment(dateParameter);
    date.set(MOMENT_TIMES.MILLISECOND, 0);
    date.set(MOMENT_TIMES.SECOND, 0);
    date.set(MOMENT_TIMES.MINUTE, 0);
    date.set(MOMENT_TIMES.HOUR, 0);
    return date.toISOString();
  }

  setLastHour(dateParameter: any): string {
    const date = moment(dateParameter);
    date.set(MOMENT_TIMES.MILLISECOND, 59);
    date.set(MOMENT_TIMES.SECOND, 59);
    date.set(MOMENT_TIMES.MINUTE, 59);
    date.set(MOMENT_TIMES.HOUR, 23);
    return date.toISOString();
  }

  isAfterDate(dateOne: Date | string, dateTwo: Date | string): boolean {
    const [dateOneMoment, dateTwoMoment] = [moment(dateOne), moment(dateTwo)];
    return dateOneMoment.isAfter(dateTwoMoment);
  }

  isBeforeDate(dateOne: Date | string, dateTwo: Date | string): boolean {
    const [dateOneMoment, dateTwoMoment] = [moment(dateOne), moment(dateTwo)];
    return dateOneMoment.isBefore(dateTwoMoment);
  }

  formatDate(
    date: string,
    format: MOMENT_DATE_FORMAT = MOMENT_DATE_FORMAT.DATE,
  ): string {
    return moment(new Date(date)).format(format).toString();
  }
}
