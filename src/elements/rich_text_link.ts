import type { RichTextLink } from '@slack/bolt'
import { Builder, missingPropertyError } from '../builder'
import { richTextStyleable } from '../mixins'
import type { RichTextStyle } from '../types'

export class RichTextLinkBuilder extends richTextStyleable(Builder<RichTextLink>) {
  private _text?: string
  private _unsafe?: boolean
  private _url?: string

  text(text: string): RichTextLinkBuilder {
    this._text = text
    return this
  }

  unsafe(unsafe: boolean): RichTextLinkBuilder {
    this._unsafe = unsafe
    return this
  }

  url(url: string): RichTextLinkBuilder {
    this._url = url
    return this
  }

  build(): RichTextLink {
    if (this._url === undefined) {
      throw missingPropertyError('url')
    }

    return {
      type: 'link',
      text: this._text,
      unsafe: this._unsafe,
      url: this._url,
      style: this._style,
    }
  }
}

export const richTextLink = (url: string, text?: string, unsafe?: boolean, style?: RichTextStyle) => {
  const builder = new RichTextLinkBuilder()
    .url(url)

  if (text !== undefined) {
    builder.text(text)
  }

  if (unsafe !== undefined) {
    builder.unsafe(unsafe)
  }

  if (style !== undefined) {
    builder.style(style)
  }

  return builder.build()
}
