import { DateAdapter } from '@/shared/domain/adapters/date.adapter';
import { Injectable } from '@nestjs/common';
import { addDays, addMinutes, isAfter, isBefore } from 'date-fns';

@Injectable()
export class DateFnsDateAdapter implements DateAdapter {
  public now(): Date {
    return new Date();
  }

  public addDays(date: Date, days: number): Date {
    return addDays(date, days);
  }

  public addMinutes(date: Date, minutes: number): Date {
    return addMinutes(date, minutes);
  }

  public isAfter(date: Date, otherDate: Date): boolean {
    return isAfter(date, otherDate);
  }

  public isBefore(date: Date, otherDate: Date): boolean {
    return isBefore(date, otherDate);
  }
}
