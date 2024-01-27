import type { FileBlock } from '@slack/bolt'
import { Builder, missingPropertyError } from '../builder'
import { isBlock } from '../mixins'

export class FileBlockBuilder extends isBlock(Builder<FileBlock>) {
  private _source?: string
  private _externalId?: string

  source(source: string): FileBlockBuilder {
    this._source = source
    return this
  }

  externalId(externalId: string): FileBlockBuilder {
    this._externalId = externalId
    return this
  }

  build(): FileBlock {
    if (this._source === undefined) {
      throw missingPropertyError('source')
    }
    if (this._externalId === undefined) {
      throw missingPropertyError('externalId')
    }

    return {
      type: 'file',
      block_id: this._blockId, // eslint-disable-line camelcase
      source: this._source,
      external_id: this._externalId, // eslint-disable-line camelcase
    }
  }
}
