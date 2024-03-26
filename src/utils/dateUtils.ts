export const dateFormat = (date: Date): string => {
  return date.toISOString().substring(0, 10).split("-").reverse().join("/");
};

export const strToDate = (str: string): Date => {
  const [day, month, year] = str.split("/");
  return new Date(`${year}-${month}-${day}T00:00:00.000Z`);
};
