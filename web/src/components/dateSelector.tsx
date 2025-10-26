import { useState, useEffect } from 'react';
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from './ui/button';

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]; 

type TimestampSelection = {
  day: number;
  month: number;
  year: number;
  hours: number;
  minutes: number;
};

const generateDateSelectValues = (currentDate: TimestampSelection, minTimestamp: Date | null, maxTimestamp: Date | null): number[] => {
  const naturalMaxDay = new Date(currentDate.year, currentDate.month, 0).getDate();

  let minDay = 1;
  let maxDay = naturalMaxDay;

  const isAtMinDateMonth = minTimestamp && 
    currentDate.year === minTimestamp.getFullYear() && 
    currentDate.month === minTimestamp.getMonth() + 1;

  const isAtMaxDateMonth = maxTimestamp &&
    currentDate.year === maxTimestamp.getFullYear() &&
    currentDate.month === maxTimestamp.getMonth() + 1;

  if (isAtMinDateMonth) minDay = minTimestamp!.getDate();

  if (isAtMaxDateMonth) maxDay = Math.min(maxDay, maxTimestamp!.getDate());

  const validDays: number[] = [];
  for (let day = minDay; day <= maxDay; day++) {
    validDays.push(day);
  }

  return validDays;
}

interface DateSelectorProps {
  minTimestamp?: Date | null;
  maxTimestamp?: Date | null;
  selectTime?: boolean;
  disabled?: boolean;
  blankValues?: boolean;
  selectionChange: (date: Date) => void;
}

const DateSelector = ({ selectionChange, minTimestamp = null, maxTimestamp = null, selectTime, blankValues = false, disabled = false }: DateSelectorProps) => {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState<TimestampSelection>({
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
    hours: today.getHours(),
    minutes: today.getMinutes(),
  });

  const currentYear = today.getFullYear();
  const startYear = minTimestamp ? minTimestamp.getFullYear() : currentYear - 100;
  const endYear = maxTimestamp ? maxTimestamp.getFullYear() : currentYear + 100;
  const yearRange = endYear - startYear + 1;

  const selectDate = () => {
    const { year, month, day, hours, minutes } = selectedDate;

    const dateObject = new Date(year, month - 1, day, hours, minutes);

    selectionChange(dateObject);
  };

  const updateDatePart = (key: keyof TimestampSelection, value: string) => {
    setSelectedDate((prev) => ({ ...prev, [key]: parseInt(value) }));
  };

  const maxDaysInMonth = new Date(selectedDate.year, selectedDate.month, 0).getDate();

  useEffect(() => {
    if (selectedDate.day > maxDaysInMonth) {
      setSelectedDate(prev => ({ ...prev, day: maxDaysInMonth }));
    }
  }, [maxDaysInMonth, selectedDate.day]);


  return (
    <FieldSet className='gap-1'>
      <FieldGroup>
        <div className="grid grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="day-selector">Day</FieldLabel>
            <Select
              disabled={disabled}
              defaultValue={blankValues ? undefined : `${selectedDate.day}`}
              onValueChange={(value) => updateDatePart('day', value)}
            >
              <SelectTrigger id="day-selector">
                <SelectValue placeholder="DD" />
              </SelectTrigger>
              <SelectContent className='max-h-[35vh]'>
                <SelectGroup>
                <SelectLabel>Select the day</SelectLabel>
                  {generateDateSelectValues(selectedDate, minTimestamp, maxTimestamp).map((dayValue) => {
                    const formattedDay = `${dayValue}`.padStart(2, '0');

                    return (
                      <SelectItem
                        value={`${dayValue}`}
                        key={dayValue}
                      >
                        {formattedDay}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="month-selector">Month</FieldLabel>
            <Select
              disabled={disabled}
              defaultValue={blankValues ? undefined : `${selectedDate.month}`}
              onValueChange={(value) => updateDatePart('month', value)}
            >
              <SelectTrigger id="month-selector">
                <SelectValue placeholder="MM" />
              </SelectTrigger>
              <SelectContent className='max-h-[35vh]'>
                <SelectGroup>
                  <SelectLabel>Select the month</SelectLabel>
                  {Array.from({ length: 12 }, (_, i) => {
                    const monthValue = i + 1;
                    const monthLabel = MONTH_NAMES[i];

                    if (minTimestamp && currentYear === minTimestamp.getFullYear() && today.getMonth() < minTimestamp.getMonth()) return null;
                    if (maxTimestamp && currentYear === maxTimestamp.getFullYear() && today.getMonth() > maxTimestamp.getMonth()) return null;

                    return (
                      <SelectItem
                        value={`${monthValue}`}
                        key={monthValue}
                      >
                        {monthLabel}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="year-selector">Year</FieldLabel>
            <Select
              disabled={disabled}
              defaultValue={blankValues ? undefined : `${selectedDate.year}`}
              onValueChange={(value) => updateDatePart('year', value)}
            >
              <SelectTrigger id="year-selector">
                <SelectValue placeholder="YYYY" />
              </SelectTrigger>
              <SelectContent className='max-h-[35vh]'>
                <SelectGroup>
                  <SelectLabel>Select the year</SelectLabel>
                  {Array.from({ length: yearRange }, (_, i) => {
                    const year = startYear + i;

                    if (minTimestamp && currentYear < minTimestamp.getFullYear()) return null;
                    if (maxTimestamp && currentYear > maxTimestamp.getFullYear()) return null;

                    return (
                      <SelectItem
                        value={`${year}`}
                        key={year}
                      >
                        {year}
                      </SelectItem>
                    );
                  })}
                  </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </FieldGroup>
      {selectTime && (
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field>
              <FieldLabel htmlFor="hour-selector">Hour</FieldLabel>
              <Select
                disabled={disabled}
                defaultValue={blankValues ? undefined : `${selectedDate.hours}`}
                onValueChange={(value) => updateDatePart('hours', value)}
              >
                <SelectTrigger id="hour-selector">
                  <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent className='max-h-[35vh]'>
                  {Array.from({ length: 24 }, (_, i) => {
                    const formattedHour = `${i}`.padStart(2, '0');
                    return <SelectItem value={`${i}`} key={i}>{formattedHour}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="minute-selector">Minute</FieldLabel>
              <Select
                disabled={disabled}
                defaultValue={blankValues ? undefined : `${selectedDate.minutes}`}
                onValueChange={(value) => updateDatePart('minutes', value)}
              >
                <SelectTrigger id="minute-selector">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent className='max-h-[35vh]'>
                  {Array.from({ length: 6 }, (_, i) => {
                    const formattedMinute = `${i * 10}`.padStart(2, '0');
                    return <SelectItem value={`${i * 10}`} key={i}>{formattedMinute}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </FieldGroup>
      )}

      <div className='flex justify-center mt-2'>
        <Button variant='outline' onClick={selectDate} disabled={disabled}>Confirm</Button>
      </div>
    </FieldSet>
  );
}

export default DateSelector;
