import type { AbstractConstructor, Focusable } from '../types'

export function focusable<T extends AbstractConstructor>(Base: T): AbstractConstructor<Focusable> & T {
  abstract class FocusableClass extends Base implements Focusable {
    #_focusOnLoad?: boolean

    focusOnLoad(focusOnLoad: boolean): this {
      this.#_focusOnLoad = focusOnLoad
      return this
    }

    get _focusOnLoad() {
      return this.#_focusOnLoad
    }
  }

  return FocusableClass
}
