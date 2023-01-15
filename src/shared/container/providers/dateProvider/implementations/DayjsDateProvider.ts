import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const formattedStartDate = this.convertToUTC(start_date);
    const formattedEndDate = this.convertToUTC(end_date);

    return dayjs(formattedEndDate).diff(formattedStartDate, 'hours');
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const formattedStartDate = this.convertToUTC(start_date);
    const formattedEndDate = this.convertToUTC(end_date);

    return dayjs(formattedEndDate).diff(formattedStartDate, 'days');
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate();
  }
}

export { DayjsDateProvider };
