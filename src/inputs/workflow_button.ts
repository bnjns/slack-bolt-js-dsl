import type { PlainTextElement, WorkflowButton } from '@slack/bolt'
import { Builder, build, missingPropertyError } from '../builder'
import { confirmable } from '../mixins'
import { plainText } from '../elements'
import type { ButtonStyle, WorkflowButtonTrigger, WorkflowButtonTriggerInputParameter, WorkflowButtonWorkflow } from '../types'

export class WorkflowButtonBuilder extends confirmable(Builder<WorkflowButton>) {
  private _text?: PlainTextElement
  private _workflow?: WorkflowButtonWorkflow
  private _style?: ButtonStyle
  private _accessibilityLabel?: string

  text(text: string, emoji?: boolean): this {
    this._text = plainText(text, emoji)
    return this
  }

  workflow(workflow: WorkflowButtonWorkflow): this
  workflow(fn: (builder: WorkflowBuilder) => void): this
  workflow(first: WorkflowButtonWorkflow | ((builder: WorkflowBuilder) => void)): this {
    if (typeof first === 'function') {
      this._workflow = build(WorkflowBuilder, first)
    } else {
      this._workflow = { ...first }
    }
    return this
  }

  style(style: ButtonStyle): this {
    this._style = style
    return this
  }

  accessibilityLabel(accessibilityLabel: string): this {
    this._accessibilityLabel = accessibilityLabel
    return this
  }

  build(): WorkflowButton {
    if (this._text === undefined) {
      throw missingPropertyError('text')
    }
    if (this._workflow === undefined) {
      throw missingPropertyError('workflow')
    }

    return {
      type: 'workflow_button',
      text: this._text,
      workflow: this._workflow,
      style: this._style,
      accessibility_label: this._accessibilityLabel, // eslint-disable-line camelcase
      confirm: this._confirm,
    }
  }
}

class WorkflowBuilder extends Builder<WorkflowButtonWorkflow>{
  private _trigger?: WorkflowButtonTrigger

  trigger(trigger: WorkflowButtonTrigger): this
  trigger(fn: (builder: TriggerBuilder) => void): this
  trigger(first: WorkflowButtonTrigger | ((builder: TriggerBuilder) => void)): this {
    if (typeof first === 'function') {
      this._trigger = build(TriggerBuilder, first)
    } else {
      this._trigger = { ...first }
    }
    return this
  }

  build(): WorkflowButtonWorkflow {
    if (this._trigger === undefined) {
      throw missingPropertyError('trigger')
    }

    return {
      trigger: this._trigger,
    }
  }
}

class TriggerBuilder extends Builder<WorkflowButtonTrigger> {
  private _url?: string
  private _customizableInputParameters: WorkflowButtonTriggerInputParameter[] = []

  url(url: string): this {
    this._url = url
    return this
  }

  customizableInputParameters(customizableInputParameters: WorkflowButtonTriggerInputParameter[]): this {
    this._customizableInputParameters = [...customizableInputParameters]
    return this
  }

  customizableInputParameter(name: string, value: string): this {
    this._customizableInputParameters.push({ name, value })
    return this
  }

  build(): WorkflowButtonTrigger {
    if (this._url === undefined) {
      throw missingPropertyError('url')
    }

    return {
      url: this._url,
      // eslint-disable-next-line camelcase
      customizable_input_parameters: this._customizableInputParameters.length === 0 ? undefined : this._customizableInputParameters,
    }
  }
}
