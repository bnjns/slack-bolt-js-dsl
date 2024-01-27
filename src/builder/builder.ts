export abstract class Builder<T> {
  abstract build(): T
}

export const missingPropertyError = (name: string)  => {
  return Error(`Missing property: ${ name }`)
}

export const build = <U, T extends Builder<U>>(c: new () => T, fn: (builder: T) => void): U => {
  const builder = new c()
  fn(builder)
  return builder.build()
}
