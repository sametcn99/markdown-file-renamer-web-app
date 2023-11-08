export default function getDateTime() {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1; // In JavaScript, months start from 0, so we add 1.
  var year = today.getFullYear();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();
  var milliseconds = today.getMilliseconds();

  // Combine the time and date values in the desired format
  var dateTimeString =
    day +
    "_" +
    month +
    "_" +
    year +
    "_" +
    hours +
    "_" +
    minutes +
    "_" +
    seconds +
    "_" +
    milliseconds;

  return dateTimeString;
}
