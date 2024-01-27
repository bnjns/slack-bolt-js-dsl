import type { PlainTextElement, VideoBlock } from '@slack/bolt'
import { plainText } from '../elements'
import { Builder, missingPropertyError } from '../builder'
import { isBlock } from '../mixins'

export class VideoBlockBuilder extends isBlock(Builder<VideoBlock>) {
  private _videoUrl?: string
  private _thumbnailUrl?: string
  private _altText?: string
  private _title?: PlainTextElement
  private _titleUrl?: string
  private _authorName?: string
  private _providerName?: string
  private _providerIconUrl?: string
  private _description?: PlainTextElement

  videoUrl(videoUrl: string): VideoBlockBuilder {
    this._videoUrl = videoUrl
    return this
  }

  thumbnailUrl(thumbnailUrl: string): VideoBlockBuilder {
    this._thumbnailUrl = thumbnailUrl
    return this
  }

  altText(altText: string): VideoBlockBuilder {
    this._altText = altText
    return this
  }

  title(text: string, emoji?: boolean): VideoBlockBuilder {
    this._title = plainText(text, emoji)
    return this
  }

  titleUrl(titleUrl: string): VideoBlockBuilder {
    this._titleUrl = titleUrl
    return this
  }

  authorName(authorName: string): VideoBlockBuilder {
    this._authorName = authorName
    return this
  }

  providerName(providerName: string): VideoBlockBuilder {
    this._providerName = providerName
    return this
  }

  providerIconUrl(providerIconUrl: string): VideoBlockBuilder {
    this._providerIconUrl = providerIconUrl
    return this
  }

  description(text: string, emoji?: boolean): VideoBlockBuilder {
    this._description = plainText(text, emoji)
    return this
  }

  build(): VideoBlock {
    if (this._videoUrl === undefined) {
      throw missingPropertyError('videoUrl')
    }
    if (this._thumbnailUrl === undefined) {
      throw missingPropertyError('thumbnailUrl')
    }
    if (this._altText === undefined) {
      throw missingPropertyError('altText')
    }
    if (this._title === undefined) {
      throw missingPropertyError('title')
    }

    return {
      type: 'video',
      block_id: this._blockId, // eslint-disable-line camelcase
      video_url: this._videoUrl, // eslint-disable-line camelcase
      thumbnail_url: this._thumbnailUrl,  // eslint-disable-line camelcase
      alt_text: this._altText, // eslint-disable-line camelcase
      title: this._title, // eslint-disable-line camelcase
      title_url: this._titleUrl, // eslint-disable-line camelcase
      author_name: this._authorName, // eslint-disable-line camelcase
      provider_name: this._providerName, // eslint-disable-line camelcase
      provider_icon_url: this._providerIconUrl, // eslint-disable-line camelcase
      description: this._description,
    }
  }
}
