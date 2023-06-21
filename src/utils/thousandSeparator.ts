export const thousandSeparator = (target: number) => {
  return target?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
