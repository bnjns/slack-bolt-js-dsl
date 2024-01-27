import type { KnownBlock, View } from '@slack/bolt'
import type { Builder } from './builder'
import { build } from './builder'
import { BlocksBuilder } from './mixins/with_blocks'

export const blocks = (fn: (blocks: BlocksBuilder) => void): KnownBlock[] => {
  return build(BlocksBuilder, fn)
}

export const view = <U extends View, T extends Builder<U>>(builderClass: new() => T, fn: (_: T) => void): U => {
  return build(builderClass, fn)
}
