import type { RichTextPreformatted } from '@slack/bolt'
import { build, Builder } from '../builder'
import { RichTextTextBuilder } from './rich_text_text'
import { RichTextLinkBuilder } from './rich_text_link'
import type { PreformattedElement } from '../types'

class PreformattedElementBuilder extends Builder<PreformattedElement[]> {
  private _elements: PreformattedElement[] = []

  element(element: PreformattedElement): this {
    this._elements.push({ ...element })
    return this
  }

  text(fn: (builder: RichTextTextBuilder) => void): this {
    return this.element(build(RichTextTextBuilder, fn))
  }

  link(fn: (builder: RichTextLinkBuilder) => void): this {
    return this.element(build(RichTextLinkBuilder, fn))
  }

  build(): PreformattedElement[] {
    return this._elements
  }
}

export class RichTextPreformattedBuilder extends Builder<RichTextPreformatted> {
  private _elements: PreformattedElement[] = []
  private _border?: boolean

  elements(elements: PreformattedElement[]): this
  elements(fn: (builder: PreformattedElementBuilder) => void): this
  elements(first: PreformattedElement[] | ((builder: PreformattedElementBuilder) => void)): this {
    if (typeof first === 'function') {
      this._elements = build(PreformattedElementBuilder, first)
    } else {
      this._elements = [...first]
    }
    return this
  }

  border(border: boolean): RichTextPreformattedBuilder {
    this._border = border
    return this
  }

  build(): RichTextPreformatted {
    return {
      type: 'rich_text_preformatted',
      elements: this._elements,
      border: this._border === undefined ? undefined : (this._border ? 1 : 0),
    }
  }
}
