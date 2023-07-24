export function buildAddress(city: {
  name: string;
  code: number;
}[]) {
  return city.map(item => item.name).join(' ');
}