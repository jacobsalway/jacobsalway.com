export const formatDate = (date: Date, fullMonth = false): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month = fullMonth
    ? months[date.getMonth()]
    : months[date.getMonth()].slice(0, 3);
  const year = date.getFullYear().toString();

  return `${day} ${month} ${year}`;
};
