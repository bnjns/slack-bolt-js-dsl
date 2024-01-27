import type { MrkdwnElement, MrkdwnOption, Option, PlainTextElement, PlainTextOption } from '@slack/bolt'
import { build, Builder, missingPropertyError } from '../builder'
import { optionDescriptor } from '../mixins'
import { mrkdwnText } from './markdown_text'
import { plainText } from './plain_text'

export class OptionBuilder {
  markdown(fn: (builder: MrkdwnOptionBuilder) => void): MrkdwnOption {
    return build(MrkdwnOptionBuilder, fn)
  }

  plainText(fn: (builder: PlainTextOptionBuilder) => void): PlainTextOption {
    return build(PlainTextOptionBuilder, fn)
  }
}

export class OptionsBuilder extends Builder<Option[]> {
  #_options: Option[] = []

  option(option: Option): this
  option(fn: (builder: OptionBuilder) => Option): this
  option(first: Option | ((builder: OptionBuilder) => Option)): this {
    if (typeof first === 'function') {
      const builder = new OptionBuilder()
      this.#_options.push(first(builder))
    } else {
      this.#_options.push({ ...first })
    }

    return this
  }

  build(): Option[] {
    return this.#_options
  }
}

class MrkdwnOptionBuilder extends optionDescriptor(Builder<MrkdwnOption>) {
  private _text?: MrkdwnElement

  text(text: string, verbatim?: boolean): this {
    this._text = mrkdwnText(text, verbatim)
    return this
  }

  build(): MrkdwnOption {
    if (this._text === undefined) {
      throw missingPropertyError('text')
    }

    return {
      value: this._value,
      url: this._url,
      description: this._description,
      text: this._text,
    }
  }
}

export class PlainTextOptionBuilder extends optionDescriptor(Builder<PlainTextOption>) {
  private _text?: PlainTextElement

  text(text: string, emoji?: boolean): this {
    this._text = plainText(text, emoji)
    return this
  }

  build(): PlainTextOption {
    if (this._text === undefined) {
      throw missingPropertyError('text')
    }

    return {
      value: this._value,
      url: this._url,
      description: this._description,
      text: this._text,
    }
  }
}

export const markdownOption = (fn: (builder: MrkdwnOptionBuilder) => void): MrkdwnOption => new OptionBuilder().markdown(fn)
export const plainTextOption = (fn: (builder: PlainTextOptionBuilder) => void): PlainTextOption => new OptionBuilder().plainText(fn)
