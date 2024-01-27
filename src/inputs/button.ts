import type { Button, PlainTextElement } from '@slack/bolt'
import { Builder, missingPropertyError } from '../builder'
import { plainText } from '../elements'
import { actionable, confirmable } from '../mixins'
import type { ButtonStyle } from '../types'

export class ButtonBuilder extends actionable(confirmable(Builder<Button>)) {
  private _text?: PlainTextElement
  private _value?: string
  private _url?: string
  private _style?: ButtonStyle
  private _accessibilityLabel?: string

  text(text: string, emoji?: boolean): ButtonBuilder {
    this._text = plainText(text, emoji)
    return this
  }

  value(value: string): ButtonBuilder {
    this._value = value
    return this
  }

  url(url: string): ButtonBuilder {
    this._url = url
    return this
  }

  style(style: ButtonStyle): ButtonBuilder {
    this._style = style
    return this
  }

  accessibilityLabel(accessibilityLabel: string): ButtonBuilder {
    this._accessibilityLabel = accessibilityLabel
    return this
  }

  build(): Button {
    if (this._text === undefined) {
      throw missingPropertyError('text')
    }

    return {
      type: 'button',
      text: this._text,
      value: this._value,
      url: this._url,
      style: this._style,
      accessibility_label: this._accessibilityLabel, // eslint-disable-line camelcase
      action_id: this._actionId, // eslint-disable-line camelcase
      confirm: this._confirm,
    }
  }
}
