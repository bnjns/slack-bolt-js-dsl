import type { DispatchActionConfig } from '@slack/bolt'
import type { Dispatchable } from '../types'

export function dispatchable<T extends AbstractConstructor>(Base: T): AbstractConstructor<Dispatchable> & T {
  abstract class DispatchableClass extends Base implements Dispatchable {
    #_dispatchActionConfig?: DispatchActionConfig

    dispatchActionConfig(dispatchActionConfig: DispatchActionConfig): this {
      this.#_dispatchActionConfig = dispatchActionConfig
      return this
    }

    get _dispatchActionConfig() {
      return this.#_dispatchActionConfig
    }
  }

  return DispatchableClass
}
