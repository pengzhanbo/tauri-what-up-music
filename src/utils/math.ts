export const numUnit = (num: number): string => {
  if (num > 1000000000) {
    return `${Math.floor(num / 1000000000)}亿`
  } else if (num > 10000) {
    return `${Math.floor(num / 10000)}万`
  }
  return String(num)
}
