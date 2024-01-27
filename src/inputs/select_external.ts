import type { ExternalSelect, MultiExternalSelect, PlainTextOption } from '@slack/bolt'
import { Builder, build } from '../builder'
import { actionable, confirmable, focusable, placeholderable } from '../mixins'
import { SelectOptionsBuilder } from '../elements'
import { PlainTextOptionBuilder } from '../elements/options'

abstract class SharedExternalSelectBuilder extends actionable(confirmable(focusable(placeholderable(Builder<ExternalSelect | MultiExternalSelect>)))) {
  protected _minQueryLength?: number

  minQueryLength(minQueryLength: number): this {
    this._minQueryLength = minQueryLength
    return this
  }
}

export class ExternalSelectBuilder extends SharedExternalSelectBuilder {
  private _initialOption?: PlainTextOption

  initialOption(option: PlainTextOption): this
  initialOption(fn: (builder: PlainTextOptionBuilder) => void): this
  initialOption(first: PlainTextOption | ((builder: PlainTextOptionBuilder) => void)): this {
    if (typeof first === 'function') {
      this._initialOption = build(PlainTextOptionBuilder, first)
    } else {
      this._initialOption = { ...first }
    }
    return this
  }

  build(): ExternalSelect {
    return {
      type: 'external_select',
      initial_option: this._initialOption, // eslint-disable-line camelcase
      min_query_length: this._minQueryLength, // eslint-disable-line camelcase
      action_id: this._actionId, // eslint-disable-line camelcase
      confirm: this._confirm,
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
      placeholder: this._placeholder,
    }
  }
}

export class MultiExternalSelectBuilder extends SharedExternalSelectBuilder {
  private _initialOptions?: PlainTextOption[]
  private _maxSelectedItems?: number

  initialOptions(options: PlainTextOption[]): this
  initialOptions(fn: (builder: SelectOptionsBuilder) => void): this
  initialOptions(first: PlainTextOption[] | ((builder: SelectOptionsBuilder) => void)): this {
    if (typeof first === 'function') {
      this._initialOptions = build(SelectOptionsBuilder, first)
    } else {
      this._initialOptions = [...first]
    }
    return this
  }

  maxSelectedItems(maxSelectedItems: number): this {
    this._maxSelectedItems = maxSelectedItems
    return this
  }

  build(): MultiExternalSelect {
    return {
      type: 'multi_external_select',
      initial_options: this._initialOptions, // eslint-disable-line camelcase
      max_selected_items: this._maxSelectedItems, // eslint-disable-line camelcase
      min_query_length: this._minQueryLength, // eslint-disable-line camelcase
      action_id: this._actionId, // eslint-disable-line camelcase
      confirm: this._confirm,
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
      placeholder: this._placeholder,
    }
  }
}
