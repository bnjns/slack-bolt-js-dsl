import type { Overflow, PlainTextOption } from '@slack/bolt'
import { Builder, build } from '../builder'
import { actionable, confirmable } from '../mixins'
import { PlainTextOptionBuilder } from '../elements/options'

export class OverflowBuilder extends actionable(confirmable(Builder<Overflow>)) {
  private _options: PlainTextOption[] = []

  options(options: PlainTextOption[]): this {
    this._options = [...options]
    return this
  }

  option(option: PlainTextOption): this
  option(fn: (builder: PlainTextOptionBuilder) => void): this
  option(first: PlainTextOption | ((builder: PlainTextOptionBuilder) => void)): this {
    if (typeof first === 'function') {
      this._options.push(build(PlainTextOptionBuilder, first))
    } else {
      this._options.push({ ...first })
    }
    
    return this
  }

  build(): Overflow {
    return {
      type: 'overflow',
      options: this._options,
      action_id: this._actionId, // eslint-disable-line camelcase
      confirm: this._confirm,
    }
  }
}
