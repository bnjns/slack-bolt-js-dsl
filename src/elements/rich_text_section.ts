import type { RichTextSection } from '@slack/bolt'
import { Builder } from '../builder'
import { withRichTextElements } from '../mixins'

export class RichTextSectionBuilder extends withRichTextElements(Builder<RichTextSection>) {
  build(): RichTextSection {
    return {
      type: 'rich_text_section',
      elements: this._elements,
    }
  }
}
