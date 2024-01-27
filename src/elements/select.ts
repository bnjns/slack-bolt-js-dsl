import { build, Builder, missingPropertyError } from '../builder'
import type { PlainTextElement, PlainTextOption } from '@slack/bolt'
import { PlainTextOptionBuilder } from './options'
import { plainText } from './plain_text'

type SelectOptionGroup = {
  label: PlainTextElement
  options: PlainTextOption[]
}

export class SelectOptionGroupsBuilder extends Builder<SelectOptionGroup[]>{
  private _optionGroups: SelectOptionGroup[] = []

  build(): SelectOptionGroup[] {
    return this._optionGroups
  }

  optionGroup(optionGroup: SelectOptionGroup): this
  optionGroup(fn: (builder: SelectOptionGroupBuilder) => void): this
  optionGroup(first: SelectOptionGroup | ((builder: SelectOptionGroupBuilder) => void)): this {
    if (typeof first === 'function') {
      this._optionGroups.push(build(SelectOptionGroupBuilder, first))
    } else {
      this._optionGroups.push({ ...first })
    }

    return this
  }
}

export class SelectOptionsBuilder extends Builder<PlainTextOption[]>{
  private _options: PlainTextOption[] = []

  build(): PlainTextOption[] {
    return this._options
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
}

export class SelectOptionGroupBuilder extends Builder<SelectOptionGroup> {
  private _label?: PlainTextElement
  private _options?: PlainTextOption[]

  label(text: string, emoji?: boolean): this {
    this._label = plainText(text, emoji)
    return this
  }

  options(options: PlainTextOption[]): this
  options(fn: (builder: SelectOptionsBuilder) => void): this
  options(first: (PlainTextOption[]) | ((builder: SelectOptionsBuilder) => void)): this {
    if (typeof first === 'function') {
      this._options = build(SelectOptionsBuilder, first)
    } else {
      this._options = [...first]
    }

    return this
  }

  build(): SelectOptionGroup {
    if (this._label === undefined) {
      throw missingPropertyError('label')
    }
    if (this._options === undefined) {
      throw missingPropertyError('options')
    }

    return {
      label: this._label,
      options: this._options,
    }
  }
}
