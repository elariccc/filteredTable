export function deepCloneArray(array) {
  return array.map(
    item => Array.isArray(item) ? deepCloneArray(item) : item
  );
}