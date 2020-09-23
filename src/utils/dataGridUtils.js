export function fakeColumGenerator(number, readOnly = false) {
  const items = [];
  for (let index = 0; index < number; index += 1) {
    items.push({
      value: "",
      readOnly,
    });
  }
  return items;
}

export function fakeRowGenerator(number, fakeColumn) {
  const items = [];
  for (let index = 0; index < number; index += 1) {
    items.push(fakeColumn);
  }
  return items;
}
