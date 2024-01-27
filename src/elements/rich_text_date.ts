import type { RichTextDate } from '@slack/bolt'
import { Builder, missingPropertyError } from '../builder'
import { richTextStyleable } from '../mixins'
import type {  RichTextStyle } from '../types'

export class RichTextDateBuilder extends richTextStyleable(Builder<RichTextDate>) {
  private _timestamp?: number
  private _format?: string
  private _url?: string
  private _fallback?: string

  timestamp(timestamp: number): RichTextDateBuilder {
    this._timestamp = timestamp
    return this
  }

  format(format: string): RichTextDateBuilder {
    this._format = format
    return this
  }

  url(url: string): RichTextDateBuilder {
    this._url = url
    return this
  }

  fallback(fallback: string): RichTextDateBuilder {
    this._fallback = fallback
    return this
  }

  build(): RichTextDate {
    if (this._timestamp === undefined) {
      throw missingPropertyError('timestamp')
    }
    if (this._format === undefined) {
      throw missingPropertyError('format')
    }

    return {
      type: 'date',
      timestamp: this._timestamp,
      format: this._format,
      url: this._url,
      fallback: this._fallback,
      style: this._style,
    }
  }
}

export const richTextDate = (timestamp: number, format: string, url?: string, fallback?: string, style?: RichTextStyle) => {
  const builder = new RichTextDateBuilder()
    .timestamp(timestamp)
    .format(format)

  if (url !== undefined) {
    builder.url(url)
  }

  if (fallback !== undefined) {
    builder.fallback(fallback)
  }

  if (style !== undefined) {
    builder.style(style)
  }

  return builder.build()
}
