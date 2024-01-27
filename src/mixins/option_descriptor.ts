import type { PlainTextElement } from '@slack/bolt'
import { plainText } from '../elements'
import type { AbstractConstructor } from '../types'

export function optionDescriptor<T extends AbstractConstructor>(Base: T) {
  abstract class OptionDescriptor extends Base {
    #_value?: string
    #_url?: string
    #_description?: PlainTextElement

    get _value() {
      return this.#_value
    }

    value(value: string): this {
      this.#_value = value
      return this
    }

    get _url() {
      return this.#_url
    }

    url(url: string): this {
      this.#_url = url
      return this
    }

    get _description() {
      return this.#_description
    }

    description(text: string, emoji?: boolean): this {
      this.#_description = plainText(text, emoji)
      return this
    }
  }

  return OptionDescriptor
}
