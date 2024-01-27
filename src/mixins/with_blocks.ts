import type { KnownBlock } from '@slack/bolt'
import {
  ActionsBlock,
  ContextBlock,
  DividerBlock,
  FileBlock,
  HeaderBlock,
  ImageBlock,
  InputBlock,
  RichTextBlock,
  SectionBlock,
  VideoBlock,
} from '../blocks'
import { build, Builder } from '../builder'
import type { AbstractConstructor } from '../types'

export function withBlocks<T extends AbstractConstructor>(Base: T) {
  abstract class WithBlocks extends Base {
    #_blocks: KnownBlock[] = []

    get _blocks() {
      return this.#_blocks
    }

    blocks(blocks: KnownBlock[]): this
    blocks(fn: (blocks: BlocksBuilder) => void): this
    blocks(first: KnownBlock[] | ((blocks: BlocksBuilder) => void)): this {
      if (typeof first === 'function') {
        this.#_blocks = build(BlocksBuilder, first)
      } else {
        this.#_blocks = [...first]
      }
      return this
    }
  }

  return WithBlocks
}

export class BlocksBuilder extends Builder<KnownBlock[]>{
  #_blocks: KnownBlock[] = []

  build(): KnownBlock[] {
    return this.#_blocks
  }

  block(block: KnownBlock): this {
    this.#_blocks.push({ ...block })
    return this
  }

  image(fn: (builder: ImageBlock) => void): this {
    return this.block(build(ImageBlock, fn))
  }

  context(fn: (builder: ContextBlock) => void): this {
    return this.block(build(ContextBlock, fn))
  }

  actions(fn: (builder: ActionsBlock) => void): this {
    return this.block(build(ActionsBlock, fn))
  }

  divider(): this {
    return this.block(new DividerBlock().build())
  }

  section(fn: (builder: SectionBlock) => void): this {
    return this.block(build(SectionBlock, fn))
  }

  input(fn: (builder: InputBlock) => void): this {
    return this.block(build(InputBlock, fn))
  }

  file(fn: (builder: FileBlock) => void): this {
    return this.block(build(FileBlock, fn))
  }

  header(fn: (builder: HeaderBlock) => void): this {
    return this.block(build(HeaderBlock, fn))
  }

  video(fn: (builder: VideoBlock) => void): this {
    return this.block(build(VideoBlock, fn))
  }

  richText(fn: (builder: RichTextBlock) => void): this {
    return this.block(build(RichTextBlock, fn))
  }
}
