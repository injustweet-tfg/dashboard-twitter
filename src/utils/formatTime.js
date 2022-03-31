import { format, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale'
// ----------------------------------------------------------------------

export function timetoline(date) {
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return `${date.getDate()} ${monthNames[date.getMonth()].substring(0, 3)} ${date.getFullYear() - 2000}`;
}

export function fDate(date) {
  return format(new Date(date), 'dd/MM/yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: es
  });
}

// export function newFormat(date) {
//   const [calendar, time] = date.split(' - ');
//   const [day, month, year] = calendar.split('/');
//   const [hour, minute] = time.split(':');
//   return new Date(20 + year, month - 1, day, hour, minute);
// }



