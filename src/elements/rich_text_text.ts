import type { RichTextText } from '@slack/bolt'
import { Builder, missingPropertyError } from '../builder'
import { richTextStyleable } from '../mixins'
import type { RichTextStyle } from '../types'

export class RichTextTextBuilder extends richTextStyleable(Builder<RichTextText>) {
  private _text?: string

  text(text: string): RichTextTextBuilder {
    this._text = text
    return this
  }

  build(): RichTextText {
    if (this._text === undefined) {
      throw missingPropertyError('text')
    }

    return {
      type: 'text',
      text: this._text,
      style: this._style,
    }
  }
}

export const richTextText = (text: string, style?: RichTextStyle) => {
  const builder = new RichTextTextBuilder().text(text)

  if (style !== undefined) {
    builder.style(style)
  }

  return builder.build()
}
