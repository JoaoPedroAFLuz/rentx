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

  compareInDays(end_date: Date, start_date: Date): number {
    const formattedStartDate = this.convertToUTC(start_date);
    const formattedEndDate = this.convertToUTC(end_date);

    return dayjs(formattedEndDate).diff(formattedStartDate, 'days');
  }
}

export { DayjsDateProvider };
