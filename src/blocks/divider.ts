import type { DividerBlock } from '@slack/bolt'
import { Builder } from '../builder'
import { isBlock } from '../mixins'

export class DividerBlockBuilder extends isBlock(Builder<DividerBlock>) {
  build(): DividerBlock {
    return {
      type: 'divider',
      block_id: this._blockId, // eslint-disable-line camelcase
    }
  }
}
