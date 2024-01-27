import type { HeaderBlock, PlainTextElement } from '@slack/bolt'
import { plainText } from '../elements'
import { Builder, missingPropertyError } from '../builder'
import { isBlock } from '../mixins'

export class HeaderBlockBuilder extends isBlock(Builder<HeaderBlock>) {
  private _text?: PlainTextElement

  text(text: string, emoji?: boolean): HeaderBlockBuilder {
    this._text = plainText(text, emoji)
    return this
  }

  build(): HeaderBlock {
    if (this._text === undefined) {
      throw missingPropertyError('text')
    }

    return {
      type: 'header',
      block_id: this._blockId, // eslint-disable-line camelcase
      text: this._text,
    }
  }
}
