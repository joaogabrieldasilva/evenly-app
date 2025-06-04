export const dateWithoutTimezone = (date: Date) => {
  return new Date(date.valueOf()).toISOString().slice(0, -1);
};
