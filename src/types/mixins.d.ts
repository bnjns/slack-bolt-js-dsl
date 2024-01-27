export type RichTextStyleable = {
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
