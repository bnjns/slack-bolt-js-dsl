import type { RichTextElement } from '@slack/bolt'
import { RichTextColor, RichTextDate, RichTextEmoji, RichTextLink, RichTextMention, RichTextText } from '../elements'
import { build } from '../builder'

export function withRichTextElements<T extends AbstractConstructor>(Base: T) {
  abstract class WithRichTextElements extends Base {
    #_elements: RichTextElement[] = []

    get _elements() {
      return this.#_elements
    }

    elements(elements: RichTextElement[]): this
    elements(fn: (builder: ElementsBuilder) => void): this
    elements(first: RichTextElement[] | ((builder: ElementsBuilder) => void)): this {
      if (typeof first === 'function') {
        const builder = new ElementsBuilder()
        first(builder)
        this.#_elements = [...builder.elements]
      } else {
        this.#_elements = [...first]
      }
      return this
    }
  }

  return WithRichTextElements
}

class ElementsBuilder {
  #_elements: RichTextElement[] = []

  get elements() {
    return this.#_elements
  }

  element(element: RichTextElement): this {
    this.#_elements.push({ ...element })
    return this
  }

  mention(fn: (builder: RichTextMention) => void) {
    return this.element(build(RichTextMention, fn))
  }

  color(fn: (builder: RichTextColor) => void) {
    return this.element(build(RichTextColor, fn))
  }

  date(fn: (builder: RichTextDate) => void) {
    return this.element(build(RichTextDate, fn))
  }

  emoji(fn: (builder: RichTextEmoji) => void) {
    return this.element(build(RichTextEmoji, fn))
  }

  link(fn: (builder: RichTextLink) => void) {
    return this.element(build(RichTextLink, fn))
  }

  text(fn: (builder: RichTextText) => void) {
    return this.element(build(RichTextText, fn))
  }
}
