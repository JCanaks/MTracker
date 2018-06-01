export default function (obj) {
  for (const key in obj) {
    if (obj[key] == null || obj[key] == '') {
      return true;
    }
  }
  return false;
}
