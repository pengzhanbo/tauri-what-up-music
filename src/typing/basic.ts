export interface OptionsItem<T = string> {
  label: string
  value: T
}

export type Options<T = string> = OptionsItem<T>[]

export type NotNullable<T> = T extends null | undefined ? never : T
