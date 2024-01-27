import type { Datepicker } from '@slack/bolt'
import { Builder } from '../builder'
import { actionable, confirmable, focusable, placeholderable } from '../mixins'

export class DatepickerBuilder extends actionable(confirmable(focusable(placeholderable(Builder<Datepicker>)))) {
  private _initialDate?: string

  initialDate(initialDate: string): this {
    this._initialDate = initialDate
    return this
  }

  build(): Datepicker {
    return {
      type: 'datepicker',
      initial_date: this._initialDate, // eslint-disable-line camelcase
      action_id: this._actionId, // eslint-disable-line camelcase
      confirm: this._confirm,
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
      placeholder: this._placeholder,
    }
  }
}
