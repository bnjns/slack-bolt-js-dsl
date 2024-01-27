/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { ConfirmationDialog,  DispatchActionConfig,  PlainTextElement } from '@slack/bolt'

export interface Actionable {
  _actionId?: string
  actionId(actionId: string): this
}

export interface Confirmable {
  _confirm?: ConfirmationDialog
  confirm(confirm: ConfirmationDialog): this
}

export interface Dispatchable {
  _dispatchActionConfig?: DispatchActionConfig
  dispatchActionConfig(dispatchActionConfig: DispatchActionConfig): this
}

export interface Focusable {
  _focusOnLoad?: boolean
  focusOnLoad(focusOnLoad: boolean): this
}

export interface IsBlock {
  _blockId?: string
  blockId(blockId: string): this
}

export interface Placeholderable {
  _placeholder?: PlainTextElement
  placeholder(text: string, emoji?: boolean): this
}

export interface RichTextStyleable {
  _style?: RichTextStyle
  style(style: RichTextStyle): this
  bold(bold: boolean): this
  code(code: boolean): this
  italic(italic: boolean): this
  strike(strike: boolean): this
}

export type RichTextStyle = {
  bold?: boolean
  code?: boolean
  italic?: boolean
  strike?: boolean
}
