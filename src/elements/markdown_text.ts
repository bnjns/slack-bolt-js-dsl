import type { MrkdwnElement } from '@slack/bolt'
import { Builder, missingPropertyError } from '../builder'

export class MrkdwnTextElementBuilder extends Builder<MrkdwnElement> {
  private _text?: string
  private _verbatim?: boolean

  text(text: string): MrkdwnTextElementBuilder {
    this._text = text
    return this
  }

  verbatim(verbatim: boolean): MrkdwnTextElementBuilder {
    this._verbatim = verbatim
    return this
  }

  build(): MrkdwnElement {
    if (this._text === undefined) {
      throw missingPropertyError('text')
    }

    return {
      type: 'mrkdwn',
      text: this._text,
      verbatim: this._verbatim,
    }
  }
}

export const mrkdwnText = (text: string, verbatim?: boolean): MrkdwnElement => {
  const builder = new MrkdwnTextElementBuilder()
    .text(text)

  if (verbatim !== undefined) {
    builder.verbatim(verbatim)
  }

  return builder.build()
}
