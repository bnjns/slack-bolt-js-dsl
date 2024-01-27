import type { PlainTextElement } from '@slack/bolt'
import { Builder, missingPropertyError } from '../builder'

export class PlainTextElementBuilder extends Builder<PlainTextElement> {
  private _text?: string
  private _emoji?: boolean

  text(text: string): PlainTextElementBuilder {
    this._text = text
    return this
  }

  emoji(emoji: boolean): PlainTextElementBuilder {
    this._emoji = emoji
    return this
  }

  build(): PlainTextElement {
    if (this._text === undefined) {
      throw missingPropertyError('text')
    }

    return {
      type: 'plain_text',
      text: this._text,
      emoji: this._emoji,
    }
  }
}

export const plainText = (text: string, emoji?: boolean) => {
  const builder = new PlainTextElementBuilder().text(text)

  if (emoji !== undefined) {
    builder.emoji(emoji)
  }

  return builder.build()
}
