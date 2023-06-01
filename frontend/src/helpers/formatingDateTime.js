export const formatingTime24Clock = (string) => {
  const date = new Date(string);
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  let seconds = date.getUTCSeconds();
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${hours}:${minutes}:${seconds}`;
};

export const formatingDate = (string, type) => {
  const date = new Date(string);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate();
  switch (type) {
    case 'm/d/y':
      return `${month}/${day}/${year}`;
    case 'd/m/y':
      return `${day}/${month}/${year}`;
    case 'y/m/d':
      return `${year}/${month}/${day}`;
    default:
      return `${day}/${month}/${year}`;
  }
};
