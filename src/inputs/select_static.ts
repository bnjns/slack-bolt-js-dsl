import type { MultiStaticSelect, PlainTextOption, StaticSelect } from '@slack/bolt'
import { Builder, build } from '../builder'
import { actionable, confirmable, focusable, placeholderable } from '../mixins'
import type { SelectOptionGroup } from '../types'
import { SelectOptionGroupsBuilder, SelectOptionsBuilder } from '../elements'
import { PlainTextOptionBuilder } from '../elements/options'

abstract class SharedStaticSelectBuilder extends actionable(confirmable(focusable(placeholderable(Builder<StaticSelect | MultiStaticSelect>)))) {
  protected _options?: PlainTextOption[]
  protected _optionGroups?: SelectOptionGroup[]

  optionGroups(options: SelectOptionGroup[]): this
  optionGroups(fn: (builder: SelectOptionGroupsBuilder) => void): this
  optionGroups(first: SelectOptionGroup[] | ((builder: SelectOptionGroupsBuilder) => void)): this {
    if (typeof first == 'function') {
      this._optionGroups = build(SelectOptionGroupsBuilder, first)
    } else {
      this._optionGroups = [...first]
    }
    return this
  }

  options(options: PlainTextOption[]): this
  options(fn: (builder: SelectOptionsBuilder) => void): this
  options(first: PlainTextOption[] | ((builder: SelectOptionsBuilder) => void)): this {
    if (typeof first == 'function') {
      this._options = build(SelectOptionsBuilder, first)
    } else {
      this._options = [...first]
    }
    return this
  }
}

export class StaticSelectBuilder extends SharedStaticSelectBuilder {
  private _initialOption?: PlainTextOption

  initialOption(options: PlainTextOption): this
  initialOption(fn: (builder: PlainTextOptionBuilder) => void): this
  initialOption(first: PlainTextOption | ((builder: PlainTextOptionBuilder) => void)): this {
    if (typeof first == 'function') {
      this._initialOption = build(PlainTextOptionBuilder, first)
    } else {
      this._initialOption = { ...first }
    }
    return this
  }

  build(): StaticSelect {
    return {
      type: 'static_select',
      initial_option: this._initialOption, // eslint-disable-line camelcase
      options: this._options,
      option_groups: this._optionGroups, // eslint-disable-line camelcase
      action_id: this._actionId, // eslint-disable-line camelcase
      confirm: this._confirm,
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
      placeholder: this._placeholder,
    }
  }
}

export class MultiStaticSelectBuilder extends SharedStaticSelectBuilder {
  private _initialOptions?: PlainTextOption[]
  private _maxSelectedItems?: number

  initialOptions(options: PlainTextOption[]): this
  initialOptions(fn: (builder: SelectOptionsBuilder) => void): this
  initialOptions(first: PlainTextOption[] | ((builder: SelectOptionsBuilder) => void)): this {
    if (typeof first == 'function') {
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

  build(): MultiStaticSelect {
    return {
      type: 'multi_static_select',
      initial_options: this._initialOptions, // eslint-disable-line camelcase
      max_selected_items: this._maxSelectedItems, // eslint-disable-line camelcase
      options: this._options,
      option_groups: this._optionGroups, // eslint-disable-line camelcase
      action_id: this._actionId, // eslint-disable-line camelcase
      confirm: this._confirm,
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
      placeholder: this._placeholder,
    }
  }
}
