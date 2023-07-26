export function formatAddress(city: {
  name: string;
  code: number;
}[]) {
  return city.map(item => item.name).join(' ');
}