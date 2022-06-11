import * as dateFns from 'date-fns'

export function now(): Date {
  return toLocalDate(new Date())
}

export function workingDays(startDate: Date, finishDate: Date) {
  let date = startDate
  const workingDays: Date[] = []
  while (date < finishDate) {
    if (isWorkingDay(date)) {
      workingDays.push(date)
    }
    date = addDays(date, 1)
  }

  return workingDays
}

export function isWorkingDay(date: Date): boolean {
  const weekDay = dateFns.getDay(date)
  return weekDay != 0 && weekDay != 6
}

export function nextWorkingDay(date: Date): Date {
  while (!isWorkingDay(date)) {
    date = addDays(date, 1)
  }

  return setHours(date, 9)
}

export function addMonths(date: Date, months: number): Date {
  return dateFns.addMonths(date, months)
}

export function addDays(date: Date, days: number): Date {
  return dateFns.addDays(date, days)
}

export function addHours(date: Date, hours: number): Date {
  return dateFns.addHours(date, hours)
}

export function setHours(date: Date, hours: number): Date {
  date = setMinutes(date)
  return dateFns.setHours(date, hours)
}

export function setMinutes(date: Date, minutes = 0): Date {
  date = dateFns.setSeconds(date, 0)
  return dateFns.setMinutes(date, minutes)
}

export function startOfDay(date: Date): Date {
  return dateFns.startOfDay(parseDate(date))
}

export function endOfDay(date: Date): Date {
  return dateFns.endOfDay(parseDate(date))
}

export function startOfMonth(date: Date): Date {
  return dateFns.startOfDay(parseDate(date))
}

export function endOfMonth(date: Date): Date {
  return dateFns.endOfMonth(parseDate(date))
}

export function toLocalDate(date: Date) {
  return date
}

export function parseDate(date: Date | number): Date {
  return new Date(date)
}

export function toDate(str: string): Date {
  if (!str || str.length < 10) return null
  const strDate = str.substring(0, 10)
  return new Date(strDate + 'T00:00:00')
}

export function toStringDtHr(date: Date): string {
  const day = adicionaZero(date.getDate())
  const month = adicionaZero(date.getMonth() + 1)
  const year = adicionaZero(date.getFullYear())
  const hours = adicionaZero(date.getHours())
  const minutes = adicionaZero(date.getMinutes())
  return `${day}/${month}/${year} ${hours}:${minutes}`
}

function adicionaZero(numero) {
  if (numero <= 9) return '0' + numero
  else return numero
}

export function format(date: Date, formatDate: string) {
  return dateFns.format(date, formatDate)
}
