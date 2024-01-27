import type { RichTextList, RichTextSection } from '@slack/bolt'
import { Builder, build, missingPropertyError } from '../builder'
import { RichTextSectionBuilder } from './rich_text_section'
import type { RichTextListStyle } from '../types'

export class RichTextListBuilder extends Builder<RichTextList> {
  private _elements: RichTextSection[] = []
  private _style?: RichTextListStyle
  private _indent?: number
  private _border?: boolean

  style(style: RichTextListStyle): RichTextListBuilder {
    this._style = style
    return this
  }

  bullet(): RichTextListBuilder {
    return this.style('bullet')
  }

  ordered(): RichTextListBuilder {
    return this.style('ordered')
  }

  indent(indent: number): RichTextListBuilder {
    this._indent = indent
    return this
  }

  border(border: boolean): RichTextListBuilder {
    this._border = border
    return this
  }

  element(element: RichTextSection): this
  element(fn: (builder: RichTextSectionBuilder) => void): this
  element(first: RichTextSection | ((builder: RichTextSectionBuilder) => void)): this {
    if (typeof first === 'function') {
      this._elements.push(build(RichTextSectionBuilder, first))
    } else {
      this._elements.push({ ...first })
    }

    return this
  }

  build(): RichTextList {
    if (this._style === undefined) {
      throw missingPropertyError('style')
    }

    return {
      type: 'rich_text_list',
      elements: this._elements,
      style: this._style,
      indent: this._indent,
      border: this._border === undefined ? undefined : (this._border ? 1 : 0),
    }
  }
}
