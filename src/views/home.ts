import type { HomeView } from '@slack/bolt'
import { Builder } from '../builder'
import { withBlocks } from '../mixins'

export class HomeViewBuilder extends withBlocks(Builder<HomeView>) {
  private _callbackId?: string
  private _externalId?: string
  private _privateMetadata?: string

  callbackId(callbackId: string): HomeViewBuilder {
    this._callbackId = callbackId
    return this
  }

  externalId(externalId: string): HomeViewBuilder {
    this._externalId = externalId
    return this
  }

  privateMetadata(privateMetadata: unknown): HomeViewBuilder {
    this._privateMetadata = JSON.stringify(privateMetadata)
    return this
  }

  build(): HomeView {
    return {
      type: 'home',
      blocks: this._blocks,
      callback_id: this._callbackId, // eslint-disable-line camelcase
      external_id: this._externalId, // eslint-disable-line camelcase
      private_metadata: this._privateMetadata, // eslint-disable-line camelcase
    }
  }
}
