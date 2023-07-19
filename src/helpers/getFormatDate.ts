import moment from 'moment';

export function getFormatDate(date: DatePickerType | string = null, format = 'DD/MM/YYYY'): string {
  return moment(date ? date.toLocaleString() : Date.now()).format(format);
}
