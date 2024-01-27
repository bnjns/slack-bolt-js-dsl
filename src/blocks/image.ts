import type { ImageBlock, PlainTextElement } from '@slack/bolt'
import { plainText } from '../elements'
import { Builder, missingPropertyError } from '../builder'
import { isBlock } from '../mixins'

export class ImageBlockBuilder extends isBlock(Builder<ImageBlock>) {
  private _imageUrl?: string
  private _altText?: string
  private _title?: PlainTextElement

  imageUrl(imageUrl: string): ImageBlockBuilder {
    this._imageUrl = imageUrl
    return this
  }

  altText(altText: string): ImageBlockBuilder {
    this._altText = altText
    return this
  }

  title(text: string, emoji?: boolean): ImageBlockBuilder {
    this._title = plainText(text, emoji)
    return this
  }

  build(): ImageBlock {
    if (this._imageUrl === undefined) {
      throw missingPropertyError('imageUrl')
    }
    if (this._altText === undefined) {
      throw missingPropertyError('altText')
    }

    return {
      type: 'image',
      block_id: this._blockId, // eslint-disable-line camelcase
      image_url: this._imageUrl, // eslint-disable-line camelcase
      alt_text: this._altText, // eslint-disable-line camelcase
      title: this._title,
    }
  }
}
