import type { ImageElement } from '@slack/bolt'
import { Builder, missingPropertyError } from '../builder'

export class ImageElementBuilder extends Builder<ImageElement> {
  private _imageUrl?: string
  private _altText?: string

  imageUrl(imageUrl: string): ImageElementBuilder {
    this._imageUrl = imageUrl
    return this
  }

  altText(altText: string): ImageElementBuilder {
    this._altText = altText
    return this
  }

  build(): ImageElement {
    if (this._imageUrl === undefined) {
      throw missingPropertyError('imageUrl')
    }
    if (this._altText === undefined) {
      throw missingPropertyError('altText')
    }

    return {
      type: 'image',
      image_url: this._imageUrl, // eslint-disable-line camelcase
      alt_text: this._altText, // eslint-disable-line camelcase
    }
  }
}

export const image = (imageUrl: string, altText: string): ImageElement => new ImageElementBuilder()
  .imageUrl(imageUrl)
  .altText(altText)
  .build()
