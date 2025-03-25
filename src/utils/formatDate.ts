export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  if (dateString.length > 0) {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  } else {
    return "";
  }
}
