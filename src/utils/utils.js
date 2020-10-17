export function textarea(str) {
  return str && str.replace(/\n|\r\n/g, "<br>");
}
