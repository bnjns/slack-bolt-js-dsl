import type { RichTextQuote } from '@slack/bolt'
import { Builder } from '../builder'
import { withRichTextElements } from '../mixins'

export class RichTextQuoteBuilder extends withRichTextElements(Builder<RichTextQuote>) {
  build(): RichTextQuote {
    return {
      type: 'rich_text_quote',
      elements: this._elements,
    }
  }
}
