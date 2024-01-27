import type { DateTimepicker } from '@slack/bolt'
import { Builder } from '../builder'
import { actionable, confirmable, focusable } from '../mixins'

export class DatetimepickerBuilder extends actionable(confirmable(focusable(Builder<DateTimepicker>))) {
  private _initialDateTime?: number

  initialDateTime(initialDateTime: number): this {
    this._initialDateTime = initialDateTime
    return this
  }

  build(): DateTimepicker {
    return {
      type: 'datetimepicker',
      initial_date_time: this._initialDateTime, // eslint-disable-line camelcase
      action_id: this._actionId, // eslint-disable-line camelcase
      confirm: this._confirm,
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
    }
  }
}
