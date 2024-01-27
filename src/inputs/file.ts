import type { FileInput } from '@slack/bolt'
import { Builder } from '../builder'
import { actionable } from '../mixins'

export class FileInputBuilder extends actionable(Builder<FileInput>) {
  private _filetypes?: string[]
  private _maxFiles?: number

  fileTypes(fileTypes: string[]): this {
    this._filetypes = [...fileTypes]
    return this
  }

  maxFiles(maxFiles: number): this {
    this._maxFiles = maxFiles
    return this
  }

  build(): FileInput {
    return {
      type: 'file_input',
      filetypes: this._filetypes,
      max_files: this._maxFiles, // eslint-disable-line camelcase
      action_id: this._actionId, // eslint-disable-line camelcase
    }
  }
}
