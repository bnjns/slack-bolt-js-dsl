import type { Timepicker } from '@slack/bolt'
import { Builder } from '../builder'
import { actionable, confirmable, focusable, placeholderable } from '../mixins'

export class TimepickerBuilder extends actionable(confirmable(focusable(placeholderable(Builder<Timepicker>)))) {
  private _initialTime?: string
  private _timezone?: string

  initialTime(initialTime: string): this {
    this._initialTime = initialTime
    return this
  }

  timezone(timezone: string): this {
    this._timezone = timezone
    return this
  }

  build(): Timepicker {
    return {
      type: 'timepicker',
      initial_time: this._initialTime, // eslint-disable-line camelcase
      timezone: this._timezone,
      action_id: this._actionId, // eslint-disable-line camelcase
      confirm: this._confirm,
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
      placeholder: this._placeholder,
    }
  }
}
