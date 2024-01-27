import type { ModalView, PlainTextElement } from '@slack/bolt'
import { Builder, missingPropertyError } from '../builder'
import { plainText } from '../elements'
import { withBlocks } from '../mixins'

export class ModalViewBuilder extends withBlocks(Builder<ModalView>) {
  private _title?: PlainTextElement
  private _callbackId?: string
  private _privateMetadata?: string
  private _close?: PlainTextElement
  private _submit?: PlainTextElement
  private _clearOnClose?: boolean
  private _notifyOnClose?: boolean

  title(text: string, emoji?: boolean): ModalViewBuilder {
    this._title = plainText(text, emoji)
    return this
  }

  callbackId(callbackId: string): ModalViewBuilder {
    this._callbackId = callbackId
    return this
  }

  privateMetadata(privateMetadata: unknown): ModalViewBuilder {
    this._privateMetadata = JSON.stringify(privateMetadata)
    return this
  }

  close(text: string): ModalViewBuilder {
    this._close = plainText(text)
    return this
  }

  submit(text: string): ModalViewBuilder {
    this._submit = plainText(text)
    return this
  }

  clearOnClose(clearOnClose: boolean): ModalViewBuilder {
    this._clearOnClose = clearOnClose
    return this
  }

  notifyOnClose(notifyOnClose: boolean): ModalViewBuilder {
    this._notifyOnClose = notifyOnClose
    return this
  }

  build(): ModalView {
    if (this._title === undefined) {
      throw missingPropertyError('title')
    }

    return {
      type: 'modal',
      title: this._title,
      close: this._close,
      submit: this._submit,
      private_metadata: this._privateMetadata, // eslint-disable-line camelcase
      callback_id: this._callbackId, // eslint-disable-line camelcase
      clear_on_close: this._clearOnClose, // eslint-disable-line camelcase
      notify_on_close: this._notifyOnClose, // eslint-disable-line camelcase
      blocks: this._blocks,
    }
  }
}
