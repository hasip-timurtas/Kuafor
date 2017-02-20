export const move = (array, fromIndex, toIndex) => {

  while (fromIndex < 0) {
    fromIndex += array.length;
  }

  while (toIndex < 0) {
    toIndex += array.length;
  }

  if (toIndex >= array.length) {
    var k = toIndex - array.length;
    while ((k--) + 1) {
      array.push(undefined);
    }
  }

  array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);

  return array;

};
