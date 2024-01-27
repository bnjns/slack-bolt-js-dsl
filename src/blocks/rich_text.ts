import type { RichTextBlock } from '@slack/bolt'
import { build, Builder } from '../builder'
import { RichTextSection, RichTextList, RichTextQuote, RichTextPreformatted } from '../elements'
import type { RichTextBlockElement } from '../types'
import { isBlock } from '../mixins'

class RichTextBlockElementBuilder extends Builder<RichTextBlockElement[]> {
  private _elements: RichTextBlockElement[] = []

  build(): RichTextBlockElement[] {
    return this._elements
  }

  element(element: RichTextBlockElement): this {
    this._elements.push({ ...element })
    return this
  }

  section(fn: (builder: RichTextSection) => void): this {
    return this.element(build(RichTextSection, fn))
  }

  list(fn: (builder: RichTextList) => void): this {
    return this.element(build(RichTextList, fn))
  }

  quote(fn: (builder: RichTextQuote) => void): this {
    return this.element(build(RichTextQuote, fn))
  }

  preformatted(fn: (builder: RichTextPreformatted) => void): this {
    return this.element(build(RichTextPreformatted, fn))
  }
}

export class RichTextBlockBuilder extends isBlock(Builder<RichTextBlock>) {
  private _elements: RichTextBlockElement[] = []

  elements(element: RichTextBlockElement[]): this
  elements(fn: (builder: RichTextBlockElementBuilder) => void): this
  elements(first: RichTextBlockElement[] | ((builder: RichTextBlockElementBuilder) => void)): this {
    if (typeof first === 'function') {
      this._elements = build(RichTextBlockElementBuilder, first)
    } else {
      this._elements = [...first]
    }
    return this
  }

  build(): RichTextBlock {
    return {
      type: 'rich_text',
      block_id: this._blockId, // eslint-disable-line camelcase
      elements: this._elements,
    }
  }
}
