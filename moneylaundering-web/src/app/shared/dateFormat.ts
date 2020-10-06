export class DateFormat {
  format(date: Date) {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    if (month > 10) {
      return `${day}/${month}/${year}`;
    }
    else if (day >= 10) {
      return `${day}/0${month}/${year}`;
    }
    return `0${day}/0${month}/${year}`;
  }
}