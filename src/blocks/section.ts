import type { SectionBlock } from '@slack/bolt'
import { Builder, build, missingPropertyError } from '../builder'
import { mrkdwnText, plainText } from '../elements'
import type { SectionBlockAccessory, SectionBlockTextElement } from '../types'
import { isBlock } from '../mixins'

// TODO: make sure this is tested so that text, fields and accessory are undefined if not set (rather than empty array)
export class SectionBlockBuilder extends isBlock(Builder<SectionBlock>) {
  private _text?: SectionBlockTextElement
  private _fields?: SectionBlockTextElement[]
  private _accessory?: SectionBlockAccessory

  text(text: SectionBlockTextElement): SectionBlockBuilder
  text<T extends Builder<SectionBlockTextElement>>(builderClass: new() => T, fn: (builder: T) => void): SectionBlockBuilder
  text<T extends Builder<SectionBlockTextElement>>(first: SectionBlockTextElement | (new() => T), second?: (builder: T) => void): SectionBlockBuilder {
    if (typeof first === 'function' && second !== undefined) {
      this._text = build(first, second)
    } else if (typeof first === 'object') {
      this._text = { ...first }
    }

    return this
  }

  fields(fields: SectionBlockTextElement[]): this
  fields(fn: (builder: SectionBlockFieldsBuilder) => void): this
  fields(first: SectionBlockTextElement[] | ((builder: SectionBlockFieldsBuilder) => void)): this {
    if (typeof first === 'function') {
      this._fields = build(SectionBlockFieldsBuilder, first)
    } else {
      this._fields = [...first]
    }

    return this
  }

  accessory(accessory: SectionBlockAccessory): SectionBlockBuilder
  accessory<T extends Builder<SectionBlockAccessory>>(builderClass: new() => T, fn: (builder: T) => void): SectionBlockBuilder
  accessory<T extends Builder<SectionBlockAccessory>>(first: SectionBlockAccessory | (new() => T), second?: (builder: T) => void): SectionBlockBuilder {
    if (typeof first === 'function' && second !== undefined) {
      this._accessory = build(first, second)
    } else if (typeof first === 'object') {
      this._accessory = { ...first }
    }

    return this
  }

  build(): SectionBlock {
    if (this._text === undefined) {
      throw missingPropertyError('text')
    }

    return {
      type: 'section',
      block_id: this._blockId, // eslint-disable-line camelcase
      text: this._text,
      fields: this._fields,
      accessory: this._accessory,
    }
  }
}

class SectionBlockFieldsBuilder extends Builder<SectionBlockTextElement[]>{
  private _fields: SectionBlockTextElement[] = []

  build(): SectionBlockTextElement[] {
    return this._fields
  }

  field(field: SectionBlockTextElement): this {
    this._fields.push({ ...field })
    return this
  }

  text(text: string, emoji?: boolean): this {
    return this.field(plainText(text, emoji))
  }

  markdown(text: string, verbatim?: boolean): this {
    return this.field(mrkdwnText(text, verbatim))
  }
}
