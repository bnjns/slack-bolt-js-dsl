import type { ContextBlock } from '@slack/bolt'
import { image, mrkdwnText, plainText } from '../elements'
import { Builder, build } from '../builder'
import type { ContextBlockElement } from '../types'
import { isBlock } from '../mixins'

class ContextBlockElementBuilder extends Builder<ContextBlockElement[]> {
  private _elements: ContextBlockElement[] = []

  build(): ContextBlockElement[] {
    return this._elements
  }

  element(element: ContextBlockElement): this {
    this._elements.push({ ...element })
    return this
  }

  image(imageUrl: string, altText: string): this {
    return this.element(image(imageUrl, altText))
  }

  plainText(text: string, emoji?: boolean): this {
    return this.element(plainText(text, emoji))
  }

  mrkdwnText(text: string, verbatim?: boolean): this {
    return this.element(mrkdwnText(text, verbatim))
  }
}

export class ContextBlockBuilder extends isBlock(Builder<ContextBlock>) {
  private _elements: ContextBlockElement[] = []

  elements(elements: ContextBlockElement[]): this
  elements(fn: (builder: ContextBlockElementBuilder) => void): this
  elements(first: ContextBlockElement[] | ((builder: ContextBlockElementBuilder) => void)): this {
    if (typeof first === 'function') {
      this._elements = build(ContextBlockElementBuilder, first)
    } else {
      this._elements = [...first]
    }

    return this
  }


  build(): ContextBlock {
    return {
      type: 'context',
      block_id: this._blockId, // eslint-disable-line camelcase
      elements: this._elements,
    }
  }
}
