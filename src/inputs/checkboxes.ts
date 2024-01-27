import type { Checkboxes, Option } from '@slack/bolt'
import { Builder, build, missingPropertyError } from '../builder'
import { actionable, confirmable, focusable } from '../mixins'
import { OptionsBuilder } from '../elements'

export class CheckboxesBuilder extends actionable(confirmable(focusable(Builder<Checkboxes>))) {
  private _initialOptions?: Option[]
  private _options?: Option[]

  initialOptions(initialOptions: Option[]): this
  initialOptions(fn: (builder: OptionsBuilder) => void): this
  initialOptions(first: Option[] | ((builder: OptionsBuilder) => void)): this {
    if (typeof first == 'function') {
      this._initialOptions = build(OptionsBuilder, first)
    } else {
      this._initialOptions = [...first]
    }
    return this
  }

  options(options: Option[]): this
  options(fn: (builder: OptionsBuilder) => void): this
  options(first: Option[] | ((builder: OptionsBuilder) => void)): this {
    if (typeof first == 'function') {
      const builder = new OptionsBuilder()
      first(builder)
      this._options = build(OptionsBuilder, first)
    } else {
      this._options = [...first]
    }
    return this
  }

  build(): Checkboxes {
    if (this._options === undefined) {
      throw missingPropertyError('options')
    }

    return {
      type: 'checkboxes',
      initial_options: this._initialOptions, // eslint-disable-line camelcase
      options: this._options,
    }
  }
}
