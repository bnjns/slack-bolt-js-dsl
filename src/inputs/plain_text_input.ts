import type { PlainTextInput } from '@slack/bolt'
import { Builder } from '../builder'
import { actionable, dispatchable, focusable, placeholderable } from '../mixins'

export class PlainTextInputBuilder extends actionable(dispatchable(focusable(placeholderable(Builder<PlainTextInput>)))) {
  private _initialValue?: string
  private _multiline?: boolean
  private _minLength?: number
  private _maxLength?: number

  initialValue(initialValue: string): this {
    this._initialValue = initialValue
    return this
  }

  multiline(multiline: boolean): this {
    this._multiline = multiline
    return this
  }

  minLength(minLength: number): this {
    this._minLength = minLength
    return this
  }

  maxLength(maxLength: number): this {
    this._maxLength = maxLength
    return this
  }

  build(): PlainTextInput {
    return {
      type: 'plain_text_input',
      initial_value: this._initialValue, // eslint-disable-line camelcase
      multiline: this._multiline,
      min_length: this._minLength, // eslint-disable-line camelcase
      max_length: this._maxLength, // eslint-disable-line camelcase
      action_id: this._actionId, // eslint-disable-line camelcase
      dispatch_action_config: this._dispatchActionConfig, // eslint-disable-line camelcase
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
      placeholder: this._placeholder,
    }
  }
}
