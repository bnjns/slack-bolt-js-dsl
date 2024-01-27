import type { RichTextEmoji } from '@slack/bolt'
import { Builder, missingPropertyError } from '../builder'
import { richTextStyleable } from '../mixins'
import type { RichTextStyle } from '../types'

export class RichTextEmojiBuilder extends richTextStyleable(Builder<RichTextEmoji>) {
  private _name?: string
  private _unicode?: string
  private _url?: string

  name(name: string): RichTextEmojiBuilder {
    this._name = name
    return this
  }

  unicode(unicode: string): RichTextEmojiBuilder {
    this._unicode = unicode
    return this
  }

  url(url: string): RichTextEmojiBuilder {
    this._url = url
    return this
  }

  build(): RichTextEmoji {
    if (this._name === undefined) {
      throw missingPropertyError('name')
    }

    return {
      type: 'emoji',
      name: this._name,
      unicode: this._unicode,
      url: this._url,
      style: this._style,
    }
  }
}

export const richTextEmoji = (name: string, unicode?: string, url?: string, style?: RichTextStyle) => {
  const builder = new RichTextEmojiBuilder()
    .name(name)

  if (unicode !== undefined) {
    builder.unicode(unicode)
  }

  if (url !== undefined) {
    builder.url(url)
  }

  if (style !== undefined) {
    builder.style(style)
  }

  return builder.build()
}
