export default function formatDate(date: Date): string {
  date = new Date(date);

  var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    const time = Math.floor(interval);
    if (time === 1) {
      return "1 year ago";
    } else return time + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    const time = Math.floor(interval);
    if (time === 1) {
      return "1 month ago";
    } else return time + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    const time = Math.floor(interval);
    if (time === 1) {
      return "1 day ago";
    } else return time + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    const time = Math.floor(interval);
    if (time === 1) {
      return "1 hour ago";
    } else return time + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    const time = Math.floor(interval);
    if (time === 1) {
      return "1 minute ago";
    } else return time + " minutes ago";
  }
  if (interval <= 0) {
    return "Just now";
  }
  const time = Math.floor(seconds);
  if (time === 1) {
    return "1 second ago";
  } else return time + " seconds ago";
}
