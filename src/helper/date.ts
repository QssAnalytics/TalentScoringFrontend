import { MonthNames } from "../types";

const currentDate = new Date();

export const getDayForMonthly = (
  selectedYear: number,
  selectedMonth: number
) => {
  // Get the number of days in the selected month
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  const days = [];

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return days;
};

export const getAllMonths = (): MonthNames[] => [
  { 1: "Yanvar" },
  { 2: "Fevral" },
  { 3: "Mart" },
  { 4: "Aprel" },
  { 5: "May" },
  { 6: "İyun" },
  { 7: "İyul" },
  { 8: "Avqust" },
  { 9: "Sentyabr" },
  { 10: "Oktyabr" },
  { 11: "Noyabr" },
  { 12: "Dekabr" },
];

export const getFromTodayYear = (from = 1900) => {
  const years = [];
  for (let i = from; i <= currentDate.getFullYear(); i++) {
    years.push(i);
  }
  return years;
};

// Get today's date object

export const getAge = (birthdate: Date) => {
  // A bool that represents if currentDate's day/month precedes the birth day/month
  const one_or_zero =
    currentDate.getMonth() < birthdate.getMonth() ||
    (currentDate.getMonth() === birthdate.getMonth() &&
      currentDate.getDate() < birthdate.getDate());

  // Calculate the difference in years from the date object's components
  const year_difference = currentDate.getFullYear() - birthdate.getFullYear();

  // The difference in years is not enough.
  // To get it right, subtract 1 or 0 based on if currentDate precedes the
  // birthdate's month/day.
  // To do this, subtract the 'one_or_zero' boolean from 'year_difference'
  // (This converts true to 1 and false to 0 under the hood.)
  const age = year_difference - (one_or_zero ? 1 : 0);

  return age;
};
