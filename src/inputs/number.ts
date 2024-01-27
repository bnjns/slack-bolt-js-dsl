import type { NumberInput } from '@slack/bolt'
import { Builder, missingPropertyError } from '../builder'
import { actionable, dispatchable, focusable, placeholderable } from '../mixins'

export class NumberInputBuilder extends actionable(dispatchable(focusable(placeholderable(Builder<NumberInput>)))) {
  private _isDecimalAllowed?: boolean
  private _initialValue?: string
  private _minValue?: string
  private _maxValue?: string

  isDecimalAllowed(isDecimalAllowed: boolean): this {
    this._isDecimalAllowed = isDecimalAllowed
    return this
  }

  initialValue(initialValue: string): this {
    this._initialValue = initialValue
    return this
  }

  minValue(minValue: string): this {
    this._minValue = minValue
    return this
  }

  maxValue(maxValue: string): this {
    this._maxValue = maxValue
    return this
  }

  build(): NumberInput {
    if (this._isDecimalAllowed === undefined) {
      throw missingPropertyError('isDecimalAllowed')
    }

    return {
      type: 'number_input',
      is_decimal_allowed: this._isDecimalAllowed, // eslint-disable-line camelcase
      initial_value: this._initialValue, // eslint-disable-line camelcase
      min_value: this._minValue, // eslint-disable-line camelcase
      max_value: this._maxValue, // eslint-disable-line camelcase
      action_id: this._actionId, // eslint-disable-line camelcase
      dispatch_action_config: this._dispatchActionConfig, // eslint-disable-line camelcase
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
      placeholder: this._placeholder,
    }
  }
}
