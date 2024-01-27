import type { PlainTextElement } from '@slack/bolt'
import { plainText } from '../elements'
import type { Placeholderable } from '../types'

export function placeholderable<T extends AbstractConstructor>(Base: T): AbstractConstructor<Placeholderable> & T {
  abstract class PlaceholderableClass extends Base implements Placeholderable {
    #_placeholder?: PlainTextElement

    placeholder(text: string, emoji?: boolean): this {
      this.#_placeholder = plainText(text, emoji)
      return this
    }

    get _placeholder() {
      return this.#_placeholder
    }
  }

  return PlaceholderableClass
}
