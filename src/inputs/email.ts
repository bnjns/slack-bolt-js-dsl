import type { EmailInput } from '@slack/bolt'
import { Builder } from '../builder'
import { actionable, dispatchable, focusable, placeholderable } from '../mixins'

export class EmailInputBuilder extends actionable(dispatchable(focusable(placeholderable(Builder<EmailInput>)))) {
  private _initialValue?: string

  initialValue(initialValue: string): this {
    this._initialValue = initialValue
    return this
  }

  build(): EmailInput {
    return {
      type: 'email_text_input',
      initial_value: this._initialValue, // eslint-disable-line camelcase
      action_id: this._actionId, // eslint-disable-line camelcase
      dispatch_action_config: this._dispatchActionConfig, // eslint-disable-line camelcase
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
      placeholder: this._placeholder,
    }
  }
}
