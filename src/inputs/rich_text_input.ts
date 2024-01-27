import type { RichTextBlock, RichTextInput } from '@slack/bolt'
import { Builder, build } from '../builder'
import { actionable, dispatchable, focusable, placeholderable } from '../mixins'
import { RichTextBlockBuilder } from '../blocks/rich_text'

export class RichTextInputBuilder extends actionable(dispatchable(focusable(placeholderable(Builder<RichTextInput>)))) {
  private _initialValue?: RichTextBlock

  initialValue(block: RichTextBlock): RichTextInputBuilder
  initialValue(fn: (builder: RichTextBlockBuilder) => void): RichTextInputBuilder
  initialValue(first: RichTextBlock | ((builder: RichTextBlockBuilder) => void)): RichTextInputBuilder {
    if (typeof first === 'function') {
      this._initialValue = build(RichTextBlockBuilder, first)
    } else if (typeof first === 'object') {
      this._initialValue = { ...first }
    }

    return this
  }

  build(): RichTextInput {
    return {
      type: 'rich_text_input',
      initial_value: this._initialValue, // eslint-disable-line camelcase
      action_id: this._actionId, // eslint-disable-line camelcase
      dispatch_action_config: this._dispatchActionConfig, // eslint-disable-line camelcase
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
      placeholder: this._placeholder,
    }
  }
}
