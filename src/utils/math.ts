export const numUnit = (num: number): string => {
  if (num > 100000000) {
    return `${Math.floor(num / 100000000)}亿`
  } else if (num > 10000) {
    return `${Math.floor(num / 10000)}万`
  }
  return String(num)
}
