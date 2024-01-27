import { plainText, PlainTextElementBuilder } from './plain_text'
import type { PlainTextElement } from '@slack/bolt'

describe('PlainTextElementBuilder', () => {
  it('should throw an error when building an empty config', () => {
    const builder = new PlainTextElementBuilder()

    expect(() => builder.build()).toThrow('Missing property: text')
  })
  it('should correctly build a plain text element', () => {
    const builder = new PlainTextElementBuilder()
      .text('The text')
      .emoji(true)

    expect(builder.build()).toEqual({
      type: 'plain_text',
      text: 'The text',
      emoji: true,
    } satisfies PlainTextElement)
  })
})

describe('plainText', () => {
  it('should correctly build a plain text element', () => {
    const element = plainText('The text', false)

    expect(element).toEqual({
      type: 'plain_text',
      text: 'The text',
      emoji: false,
    } satisfies PlainTextElement)
  })
})
