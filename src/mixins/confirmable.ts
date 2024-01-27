import type { ConfirmationDialog } from '@slack/bolt'
import type { Confirmable } from '../types'

export function confirmable<T extends AbstractConstructor>(Base: T): AbstractConstructor<Confirmable> & T {
  abstract class ConfirmableClass extends Base implements Confirmable {
    #_confirm?: ConfirmationDialog

    confirm(confirm: ConfirmationDialog): this {
      this.#_confirm = confirm
      return this
    }

    get _confirm() {
      return this.#_confirm
    }
  }

  return ConfirmableClass
}
