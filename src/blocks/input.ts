import type { InputBlock, PlainTextElement } from '@slack/bolt'
import { plainText } from '../elements'
import {  build, Builder, missingPropertyError } from '../builder'
import type { InputBlockElement } from '../types'
import {
  ChannelsSelect,
  Checkboxes,
  ConversationsSelect,
  Datepicker,
  Datetimepicker,
  EmailInput,
  ExternalSelect,
  FileInput,
  MultiChannelsSelect,
  MultiConversationsSelect,
  MultiExternalSelect,
  MultiStaticSelect,
  MultiUsersSelect,
  NumberInput,
  PlainTextInput,
  RadioButtons,
  RichTextInput,
  StaticSelect,
  URLInput,
  UsersSelect,
} from '../inputs'
import { isBlock } from '../mixins'

export class InputBlockBuilder extends isBlock(Builder<InputBlock>) {
  private _label?: PlainTextElement
  private _hint?: PlainTextElement
  private _optional?: boolean
  private _element?: InputBlockElement
  private _dispatchAction?: boolean

  label(text: string, emoji?: boolean): this {
    this._label = plainText(text, emoji)
    return this
  }

  hint(text: string, emoji?: boolean): this {
    this._hint = plainText(text, emoji)
    return this
  }

  optional(optional: boolean): this {
    this._optional = optional
    return this
  }

  dispatchAction(dispatchAction: boolean): this {
    this._dispatchAction = dispatchAction
    return this
  }

  element(element: InputBlockElement): this {
    this._element = { ...element }
    return this
  }

  channelsSelect(fn: (builder: ChannelsSelect) => void): this {
    return this.element(build(ChannelsSelect, fn))
  }
  multiChannelsSelect(fn: (builder: MultiChannelsSelect) => void): this {
    return this.element(build(MultiChannelsSelect, fn))
  }
  conversationsSelect(fn: (builder: ConversationsSelect) => void): this {
    return this.element(build(ConversationsSelect, fn))
  }
  multiConversationsSelect(fn: (builder: MultiConversationsSelect) => void): this {
    return this.element(build(MultiConversationsSelect, fn))
  }
  externalSelect(fn: (builder: ExternalSelect) => void): this {
    return this.element(build(ExternalSelect, fn))
  }
  multiExternalSelect(fn: (builder: MultiExternalSelect) => void): this {
    return this.element(build(MultiExternalSelect, fn))
  }
  staticSelect(fn: (builder: StaticSelect) => void): this {
    return this.element(build(StaticSelect, fn))
  }
  multiStaticSelect(fn: (builder: MultiStaticSelect) => void): this {
    return this.element(build(MultiStaticSelect, fn))
  }
  usersSelect(fn: (builder: UsersSelect) => void): this {
    return this.element(build(UsersSelect, fn))
  }
  multiUsersSelect(fn: (builder: MultiUsersSelect) => void): this {
    return this.element(build(MultiUsersSelect, fn))
  }
  datepicker(fn: (builder: Datepicker) => void): this {
    return this.element(build(Datepicker, fn))
  }
  datetimepicker(fn: (builder: Datetimepicker) => void): this {
    return this.element(build(Datetimepicker, fn))
  }
  plainTextInput(fn: (builder: PlainTextInput) => void): this {
    return this.element(build(PlainTextInput, fn))
  }
  urlInput(fn: (builder: URLInput) => void): this {
    return this.element(build(URLInput, fn))
  }
  emailInput(fn: (builder: EmailInput) => void): this {
    return this.element(build(EmailInput, fn))
  }
  numberInput(fn: (builder: NumberInput) => void): this {
    return this.element(build(NumberInput, fn))
  }
  radioButtons(fn: (builder: RadioButtons) => void): this {
    return this.element(build(RadioButtons, fn))
  }
  checkboxes(fn: (builder: Checkboxes) => void): this {
    return this.element(build(Checkboxes, fn))
  }
  richTextInput(fn: (builder: RichTextInput) => void): this {
    return this.element(build(RichTextInput, fn))
  }
  fileInput(fn: (builder: FileInput) => void): this {
    return this.element(build(FileInput, fn))
  }

  build(): InputBlock {
    if (this._label === undefined) {
      throw missingPropertyError('label')
    }
    if (this._element === undefined) {
      throw missingPropertyError('element')
    }

    return {
      type: 'input',
      block_id: this._blockId, // eslint-disable-line camelcase
      label: this._label,
      hint: this._hint,
      optional: this._optional,
      element: this._element,
      dispatch_action: this._dispatchAction, // eslint-disable-line camelcase
    }
  }
}
