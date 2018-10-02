export function classNames(data) {
  let classNames = [];
  for (let prop in data) {
    if (data[prop]) {
      classNames.push(prop.trim());
    }
  }
  return classNames.join(" ");
}
