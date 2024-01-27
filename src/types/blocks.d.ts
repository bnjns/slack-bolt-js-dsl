import type {
  Actionable,
  Button,
  Checkboxes,
  Datepicker,
  DateTimepicker,
  EmailInput,
  FileInput,
  ImageElement,
  MrkdwnElement,
  MultiSelect,
  NumberInput,
  Overflow,
  PlainTextElement,
  PlainTextInput,
  RadioButtons,
  RichTextInput,
  RichTextList,
  RichTextPreformatted,
  RichTextQuote,
  RichTextSection,
  Select,
  Timepicker,
  URLInput,
  WorkflowButton,
} from '@slack/bolt'

export type ActionElement =
  Button
  | Checkboxes
  | Datepicker
  | DateTimepicker
  | MultiSelect
  | Overflow
  | RadioButtons
  | Select
  | Timepicker
  | WorkflowButton
  | RichTextInput

export type ContextBlockElement = ImageElement | PlainTextElement | MrkdwnElement

export type InputBlockElement =
  Select
  | MultiSelect
  | Datepicker
  | Timepicker
  | DateTimepicker
  | PlainTextInput
  | URLInput
  | EmailInput
  | NumberInput
  | RadioButtons
  | Checkboxes
  | RichTextInput
  | FileInput

export type RichTextBlockElement = RichTextSection | RichTextList | RichTextQuote | RichTextPreformatted

export type SectionBlockTextElement = PlainTextElement | MrkdwnElement
export type SectionBlockAccessory =
  Button
  | Overflow
  | Datepicker
  | Timepicker
  | Select
  | MultiSelect
  | Actionable
  | ImageElement
  | RadioButtons
  | Checkboxes
