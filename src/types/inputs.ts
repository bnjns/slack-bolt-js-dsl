import type { PlainTextElement, PlainTextOption } from '@slack/bolt'

export type ButtonStyle = 'danger' | 'primary'

export type SelectOptionGroup = {
  label: PlainTextElement
  options: PlainTextOption[]
}
export type ConversationFilterInclude = 'im' | 'mpim' | 'private' | 'public'
export type ConversationSelectFilter = {
  include?: ConversationFilterInclude[]
  exclude_external_shared_channels?: boolean
  exclude_bot_users?: boolean
}

export type WorkflowButtonWorkflow = {
  trigger: WorkflowButtonTrigger
}
export type WorkflowButtonTrigger = {
  url: string
  customizable_input_parameters?: WorkflowButtonTriggerInputParameter[]
}
export type WorkflowButtonTriggerInputParameter = {
  name: string
  value: string
}
