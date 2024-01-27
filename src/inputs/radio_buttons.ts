import type { Option, RadioButtons } from '@slack/bolt'
import { Builder, build, missingPropertyError } from '../builder'
import { actionable, confirmable, focusable } from '../mixins'
import { OptionBuilder, OptionsBuilder } from '../elements'

export class RadioButtonsBuilder extends actionable(confirmable(focusable(Builder<RadioButtons>))) {
  private _initialOption?: Option
  private _options?: Option[]

  initialOption(option: Option): this
  initialOption(fn: (builder: OptionBuilder) => Option): this
  initialOption(first: Option | ((builder: OptionBuilder) => Option)): this {
    if (typeof first === 'function') {
      const builder = new OptionBuilder()
      this._initialOption = first(builder)
    } else {
      this._initialOption = { ...first }
    }
    return this
  }

  options(options: Option[]): this
  options(fn: (builder: OptionsBuilder) => void): this
  options(first: Option[] | ((builder: OptionsBuilder) => void)): this {
    if (typeof first == 'function') {
      this._options = build(OptionsBuilder, first)
    } else {
      this._options = [...first]
    }
    return this
  }

  build(): RadioButtons {
    if (this._options === undefined) {
      throw missingPropertyError('options')
    }

    return {
      type: 'radio_buttons',
      initial_option: this._initialOption, // eslint-disable-line camelcase
      options: this._options,
      action_id: this._actionId, // eslint-disable-line camelcase
      confirm: this._confirm,
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
    }
  }
}
