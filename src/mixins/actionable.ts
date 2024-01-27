import type { AbstractConstructor, Actionable } from '../types'

export function actionable<T extends AbstractConstructor>(Base: T): AbstractConstructor<Actionable> & T {
  abstract class ActionableClass extends Base implements Actionable {
    #_actionId?: string

    actionId(actionId: string): this {
      this.#_actionId = actionId
      return this
    }

    get _actionId(): string | undefined {
      return this.#_actionId
    }

  }
  return ActionableClass
}
