export const formatPrice = (
  value: number,
  currency: string,
  country: string = "uk-Ua",
) => value.toLocaleString(country) + ` ${currency}`;
