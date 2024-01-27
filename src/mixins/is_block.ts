import type { IsBlock } from '../types'

export function isBlock<T extends AbstractConstructor>(Base: T): AbstractConstructor<IsBlock> & T {
  abstract class IsBlockClass extends Base implements IsBlock {
    #_blockId?: string

    get _blockId() {
      return this.#_blockId
    }

    blockId(blockId: string): this {
      this.#_blockId = blockId
      return this
    }
  }

  return IsBlockClass
}
