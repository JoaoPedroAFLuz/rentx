interface IDateProvider {
  dateNow(): Date;

  convertToUTC(date: Date): string;

  compare(end_date: Date, start_date: Date): number;
}
export { IDateProvider };
