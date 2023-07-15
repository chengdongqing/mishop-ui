export function getSimpleProductName(name: string) {
  return name.replace(/\s/g, '').toLowerCase();
}