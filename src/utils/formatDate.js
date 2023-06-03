export function formatDate(chosenDate) {
  const date = new Date(chosenDate);
  let day = date.getDate();
  let mouth = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);

  if (day < 10) {
    day = '0' + day;
  }
  if (mouth < 10) {
    mouth = '0' + mouth;
  }

  return day + '/' + mouth + '/' + year;
}
