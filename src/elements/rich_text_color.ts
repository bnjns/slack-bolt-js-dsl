import type { RichTextColor } from '@slack/bolt'
import { Builder, missingPropertyError } from '../builder'
import { richTextStyleable } from '../mixins'
import type { RichTextStyle } from '../types'

export class RichTextColorBuilder extends richTextStyleable(Builder<RichTextColor>) {
  private _color?: string

  color(color: string): RichTextColorBuilder {
    this._color = color
    return this
  }

  build(): RichTextColor {
    if (this._color === undefined) {
      throw missingPropertyError('color')
    }

    return {
      type: 'color',
      value: this._color,
      style: this._style,
    }
  }
}

export const richTextColor = (color: string, style?: RichTextStyle) => {
  const builder = new RichTextColorBuilder().color(color)

  if (style !== undefined) {
    builder.style(style)
  }

  return builder.build()
}
