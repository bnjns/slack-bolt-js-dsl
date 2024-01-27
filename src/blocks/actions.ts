import type { ActionsBlock } from '@slack/bolt'
import { build, Builder } from '../builder'
import type { ActionElement } from '../types'
import {
  Button,
  ChannelsSelect,
  Checkboxes,
  ConversationsSelect,
  Datepicker,
  Datetimepicker,
  ExternalSelect,
  MultiChannelsSelect,
  MultiConversationsSelect,
  MultiExternalSelect,
  MultiStaticSelect,
  MultiUsersSelect,
  Overflow,
  RadioButtons,
  RichTextInput,
  StaticSelect,
  Timepicker,
  UsersSelect,
  WorkflowButton,
} from '../inputs'
import { isBlock } from '../mixins'

class ActionElementBuilder extends Builder<ActionElement[]> {
  private _elements: ActionElement[] = []

  build(): ActionElement[] {
    return this._elements
  }

  element(element: ActionElement): this {
    this._elements.push({ ...element })
    return this
  }

  button(fn: (builder: Button) => void): this {
    return this.element(build(Button, fn))
  }

  checkboxes(fn: (builder: Checkboxes) => void): this {
    return this.element(build(Checkboxes, fn))
  }

  datepicker(fn: (builder: Datepicker) => void): this {
    return this.element(build(Datepicker, fn))
  }

  datetimepicker(fn: (builder: Datetimepicker) => void): this {
    return this.element(build(Datetimepicker, fn))
  }

  timepicker(fn: (builder: Timepicker) => void): this {
    return this.element(build(Timepicker, fn))
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

  overflow(fn: (builder: Overflow) => void): this {
    return this.element(build(Overflow, fn))
  }

  radioButtons(fn: (builder: RadioButtons) => void): this {
    return this.element(build(RadioButtons, fn))
  }

  workflowButton(fn: (builder: WorkflowButton) => void): this {
    return this.element(build(WorkflowButton, fn))
  }

  richTextInput(fn: (builder: RichTextInput) => void): this {
    return this.element(build(RichTextInput, fn))
  }
}

export class ActionsBlockBuilder extends isBlock(Builder<ActionsBlock>) {
  private _elements: ActionElement[] = []

  elements(element: ActionElement[]): this
  elements(fn: (builder: ActionElementBuilder) => void): this
  elements(first: ActionElement[] | ((builder: ActionElementBuilder) => void)): this {
    if (typeof first === 'function') {
      this._elements = build(ActionElementBuilder, first)
    } else {
      this._elements = [...first]
    }

    return this
  }

  build(): ActionsBlock {
    return {
      type: 'actions',
      block_id: this._blockId, // eslint-disable-line camelcase
      elements: this._elements,
    }
  }
}
