import type { RichTextStyle, RichTextStyleable } from '../types'

export function richTextStyleable<T extends AbstractConstructor>(Base: T): AbstractConstructor<RichTextStyleable> & T {
  abstract class RichTextStyleableClass extends Base implements RichTextStyleable {
    #_style: RichTextStyle = {}

    get _style() {
      return this.#_style
    }

    style(style: RichTextStyle): this {
      this.#_style = { ...style }
      return this
    }

    bold(bold: boolean): this {
      this.#_style.bold = bold
      return this
    }

    code(code: boolean): this {
      this.#_style.code = code
      return this
    }

    italic(italic: boolean): this {
      this.#_style.italic = italic
      return this
    }

    strike(strike: boolean): this {
      this.#_style.strike = strike
      return this
    }
  }

  return RichTextStyleableClass
}
