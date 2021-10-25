const formatFromISODate = (date) => {
  if (date && date.trim().length === 0) return "";
  return date.split("T")[0];
};

const formatToISODate = (date) => {
  if (date && date.trim().length === 0) return "";

  return new Date(date).toISOString();
};

const toLocaleString = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleString("en-US", options);
};

export { formatFromISODate, formatToISODate, toLocaleString };
